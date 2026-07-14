import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import pg from "pg";

const { Pool } = pg;

// Initialize the database pool using DATABASE_URL with automatic copy-paste cleanup
let databaseUrl = process.env.DATABASE_URL;

if (databaseUrl) {
  databaseUrl = databaseUrl.trim();
  if (databaseUrl.startsWith('=')) {
    databaseUrl = databaseUrl.substring(1).trim();
  }
  if (databaseUrl.startsWith('"') && databaseUrl.endsWith('"')) {
    databaseUrl = databaseUrl.slice(1, -1).trim();
  } else if (databaseUrl.startsWith("'") && databaseUrl.endsWith("'")) {
    databaseUrl = databaseUrl.slice(1, -1).trim();
  }
}

let pool: pg.Pool | null = null;

if (databaseUrl) {
  console.log('[Neon DB] Connecting to Neon database...');
  pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false // Required for Neon serverless connections
    }
  });
  
  // Auto-initialize the table
  pool.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      username VARCHAR(100) PRIMARY KEY,
      profile_data JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `).then(() => {
    console.log('[Neon DB] "user_profiles" table is verified and ready.');
  }).catch((err) => {
    console.error('[Neon DB] Error initializing table:', err);
  });
} else {
  console.warn('[Neon DB] DATABASE_URL environment variable is missing. Running in local fallback mode (mock DB).');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  // API Route: Get User Profile
  app.get("/api/user/:username", async (req, res) => {
    const username = req.params.username.trim().toLowerCase();
    
    if (!pool) {
      return res.json({ status: "fallback", data: null, message: "No database connection" });
    }
    
    try {
      const result = await pool.query(
        "SELECT profile_data FROM user_profiles WHERE username = $1",
        [username]
      );
      
      if (result.rows.length > 0) {
        return res.json({ status: "ok", data: result.rows[0].profile_data });
      } else {
        return res.json({ status: "not_found", data: null });
      }
    } catch (err: any) {
      console.error(`[API] Error fetching profile for ${username}:`, err);
      return res.status(500).json({ error: err.message });
    }
  });

  // API Route: Save or Update User Profile
  app.post("/api/user/:username", async (req, res) => {
    const username = req.params.username.trim().toLowerCase();
    const profileData = req.body;
    
    if (!pool) {
      return res.json({ status: "fallback", message: "No database connection" });
    }
    
    try {
      await pool.query(
        `INSERT INTO user_profiles (username, profile_data, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (username)
         DO UPDATE SET profile_data = EXCLUDED.profile_data, updated_at = CURRENT_TIMESTAMP`,
        [username, profileData]
      );
      return res.json({ status: "ok" });
    } catch (err: any) {
      console.error(`[API] Error saving profile for ${username}:`, err);
      return res.status(500).json({ error: err.message });
    }
  });

  // API Route: Delete User Profile
  app.delete("/api/user/:username", async (req, res) => {
    const username = req.params.username.trim().toLowerCase();
    
    if (!pool) {
      return res.json({ status: "fallback", message: "No database connection" });
    }
    
    try {
      await pool.query(
        "DELETE FROM user_profiles WHERE username = $1",
        [username]
      );
      return res.json({ status: "ok" });
    } catch (err: any) {
      console.error(`[API] Error deleting profile for ${username}:`, err);
      return res.status(500).json({ error: err.message });
    }
  });

  // API Route: Sync/Merge User Profile (handles recovery and prevents history loss)
  app.post("/api/sync/:username", async (req, res) => {
    const username = req.params.username.trim().toLowerCase();
    const clientProfile = req.body;
    
    if (!pool) {
      return res.json({ status: "fallback", data: clientProfile, message: "No database connection" });
    }
    
    try {
      // 1. Fetch existing profile from DB
      const result = await pool.query(
        "SELECT profile_data FROM user_profiles WHERE username = $1",
        [username]
      );
      
      if (result.rows.length === 0) {
        // No DB profile yet, insert client profile
        await pool.query(
          "INSERT INTO user_profiles (username, profile_data, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
          [username, clientProfile]
        );
        return res.json({ status: "ok", data: clientProfile, source: "client_migrated" });
      }
      
      const dbProfile = result.rows[0].profile_data;
      
      // 2. Merge logic (ensure history & checkins are merged to prevent any loss!)
      const mergedCheckIns = Array.from(new Set([
        ...(dbProfile.checkIns || []),
        ...(clientProfile.checkIns || [])
      ]));
      
      // Merge history entries based on unique ID
      const historyMap = new Map();
      (dbProfile.history || []).forEach((h: any) => {
        if (h && h.id) historyMap.set(h.id, h);
      });
      (clientProfile.history || []).forEach((h: any) => {
        if (h && h.id) historyMap.set(h.id, h);
      });
      const mergedHistory = Array.from(historyMap.values());
      // Sort descending by date
      mergedHistory.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // Merge weights dictionary
      const mergedWeights = {
        ...(dbProfile.weights || {}),
        ...(clientProfile.weights || {})
      };
      
      // Merge badges list (unique elements)
      const dbBadgeIds = new Set((dbProfile.badges || []).map((b: any) => b.id));
      const mergedBadges = [...(dbProfile.badges || [])];
      (clientProfile.badges || []).forEach((b: any) => {
        if (b && b.id && !dbBadgeIds.has(b.id)) {
          mergedBadges.push(b);
          dbBadgeIds.add(b.id);
        }
      });
      
      // Final merged profile
      const mergedProfile = {
        ...clientProfile,
        ...dbProfile, // Keep base DB settings like goal/name/etc if they are newer, but use merged collections below:
        checkIns: mergedCheckIns,
        history: mergedHistory,
        weights: mergedWeights,
        badges: mergedBadges,
        totalWorkouts: Math.max(dbProfile.totalWorkouts || 0, clientProfile.totalWorkouts || 0, mergedHistory.length),
        streak: Math.max(dbProfile.streak || 0, clientProfile.streak || 0)
      };
      
      // Update DB with the merged profile
      await pool.query(
        "UPDATE user_profiles SET profile_data = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2",
        [mergedProfile, username]
      );
      
      return res.json({ status: "ok", data: mergedProfile, source: "merged" });
    } catch (err: any) {
      console.error(`[API] Error syncing profile for ${username}:`, err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

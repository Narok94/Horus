
import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { User, WorkoutRoutine, AppTab, SetPerformance, WorkoutHistoryEntry, Badge } from './types';
import { jessicaWorkouts, henriqueWorkouts } from './data/workoutData';
import { auth, signOut } from './firebase';
import { getUserByUsername } from './data/users';

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  activeTab: AppTab;
  selectedWorkout: WorkoutRoutine | null;
  currentSessionProgress: Record<string, SetPerformance[]>;
  currentCardioProgress: { exercise: string; duration: number; completed: boolean } | null;
  isWorkoutActive: boolean;
  workoutStartTime: number | null;
  elapsedTime: number;
  showSummary: boolean;
  lastWorkoutVolume: number;
  workoutDuration: number | null;
  chatMessages: { role: 'user' | 'model'; text: string }[];
  isChatLoading: boolean;
  selectedStudent: string | null;
  allWorkouts: Record<string, WorkoutRoutine[]>;
  theme: 'light' | 'dark';
  syncStatus: 'synced' | 'syncing' | 'error' | 'offline';

  // Actions
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setActiveTab: (tab: AppTab) => void;
  setSelectedWorkout: (workout: WorkoutRoutine | null) => void;
  setSelectedStudent: (student: string | null) => void;
  setAllWorkouts: (workouts: AppState['allWorkouts']) => void;
  setCurrentSessionProgress: (progress: Record<string, SetPerformance[]>) => void;
  setCurrentCardioProgress: (progress: AppState['currentCardioProgress']) => void;
  setIsWorkoutActive: (isActive: boolean) => void;
  setWorkoutStartTime: (time: number | null) => void;
  setElapsedTime: (time: number) => void;
  setShowSummary: (show: boolean) => void;
  setLastWorkoutVolume: (volume: number) => void;
  setWorkoutDuration: (duration: number | null) => void;
  setChatMessages: (messages: { role: 'user' | 'model', text: string }[]) => void;
  setIsChatLoading: (isLoading: boolean) => void;
  setSyncStatus: (status: 'synced' | 'syncing' | 'error' | 'offline') => void;
  toggleTheme: () => void;
  updateUserProfile: (newData: Partial<User>) => void;
  syncUserProfile: (username: string) => Promise<User | null>;
  checkAchievements: () => void;
  handleManualCheckIn: () => void;
  toggleCheckInDate: (dateStr: string) => void;
  triggerConfetti: () => void;
  addToast?: (message: string, type: 'success' | 'error' | 'info') => void;
  setAddToast: (fn: (message: string, type: 'success' | 'error' | 'info') => void) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set, get) => {
  // Allow user custom theme, default is 'dark' for premium dark HUD, except for teste1
  const initialTheme = (() => {
    if (typeof localStorage !== 'undefined') {
      // Safely ensure no accidental resets ever run
      const RESET_KEY = 'tatugym_reset_v5_july_challenge';
      if (!localStorage.getItem(RESET_KEY)) {
        localStorage.setItem(RESET_KEY, 'true');
      }

      // Restore Henrique's progress for Jul 6 to Jul 9
      const RESTORE_KEY = 'tatugym_restore_july_10_v3';
      if (!localStorage.getItem(RESTORE_KEY)) {
        try {
          const storedProfile = localStorage.getItem('tatugym_user_profile_teste1');
          if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            const missingDates = ['2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09'];
            profile.checkIns = Array.from(new Set([...(profile.checkIns || []), ...missingDates]));
            profile.totalWorkouts = Math.max(profile.totalWorkouts || 0, (profile.totalWorkouts || 0) + missingDates.length);
            
            if (!profile.history) profile.history = [];
            missingDates.forEach((date, i) => {
               if (!profile.history.some((h: any) => h.date.startsWith(date))) {
                 profile.history.push({
                   id: 'dummy-' + date,
                   date: date + 'T12:00:00.000Z',
                   workoutId: 'dummy-old',
                   workoutTitle: 'Treino Anterior ' + (i + 1),
                   duration: 3600,
                   exercises: []
                 });
               }
            });
            // Sort history descending
            profile.history.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

            localStorage.setItem('tatugym_user_profile_teste1', JSON.stringify(profile));
            
            const rem = localStorage.getItem('tatugym_remembered');
            if (rem) {
               const remData = JSON.parse(rem);
               if (remData.username.toLowerCase() === 'teste1') {
                 localStorage.setItem('tatugym_remembered', JSON.stringify(profile));
               }
            }
          }
        } catch (e) {}
        localStorage.setItem(RESTORE_KEY, 'true');
      }

      const remembered = localStorage.getItem('tatugym_remembered');
      if (remembered) {
        try {
          const userData = JSON.parse(remembered);
          if (userData && userData.username.toLowerCase() === 'teste1') {
            return 'light';
          }
        } catch (_) {}
      }
    }
    return 'dark';
  })();
  
  if (typeof document !== 'undefined') {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(initialTheme);
  }

  return {
  user: null,
  isLoggedIn: false,
  activeTab: AppTab.DASHBOARD,
  selectedWorkout: null,
  currentSessionProgress: {},
  currentCardioProgress: null,
  isWorkoutActive: false,
  workoutStartTime: null,
  elapsedTime: 0,
  showSummary: false,
  lastWorkoutVolume: 0,
  workoutDuration: null,
  chatMessages: [],
  isChatLoading: false,
  selectedStudent: null,
  theme: initialTheme,
  syncStatus: 'synced',
  allWorkouts: (() => {
    const saved = localStorage.getItem('tatugym_all_workouts');
    let loadedWorkouts: Record<string, WorkoutRoutine[]> = {
      teste1: henriqueWorkouts,
      teste3: [],
      jessica: jessicaWorkouts
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        loadedWorkouts = { ...loadedWorkouts, ...parsed };
      } catch (e) {
        console.error('Error loading workouts:', e);
      }
    }
    // Forçar os treinos corretos para atualizar a versão salva em cache do navegador
    loadedWorkouts.teste1 = henriqueWorkouts;
    loadedWorkouts.jessica = jessicaWorkouts;
    loadedWorkouts.teste3 = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tatugym_all_workouts', JSON.stringify(loadedWorkouts));
    }
    return loadedWorkouts;
  })(),
  addToast: undefined,

  setUser: (user) => {
    set({ user });
    if (user) {
      const isTeacher = user.role === 'teacher';
      const targetTheme = isTeacher ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(targetTheme);
      }
      set({ theme: targetTheme });
    }
  },
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedWorkout: (selectedWorkout) => set({ selectedWorkout }),
  setSelectedStudent: (selectedStudent) => set({ selectedStudent }),
  setAllWorkouts: (allWorkouts) => {
    set({ allWorkouts });
    localStorage.setItem('tatugym_all_workouts', JSON.stringify(allWorkouts));
  },
  setCurrentSessionProgress: (currentSessionProgress) => set({ currentSessionProgress }),
  setCurrentCardioProgress: (currentCardioProgress) => set({ currentCardioProgress }),
  setIsWorkoutActive: (isWorkoutActive) => set({ isWorkoutActive }),
  setWorkoutStartTime: (workoutStartTime) => set({ workoutStartTime }),
  setElapsedTime: (elapsedTime) => set({ elapsedTime }),
  setShowSummary: (showSummary) => set({ showSummary }),
  setLastWorkoutVolume: (lastWorkoutVolume) => set({ lastWorkoutVolume }),
  setWorkoutDuration: (workoutDuration) => set({ workoutDuration }),
  setChatMessages: (chatMessages) => set({ chatMessages }),
  setIsChatLoading: (isChatLoading) => set({ isChatLoading }),
  setSyncStatus: (syncStatus) => set({ syncStatus }),
  setAddToast: (fn) => set({ addToast: fn }),

  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: nextTheme });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tatugym_theme', nextTheme);
    }
    if (typeof document !== 'undefined') {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(nextTheme);
    }
  },

  logout: async () => {
    const { user } = get();
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Error signing out:', e);
    }
    if (user) {
       localStorage.removeItem(`tatugym_active_session_${user.username.toLowerCase()}`);
    }

    set({ 
      user: null, 
      isLoggedIn: false, 
      activeTab: AppTab.DASHBOARD,
      selectedWorkout: null,
      isWorkoutActive: false,
      currentSessionProgress: {},
      workoutStartTime: null
    });
    localStorage.removeItem('tatugym_remembered');
  },

  updateUserProfile: (newData) => {
    const { user } = get();
    if (!user) return;
    const updatedUser = { ...user, ...newData };
    set({ user: updatedUser, syncStatus: 'syncing' });
    localStorage.setItem(`tatugym_user_profile_${user.username.toLowerCase()}`, JSON.stringify(updatedUser));
    
    // Non-blocking sync to Neon PostgreSQL
    fetch(`/api/user/${user.username.toLowerCase()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })
    .then(async (res) => {
      if (res.ok) {
        set({ syncStatus: 'synced' });
      } else {
        console.error('[DB Sync] Server error saving profile:', res.statusText);
        set({ syncStatus: 'error' });
      }
    })
    .catch(err => {
      console.error('[DB Sync] Error saving profile to database:', err);
      set({ syncStatus: 'offline' });
    });

    get().checkAchievements();
  },

  syncUserProfile: async (username) => {
    const lowerUser = username.trim().toLowerCase();
    set({ syncStatus: 'syncing' });
    
    // 1. Get current local profile if any
    let localProfile: any = null;
    const localProfileStr = localStorage.getItem(`tatugym_user_profile_${lowerUser}`);
    if (localProfileStr) {
      try {
        localProfile = JSON.parse(localProfileStr);
      } catch (e) {
        console.error('[Sync] Error parsing local profile:', e);
      }
    }
    
    if (!localProfile) {
      localProfile = getUserByUsername(lowerUser);
    }
    
    if (!localProfile) {
      set({ syncStatus: 'error' });
      return null;
    }
    
    // 2. Call the sync API to merge local state and database state securely
    try {
      const response = await fetch(`/api/sync/${lowerUser}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localProfile)
      });
      
      if (response.ok) {
        const resData = await response.json();
        if (resData.status === 'ok' && resData.data) {
          const mergedProfile = resData.data;
          set({ user: mergedProfile, syncStatus: 'synced' });
          localStorage.setItem(`tatugym_user_profile_${lowerUser}`, JSON.stringify(mergedProfile));
          get().addToast?.('Sincronizado com o Banco Neon com sucesso!', 'success');
          return mergedProfile;
        }
      }
      set({ syncStatus: 'error' });
      get().addToast?.('Erro ao sincronizar com o Banco Neon.', 'error');
    } catch (err) {
      console.error('[Sync] Failed to sync with Neon PostgreSQL backend:', err);
      set({ syncStatus: 'offline' });
      get().addToast?.('Offline. Suas alterações foram salvas localmente.', 'info');
    }
    
    // Fallback: if offline, set user to local profile
    set({ user: localProfile });
    return localProfile;
  },

  handleManualCheckIn: () => {
    const { user, updateUserProfile, triggerConfetti } = get();
    if (!user) return;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const today = now.toISOString().split('T')[0];
    
    if (user.checkIns?.includes(today)) {
      return;
    }
    const newCheckIns = [...(user.checkIns || []), today];
    updateUserProfile({ 
      checkIns: newCheckIns,
      streak: (user.streak || 0) + 1 
    });
    triggerConfetti();
  },

  toggleCheckInDate: (dateStr: string) => {
    const { user, updateUserProfile, triggerConfetti } = get();
    if (!user) return;
    const currentCheckIns = user.checkIns ? [...user.checkIns] : [];
    const index = currentCheckIns.indexOf(dateStr);
    let isAdding = false;
    
    if (index > -1) {
      currentCheckIns.splice(index, 1);
    } else {
      currentCheckIns.push(dateStr);
      isAdding = true;
    }

    // Dynamic streak: simple calculation could just be increment/decrement,
    // let's do a recalculation based on actual consecutive days if desired,
    // or just increment streak on add and decrement on remove (clamped to >= 0)
    let newStreak = user.streak || 0;
    if (isAdding) {
      newStreak += 1;
      triggerConfetti();
    } else {
      newStreak = Math.max(0, newStreak - 1);
    }

    updateUserProfile({
      checkIns: currentCheckIns,
      streak: newStreak
    });
  },

  triggerConfetti: () => {
    confetti({ 
      particleCount: 150, 
      spread: 80, 
      origin: { y: 0.6 }, 
      colors: ['#10b981', '#6366f1', '#fbbf24'] 
    });
  },

  checkAchievements: () => {
    const { user } = get();
    if (!user) return;

    const newBadges: Badge[] = [...(user.badges || [])];
    const now = new Date().toISOString();

    // 1. First Workout
    if (user.totalWorkouts >= 1 && !newBadges.find(b => b.id === 'first_workout')) {
      newBadges.push({
        id: 'first_workout',
        name: 'Primeiro Passo',
        description: 'Concluiu seu primeiro treino.',
        icon: 'Rocket',
        unlockedAt: now
      });
    }

    // 2. 10 Workouts
    if (user.totalWorkouts >= 10 && !newBadges.find(b => b.id === 'ten_workouts')) {
      newBadges.push({
        id: 'ten_workouts',
        name: 'Constância',
        description: 'Concluiu 10 treinos.',
        icon: 'Trophy',
        unlockedAt: now
      });
    }

    // 3. 7 Day Streak
    if (user.streak >= 7 && !newBadges.find(b => b.id === 'seven_day_streak')) {
      newBadges.push({
        id: 'seven_day_streak',
        name: 'Fogo no Sangue',
        description: 'Manteve uma sequência de 7 dias.',
        icon: 'Flame',
        unlockedAt: now
      });
    }

    if (newBadges.length !== (user.badges || []).length) {
      const updatedUser = { ...user, badges: newBadges };
      set({ user: updatedUser });
      localStorage.setItem(`tatugym_user_profile_${user.username.toLowerCase()}`, JSON.stringify(updatedUser));
      
      // Non-blocking sync to Neon PostgreSQL
      fetch(`/api/user/${user.username.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      }).catch(err => console.error('[DB Sync] Error saving profile after badges unlock:', err));
    }
  }
};
});

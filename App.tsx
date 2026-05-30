import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  LayoutDashboard, 
  History as HistoryIcon, 
  User as UserIcon,
  Lock,
  Check,
  ArrowRight,
  Users,
  Plus,
  Home,
  BarChart2,
  Mail,
  Eye,
  EyeOff,
  Play
} from 'lucide-react';
import { useStore } from './store';
import { useWorkoutPersistence } from './hooks/useWorkoutPersistence';
import { AppTab, User } from './types';
import { ToastProvider, useToast } from './components/ui/Toast';
import { DashboardSkeleton } from './components/ui/Skeleton';
import { db, auth, collection, getDocs, doc, setDoc, getDoc, onSnapshot, signInAnonymously } from './firebase';

// Views
import { DashboardView } from './components/views/DashboardView';
import { WorkoutView } from './components/views/WorkoutView';
import { HistoryView } from './components/views/HistoryView';
import { ProfileView } from './components/views/ProfileView';
import { TeacherView } from './components/views/TeacherView';
import { WorkoutsListView } from './components/views/WorkoutsListView';

export const HorusLogoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = "" }) => {
  return (
    <img 
      src="https://raw.githubusercontent.com/Narok94/Horus2.0/main/public/logo/logo.png" 
      alt="Horus Training Logo" 
      style={{ width: size, height: size }}
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
};

const AppContent: React.FC = () => {
  const { 
    user, 
    isLoggedIn, 
    activeTab, 
    selectedWorkout, 
    isWorkoutActive, 
    currentSessionProgress,
    workoutStartTime,
    allWorkouts,
    theme,
    setUser, 
    setIsLoggedIn, 
    setActiveTab, 
    setSelectedWorkout,
    setCurrentSessionProgress,
    setIsWorkoutActive,
    setWorkoutStartTime,
    addToast,
    setAddToast
  } = useStore();

  useWorkoutPersistence();

  const { addToast: toastFn } = useToast();

  useEffect(() => {
    setAddToast(toastFn);
  }, [toastFn, setAddToast]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Sync Dynamic User Accent Color with global CSS variables based on target layouts
  useEffect(() => {
    let accentColor = '#D4AF37'; // Default / Horus Fit Dourado Sofisticado
    let accentRgb = '212, 175, 55';
    
    if (user) {
      const uName = user.username.toLowerCase();
      const isFemale = uName === 'teste2' || uName.includes('jessica') || pNameIncludes(uName, 'jessica') || user.sex === 'feminino';
      const isTeacher = uName === 'teste3' || uName.includes('flavia') || pNameIncludes(uName, 'flavia');
      const isTeste1 = uName === 'teste1';
      
      if (isTeste1) {
        accentColor = '#1E40AF'; // Strong Cobalt Royal Blue for high-contrast on light background
        accentRgb = '30, 64, 175';
      } else if (isFemale) {
        accentColor = '#FF007F'; // Original Female Sport Pink/Rose
        accentRgb = '255, 0, 127';
      } else if (isTeacher) {
        accentColor = '#10B981'; // Ice Green/Clean Emerald for Teacher
        accentRgb = '16, 185, 129';
      } else {
        accentColor = '#00F0FF'; // Original Male Sport Cyan active theme
        accentRgb = '0, 240, 255';
      }
    }
    
    const root = document.documentElement;
    root.style.setProperty('--accent-color', accentColor);
    root.style.setProperty('--accent-color-rgb', accentRgb);
    root.style.setProperty('--highlight-color', accentColor);
    root.style.setProperty('--glow-color', `rgba(${accentRgb}, 0.08)`);
  }, [user]);

  function pNameIncludes(text: string, sub: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(sub);
  }

  // Safety sync for already logged-in users to ensure security rules work
  // Save user profile locally whenever it changes
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(`tatugym_user_profile_${user.username.toLowerCase()}`, JSON.stringify(user));
    }
  }, [isLoggedIn, user]);

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('teste1');
  const [password, setPassword] = useState('12345');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    const saved = localStorage.getItem('tatugym_remember_me_checked');
    if (saved !== null) return saved === 'true';
    return localStorage.getItem('tatugym_remembered') !== null;
  });

  // Sync rememberMe state with localStorage on change
  useEffect(() => {
    // Left empty for consistency
  }, [rememberMe]);

  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        console.log('[App] Verificando auto-login...');
        const remembered = localStorage.getItem('tatugym_remembered');
        if (remembered) {
          const userData = JSON.parse(remembered);
          const allowedUsers = ['teste', 'teste1', 'teste2', 'teste3'];
          if (allowedUsers.includes(userData.username.toLowerCase())) {
            const profile = localStorage.getItem(`tatugym_user_profile_${userData.username.toLowerCase()}`);
            const finalUser = profile ? JSON.parse(profile) : userData;
            setUser(finalUser);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('tatugym_remembered');
          }
        }
      } catch (error) {
        console.error('[App] Erro ao carregar usuário lembrado:', error);
        localStorage.removeItem('tatugym_remembered');
      } finally {
        setIsLoading(false);
      }
    };

    checkAutoLogin();
  }, [setUser, setIsLoggedIn]);

  const handleVibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleQuickLogin = (uname: string) => {
    handleVibrate();
    const lowerUser = uname.toLowerCase();
    let userData: User | null = null;
    const profile = localStorage.getItem(`tatugym_user_profile_${lowerUser}`);
    if (profile) {
      try {
        userData = JSON.parse(profile);
      } catch (e) {
        console.error('[Login] Erro ao ler perfil salvo:', e);
      }
    }

    if (!userData) {
      if (lowerUser === 'teste1') {
        const getWeekDatesForTeste1 = () => {
          const today = new Date();
          const day = today.getDay();
          const diff = today.getDate() - day + (day === 0 ? -6 : 1);
          const mon = new Date(today.setDate(diff));
          const dates = [];
          for (let i = 0; i < 7; i++) {
            const d = new Date(mon);
            d.setDate(mon.getDate() + i);
            dates.push(d.toISOString().split('T')[0]);
          }
          return [dates[0], dates[1], dates[5]];
        };
        userData = {
          username: 'teste1',
          name: 'Henrique',
          age: 26,
          goal: 'Hipertrofia & Força',
          totalWorkouts: 12,
          history: [],
          weights: {},
          checkIns: getWeekDatesForTeste1(),
          streak: 12,
          badges: [],
          isProfileComplete: true,
          role: 'student'
        };
      } else if (lowerUser === 'teste') {
        userData = {
          username: 'teste',
          name: 'Teste Masculino',
          age: 25,
          goal: 'Hipertrofia & Força',
          totalWorkouts: 0,
          history: [],
          weights: {},
          checkIns: [],
          streak: 0,
          badges: [],
          isProfileComplete: true,
          role: 'student'
        };
      } else if (lowerUser === 'teste2') {
        userData = {
          username: 'teste2',
          name: 'Teste Feminino',
          age: 23,
          goal: 'Tônus muscular & Cardio',
          totalWorkouts: 0,
          history: [],
          weights: {},
          checkIns: [],
          streak: 0,
          badges: [],
          isProfileComplete: true,
          role: 'student'
        };
      } else {
        userData = {
          username: 'teste3',
          name: 'Professor Teste',
          age: 35,
          goal: 'Orientar alunos',
          totalWorkouts: 0,
          history: [],
          weights: {},
          checkIns: [],
          streak: 0,
          badges: [],
          isProfileComplete: true,
          role: 'teacher'
        };
      }
    }

    setUser(userData);
    setIsLoggedIn(true);
    
    if (userData.role === 'teacher') {
      setActiveTab(AppTab.TEACHER);
    } else {
      setActiveTab(AppTab.DASHBOARD);
    }
    
    // Auto sync username state so form inputs reflect current identity if logged out
    setUsername(lowerUser);
    setPassword('12345');
    
    localStorage.setItem('tatugym_remember_me_checked', rememberMe.toString());
    if (rememberMe) {
      localStorage.setItem('tatugym_remembered', JSON.stringify(userData));
    } else {
      localStorage.removeItem('tatugym_remembered');
    }
    
    if (addToast) addToast(`Bem-vindo de volta, ${userData.name}!`, 'success');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    handleVibrate();
    const lowerUser = username.trim().toLowerCase();
    
    const isValidUser = 
      ['teste', 'teste1', 'teste2', 'teste3'].includes(lowerUser) && password === '12345';

    if (isValidUser) {
      let userData: User | null = null;
      const profile = localStorage.getItem(`tatugym_user_profile_${lowerUser}`);
      if (profile) {
        try {
          userData = JSON.parse(profile);
        } catch (e) {
          console.error('[Login] Erro ao ler perfil salvo:', e);
        }
      }

      if (!userData) {
        if (lowerUser === 'teste1') {
          const getWeekDatesForTeste1 = () => {
            const today = new Date();
            const day = today.getDay();
            const diff = today.getDate() - day + (day === 0 ? -6 : 1);
            const mon = new Date(today.setDate(diff));
            const dates = [];
            for (let i = 0; i < 7; i++) {
              const d = new Date(mon);
              d.setDate(mon.getDate() + i);
              dates.push(d.toISOString().split('T')[0]);
            }
            return [dates[0], dates[1], dates[5]];
          };
          userData = {
            username: 'teste1',
            name: 'Henrique',
            age: 26,
            goal: 'Hipertrofia & Força',
            totalWorkouts: 12,
            history: [],
            weights: {},
            checkIns: getWeekDatesForTeste1(),
            streak: 12,
            badges: [],
            isProfileComplete: true,
            role: 'student'
          };
        } else if (lowerUser === 'teste') {
          userData = {
            username: 'teste',
            name: 'Teste Masculino',
            age: 25,
            goal: 'Hipertrofia & Força',
            totalWorkouts: 0,
            history: [],
            weights: {},
            checkIns: [],
            streak: 0,
            badges: [],
            isProfileComplete: true,
            role: 'student'
          };
        } else if (lowerUser === 'teste2') {
          userData = {
            username: 'teste2',
            name: 'Teste Feminino',
            age: 23,
            goal: 'Tônus muscular & Cardio',
            totalWorkouts: 0,
            history: [],
            weights: {},
            checkIns: [],
            streak: 0,
            badges: [],
            isProfileComplete: true,
            role: 'student'
          };
        } else {
          userData = {
            username: 'teste3',
            name: 'Professor Teste',
            age: 35,
            goal: 'Orientar alunos',
            totalWorkouts: 0,
            history: [],
            weights: {},
            checkIns: [],
            streak: 0,
            badges: [],
            isProfileComplete: true,
            role: 'teacher'
          };
        }
      }

      setUser(userData);
      setIsLoggedIn(true);
      
      if (userData.role === 'teacher') {
        setActiveTab(AppTab.TEACHER);
      } else {
        setActiveTab(AppTab.DASHBOARD);
      }
      
      localStorage.setItem('tatugym_remember_me_checked', rememberMe.toString());
      if (rememberMe) {
        localStorage.setItem('tatugym_remembered', JSON.stringify(userData));
      } else {
        localStorage.removeItem('tatugym_remembered');
      }
      
      if (addToast) addToast(`Bem-vindo de volta, ${userData.name}!`, 'success');
    } else {
      if (addToast) addToast('Usuário ou senha incorreta.', 'error');
    }
  };

  const handleForgotPassword = () => {
    handleVibrate();
    if (addToast) {
      addToast("Um link de recuperação foi enviado para o seu e-mail!", "success");
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  if (!isLoggedIn) {
    return (
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between py-6 px-5 font-sans select-none relative bg-gradient-to-b from-[#112EA7] via-[#0D2483] to-[#08185C]">
        
        {/* PREMIUM HIGH-FIDELITY BACKGROUND AND TECH GRAPHICS */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle Glowing Spotlights */}
          <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute bottom-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
          
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons-tech" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                <path d="M28 0 L56 16.2 M56 16.2 L56 48.5 M56 48.5 L28 64.7 M28 64.7 L0 48.5 M0 48.5 L0 16.2 M0 16.2 L28 0" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                <path d="M28 97 L56 80.8 M56 80.8 L56 48.5 M0 48.5 L0 80.8 M0 80.8 L28 97" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              </pattern>
            </defs>
            {/* Hexagonal overlay */}
            <rect width="100%" height="100%" fill="url(#hexagons-tech)" />
            
            {/* Tech Diagonal Lines */}
            <line x1="10%" y1="0" x2="90%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            <line x1="90%" y1="0" x2="10%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            
            {/* Elegant Tech Circles */}
            <circle cx="85%" cy="30%" r="4" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <circle cx="15%" cy="70%" r="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </svg>
        </div>

        <div className="w-full max-w-sm mx-auto z-10 flex flex-col justify-center flex-grow">
          {/* ÁREA SUPERIOR: Centered Elegant Brand Group */}
          <div className="flex flex-col items-center text-center space-y-6 mb-7">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <img 
                src="assets/logo_horus.png" 
                alt="Horus Training" 
                className="w-48 sm:w-[200px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                onError={(e) => {
                  e.currentTarget.src = "https://raw.githubusercontent.com/Narok94/Horus2.0/main/public/logo/logo.png";
                }}
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Slogan com espaçamento generoso */}
            <div className="space-y-1 select-none">
              <p className="text-white text-[12px] sm:text-sm font-bold uppercase tracking-[0.25em] leading-none font-sans">
                DISCIPLINA HOJE,
              </p>
              <p className="text-[#38BDF8] text-[12px] sm:text-sm font-black uppercase tracking-[0.25em] leading-none font-sans mt-1">
                RESULTADO SEMPRE.
              </p>
            </div>
          </div>

          {/* CARD DE LOGIN: Card Branco Flutuante premium */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,46,138,0.22)] relative border border-gray-100 flex flex-col"
          >
            {/* CABEÇALHO DO CARD */}
            <div className="text-center mb-6">
              <h3 className="text-[21px] sm:text-[23px] font-black text-[#0F2E8A] tracking-tight leading-none mb-1">
                Bem-vindo de volta!
              </h3>
              <p className="text-xs text-zinc-400 font-bold tracking-tight">
                Acesse sua conta para continuar.
              </p>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-6">
                
                {/* CAMPO USUÁRIO / E-MAIL - Overlay Badge floating on border */}
                <div className="relative text-left">
                  {/* Floating label badge covering the border */}
                  <div className="absolute -top-2 left-5 px-1.5 bg-white flex items-center gap-1.5 z-10 select-none">
                    <Mail size={13} className="text-[#1D4ED8]" />
                    <span className="text-[10px] sm:text-[11px] font-black text-[#1D4ED8] uppercase tracking-wider">E-mail</span>
                  </div>
                  
                  <div className="flex items-center bg-white border border-gray-200 focus-within:border-[#1D4ED8] focus-within:ring-4 focus-within:ring-[#1D4ED8]/5 rounded-2xl transition-all duration-300 h-14 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-full bg-transparent text-gray-800 font-bold outline-none text-sm tracking-wide placeholder:text-gray-300 placeholder:font-medium px-5"
                      placeholder="Digite seu e-mail"
                      required
                    />
                  </div>
                </div>
                
                {/* CAMPO SENHA - Overlay Badge floating on border */}
                <div className="relative text-left">
                  {/* Floating label badge covering the border */}
                  <div className="absolute -top-2 left-5 px-1.5 bg-white flex items-center gap-1.5 z-10 select-none">
                    <Lock size={13} className="text-[#1D4ED8]" />
                    <span className="text-[10px] sm:text-[11px] font-black text-[#1D4ED8] uppercase tracking-wider">Senha</span>
                  </div>
                  
                  <div className="relative flex items-center bg-white border border-gray-200 focus-within:border-[#1D4ED8] focus-within:ring-4 focus-within:ring-[#1D4ED8]/5 rounded-2xl transition-all duration-300 h-14 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-full bg-transparent text-gray-800 font-bold outline-none text-sm tracking-wide placeholder:text-gray-300 placeholder:font-medium pl-5 pr-12"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* OPÇÕES */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                {/* Custom Checkbox exactly matching attachment */}
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <div 
                    onClick={() => {
                      handleVibrate();
                      setRememberMe(!rememberMe);
                    }}
                    className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border transition-all duration-200 ${
                      rememberMe 
                        ? 'bg-[#1D4ED8] border-[#1D4ED8] shadow-[0_2px_4px_rgba(29,78,216,0.2)]' 
                        : 'bg-white border-gray-350 group-hover:border-gray-450'
                    }`}
                  >
                    {rememberMe && (
                      <svg className="w-3.5 h-3.5 text-white stroke-[3.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-400 font-bold group-hover:text-gray-550 transition-colors pt-0.5">
                    Lembrar meu acesso
                  </span>
                </label>

                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-[#1D4ED8] hover:text-[#0F2E8A] transition-colors bg-transparent border-0 font-bold text-right"
                >
                  Esqueci minha senha
                </button>
              </div>

              {/* BOTÃO PRINCIPAL COM GRADIENTE AZUL SELECIONADO E ÍCONE PLAY DE ACORDO COM ANEXO */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#122C60] hover:brightness-110 text-white font-black text-xs uppercase tracking-[0.25em] h-14 rounded-2xl shadow-lg shadow-blue-700/25 transition-all flex justify-center items-center gap-2 cursor-pointer border-0 mt-6"
              >
                <Play size={10} className="fill-white text-white ml-0.5" /> ENTRAR
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* QUICK LOGIN & ACCESSIBILITY HOOK */}
        <div className="w-full max-w-sm mx-auto mt-4 text-center z-10 space-y-1.5 shrink-0 py-2 pb-safe">
          <span className="text-white/40 text-[9px] uppercase tracking-widest block font-bold leading-none">
            Acesso Rápido de Teste
          </span>
          <div className="flex gap-1.5 justify-center flex-wrap">
            {[
              { id: 'teste1', label: 'Henrique (T1)' },
              { id: 'teste', label: 'Masc (T)' },
              { id: 'teste2', label: 'Fem (T2)' },
              { id: 'teste3', label: 'Docente (T3)' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                id={`quick-login-${item.id}`}
                onClick={() => handleQuickLogin(item.id)}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white/75 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 rounded-full backdrop-blur-sm transition-all active:scale-95 cursor-pointer leading-none"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // ISOLAMENTO CRUCIAL: Se for professor, renderize diretamente o workspace sem abas do aluno ou barra fixada
  if (isLoggedIn && (user?.username.toLowerCase() === 'teste3' || user?.role === 'teacher')) {
    return (
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col bg-[#050505] text-white select-none font-sans">
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="teacher-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#teacher-grid-pattern)" />
        </svg>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/[0.01] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex-grow flex-1 min-h-0 w-full h-full relative z-10 flex flex-col justify-between overflow-hidden">
          <TeacherView />
        </div>
      </div>
    );
  }

  const renderView = () => {
    if (selectedWorkout) return <WorkoutView />;
    
    switch (activeTab) {
      case AppTab.DASHBOARD: return <DashboardView />;
      case AppTab.WORKOUT: return <WorkoutsListView />;
      case AppTab.HISTORY: return <HistoryView />;
      case AppTab.PROFILE: return <ProfileView />;
      case AppTab.TEACHER: return <TeacherView />;
      default: return <DashboardView />;
    }
  };

  const isLightUser = isLoggedIn && user?.username.toLowerCase() === 'teste1';
  const strokeColor = isLightUser ? "rgba(0, 0, 0, 0.015)" : "rgba(255, 255, 255, 0.02)";
  const circleFill = isLightUser ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.06)";
  const circleFillStrong = isLightUser ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.08)";

  return (
    <div className={`h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col ${
      isLightUser 
        ? "bg-[#F5F7FA] text-gray-900 border-zinc-200" 
        : "bg-[#050505] text-white"
    } transition-colors duration-400 select-none font-sans`}>
      {/* Plexus Connection Grid Background available across all screens - extremely subtle and highly refined */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="global-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isLightUser ? "rgba(0, 0, 0, 0.025)" : "rgba(255, 255, 255, 0.02)"} strokeWidth="0.5" />
            <circle cx="40" cy="0" r="1.0" fill={isLightUser ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)"} />
            <circle cx="0" cy="40" r="1.0" fill={isLightUser ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#global-grid-pattern)" />
        
        <line x1="15%" y1="15%" x2="40%" y2="28%" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="40%" y1="28%" x2="25%" y2="65%" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="25%" y1="65%" x2="65%" y2="80%" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="65%" y1="80%" x2="80%" y2="40%" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="80%" y1="40%" x2="55%" y2="20%" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="55%" y1="20%" x2="15%" y2="15%" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="40%" y1="28%" x2="55%" y2="20%" stroke={strokeColor} strokeWidth="0.5" />
        
        <circle cx="15%" cy="15%" r="1.2" fill={circleFill} />
        <circle cx="40%" cy="28%" r="1.5" fill={circleFillStrong} />
        <circle cx="25%" cy="65%" r="1.2" fill={circleFill} />
        <circle cx="65%" cy="80%" r="2.0" fill={circleFillStrong} />
        <circle cx="80%" cy="40%" r="1.2" fill={circleFill} />
        <circle cx="55%" cy="20%" r="1.5" fill={circleFillStrong} />
      </svg>

      {/* Sutil lighting on top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main viewport-bounded view container */}
      <div className="flex-grow flex-1 min-h-0 w-full max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-2.5 md:px-4 lg:px-6 pt-1 pb-[74px] relative z-10 flex flex-col justify-between overflow-hidden">
        {renderView()}
      </div>

      {/* Navigation Bar */}
      {!selectedWorkout && (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 ${
          isLightUser 
            ? "bg-white/80 border-t border-gray-250/50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" 
            : "bg-[#050505]/85 border-t border-white/[0.04] shadow-2xl"
        } backdrop-blur-md select-none`}>
          <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto h-[74px] px-6 flex items-center justify-around">
            {[
              ...(user?.role === 'teacher' ? [{ id: AppTab.TEACHER, icon: Users, label: 'Alunos' }] : []),
              { id: AppTab.DASHBOARD, icon: isLightUser ? Home : LayoutDashboard, label: isLightUser ? 'Home' : 'Dashboard' },
              { id: AppTab.WORKOUT, icon: Dumbbell, label: 'Treinos' },
              { id: AppTab.HISTORY, icon: isLightUser ? BarChart2 : HistoryIcon, label: isLightUser ? 'Progresso' : 'Histórico' },
              { id: AppTab.PROFILE, icon: UserIcon, label: 'Perfil' }
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleVibrate();
                    setActiveTab(item.id);
                  }}
                  className="relative flex flex-col items-center justify-center flex-1 h-full py-1 hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none group cursor-pointer"
                >
                  {/* Dynamic Neon Active Bar on Top */}
                  {isActive && (
                    <div 
                      className="absolute top-0 h-[3px] w-8 rounded-b-md bg-accent animate-fade"
                      style={{ 
                        boxShadow: `0 1px 12px var(--accent-color), 0 0 6px var(--accent-color)` 
                      }}
                    />
                  )}

                  <item.icon 
                    size={19} 
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-accent scale-110' 
                        : (isLightUser ? 'text-gray-400 group-hover:text-gray-600' : 'text-zinc-500 group-hover:text-zinc-350')
                    }`} 
                    style={{
                      filter: isActive ? `drop-shadow(0 0 8px rgba(var(--accent-color-rgb), 0.55))` : undefined
                    }}
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                  <span className={`text-[8.5px] font-[900] uppercase tracking-[0.14em] mt-1.5 transition-all duration-300 ${
                    isActive 
                      ? 'text-accent font-black' 
                      : (isLightUser ? 'text-gray-400 group-hover:text-gray-600' : 'text-zinc-500 group-hover:text-zinc-350')
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;

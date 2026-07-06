import React from 'react';
import { motion } from 'motion/react';
import { Play, Dumbbell, Activity, Flame, Zap, Target, Star } from 'lucide-react';
import { useStore } from '../../store';
import { AppTab, WorkoutRoutine } from '../../types';

const workoutThemes = [
  {
    color: '#EF4444',
    icon: Flame,
    bgClass: 'bg-red-500'
  },
  {
    color: '#10B981',
    icon: Zap,
    bgClass: 'bg-emerald-500'
  },
  {
    color: '#8B5CF6',
    icon: Target,
    bgClass: 'bg-violet-500'
  },
  {
    color: '#F59E0B',
    icon: Star,
    bgClass: 'bg-amber-500'
  },
  {
    color: '#06B6D4',
    icon: Activity,
    bgClass: 'bg-cyan-500'
  }
];

export const WorkoutsListView: React.FC = () => {
  const { user, allWorkouts, setSelectedWorkout, setActiveTab } = useStore();

  if (!user) return null;

  const isTeste1 = true;
  const workouts = allWorkouts[user.username.toLowerCase() as keyof typeof allWorkouts] || allWorkouts['teste1'] || [];

  const handleVibrate = (ms = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  };

  const startWorkout = (workout: WorkoutRoutine) => {
    handleVibrate(20);
    setSelectedWorkout(workout);
    setActiveTab(AppTab.WORKOUT);
  };

  const getWorkoutFocus = (workout: WorkoutRoutine) => {
    if (workout.title.includes('Treino A') || workout.id === 'h-a') return 'Peito, Ombros e Tríceps';
    if (workout.title.includes('Treino B') || workout.id === 'h-b') return 'Costas, Trapézio e Bíceps';
    if (workout.title.includes('Treino C') || workout.id === 'h-c') return 'Coxas, Panturrilhas e Core';

    const groups = Array.from(new Set(workout.exercises.map(ex => ex.muscleGroup)))
      .filter(g => g && g.toLowerCase() !== 'manguito')
      .map(g => g.charAt(0).toUpperCase() + g.slice(1).toLowerCase());
    
    if (groups.length > 0) {
      if (groups.length > 1) {
        const last = groups[groups.length - 1];
        const rest = groups.slice(0, -1).join(', ');
        return `${rest} e ${last}`;
      }
      return groups[0];
    }
    return workout.title.replace(/Treino\s+[A-Z]\s*-\s*/i, '');
  };

  const getWorkoutCardLabel = (workout: WorkoutRoutine, index: number) => {
    const match = workout.title.match(/Treino\s+([A-Z])/i);
    if (match) {
      return `Treino ${match[1].toUpperCase()}`;
    }
    return `Treino ${String.fromCharCode(65 + index)}`;
  };

  return (
    <div className={`w-full h-auto flex flex-col justify-start pt-12 sm:pt-6 px-3 pb-24 bg-transparent select-none font-sans ${isTeste1 ? 'text-zinc-950 font-black' : 'text-white'}`}>
      
      {/* HEADER: Ultra-clean and aligned with Dashboard */}
      <div className="space-y-1 px-1 shrink-0 mb-4">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent font-mono">Rotinas</span>
        <h1 className={`text-xl font-extrabold tracking-tight leading-none mt-1 ${isTeste1 ? 'text-zinc-950 font-[900]' : 'text-white'}`}>
          Fichas de Treino
        </h1>
        <p className={`text-xs leading-normal ${isTeste1 ? 'text-zinc-650' : 'text-zinc-500'}`}>
          Selecione uma das divisões prescritas para iniciar.
        </p>
      </div>

      {/* LIST: Seamless and airy list without clutter */}
      <div className="w-full space-y-3 px-1">
        {workouts.map((workout, index) => {
          const focus = getWorkoutFocus(workout);
          const label = getWorkoutCardLabel(workout, index);
          const exerciseCount = workout.exercises.length;
          const cleanDesc = workout.description ? workout.description.replace(/^Foco:\s*/i, '') : 'Fisiologia linear de sobrecarga progressiva.';
          
          const themeInfo = workoutThemes[index % workoutThemes.length];
          const ThemeIcon = themeInfo.icon;

          return (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => startWorkout(workout)}
              style={{ borderLeftColor: themeInfo.color }}
              className={`group relative rounded-2xl p-4.5 border-l-4 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 active:scale-[0.99] border ${
                isTeste1 
                  ? 'bg-gradient-to-br from-[#2563EB] to-[#122C60] border-white/10 text-white shadow-lg shadow-blue-900/5' 
                  : 'bg-[#080808] border-white/5 hover:border-accent/40 hover:bg-[#0c0c0c]/80 shadow-sm'
              }`}
            >
              {/* Left Zone: Details */}
              <div className="min-w-0 flex-1 space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono text-white ${themeInfo.bgClass}`}>
                    {label}
                  </span>
                  <ThemeIcon size={12} className="shrink-0" style={{ color: themeInfo.color }} />
                  <span className={`text-[7.5px] font-mono font-bold uppercase tracking-wider ${
                    isTeste1 ? 'text-white/60' : 'text-zinc-500'
                  }`}>
                    {exerciseCount} Exercícios
                  </span>
                </div>

                <h2 className={`text-base font-extrabold tracking-tight group-hover:text-[#93C5FD] transition-colors leading-tight ${
                  isTeste1 ? 'text-white font-[900]' : 'text-white'
                }`}>
                  {focus}
                </h2>

                <p className={`text-[10px] leading-normal text-wrap whitespace-normal ${
                  isTeste1 ? 'text-white/80' : 'text-zinc-500'
                }`}>
                  {cleanDesc}
                </p>
              </div>

              {/* Right Zone: Clean, floating Action Icon */}
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 shrink-0 select-none ${
                isTeste1 
                  ? 'bg-white border-transparent text-[#2563EB] shadow-md group-hover:scale-105' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-400 group-hover:border-accent/20 group-hover:bg-accent/5 group-hover:text-accent'
              }`}>
                <Play size={11} className="fill-current group-hover:scale-110 ml-0.5 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Jessica Specific Periodization Info Card */}
      {user.username.toLowerCase() === 'jessica' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-4 p-4 rounded-2xl border ${
            isTeste1
              ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-white/10 text-white'
              : 'bg-zinc-900/40 border-white/5 text-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <Activity className="text-accent" size={16} />
            <h3 className="text-xs font-black uppercase tracking-wider italic">
              Periodização & Controle de Fadiga (4 semanas)
            </h3>
          </div>

          <p className="text-[10px] leading-relaxed mb-3 text-zinc-300/90">
            A periodização estruturada com semanas de descarga (deload) é fundamental para controlar a fadiga e evitar picos de dor associados à <strong>fibromialgia</strong>. Mantenha os limites estabelecidos abaixo para treinar de forma constante e segura:
          </p>

          <div className="grid grid-cols-4 gap-1.5 text-center text-[9px] font-mono mb-3">
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
              <span className="block text-accent font-black">SEM 1</span>
              <span className="text-[7px] block text-white/50 leading-tight">Adaptação</span>
              <span className="font-bold text-white block mt-0.5 leading-none">3 Séries</span>
              <span className="text-white/60">60-70%</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
              <span className="block text-accent font-black">SEM 2</span>
              <span className="text-[7px] block text-white/50 leading-tight">Constância</span>
              <span className="font-bold text-white block mt-0.5 leading-none">3 Séries</span>
              <span className="text-white/60">60-70%</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
              <span className="block text-orange-400 font-black">SEM 3</span>
              <span className="text-[7px] block text-white/50 leading-tight">Progressão</span>
              <span className="font-bold text-white block mt-0.5 leading-none">4 Séries</span>
              <span className="text-white/60">70-80%</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
              <span className="block text-emerald-400 font-black">SEM 4</span>
              <span className="text-[7px] block text-white/50 leading-tight">Deload 💤</span>
              <span className="font-bold text-white block mt-0.5 leading-none">2-3 Sers</span>
              <span className="text-white/60">50-60%</span>
            </div>
          </div>

          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-2">
            <span className="text-emerald-400 font-black text-xs font-mono leading-none">⚠️</span>
            <p className="text-[9.5px] leading-relaxed text-emerald-300">
              <strong>Semana de Deload:</strong> Reduza as séries e a carga na Semana 4 para regenerar as articulações e prevenir o acúmulo de fadiga.
            </p>
          </div>
        </motion.div>
      )}

      {/* SUBTLE FOOTER METADATA (Instead of a heavy glowing motivational box) */}
      <div className="px-1 shrink-0 pt-4 text-center">
        <div className={`flex items-center justify-center gap-1.5 text-[8.5px] font-mono font-bold tracking-wider uppercase leading-none ${
          isTeste1 ? 'text-zinc-500' : 'text-zinc-650'
        }`}>
          <Activity size={10} className={isTeste1 ? 'text-zinc-400' : 'text-zinc-500'} />
          <span>Fichas atualizadas pelo Treinador</span>
        </div>
      </div>
      
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Play, Dumbbell, Activity } from 'lucide-react';
import { useStore } from '../../store';
import { AppTab, WorkoutRoutine } from '../../types';

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
    <div className={`w-full min-h-screen flex flex-col justify-start py-4 px-3 pb-32 bg-transparent select-none font-sans ${isTeste1 ? 'text-zinc-950 font-black' : 'text-white'}`}>
      
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
      <div className="flex-1 w-full space-y-3 px-1">
        {workouts.map((workout, index) => {
          const focus = getWorkoutFocus(workout);
          const label = getWorkoutCardLabel(workout, index);
          const exerciseCount = workout.exercises.length;
          const cleanDesc = workout.description ? workout.description.replace(/^Foco:\s*/i, '') : 'Fisiologia linear de sobrecarga progressiva.';
          
          return (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => startWorkout(workout)}
              className={`group relative rounded-2xl p-4.5 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 active:scale-[0.99] border ${
                isTeste1 
                  ? 'bg-gradient-to-br from-[#1E40AF] to-[#122C60] border-white/10 text-white shadow-lg shadow-blue-900/5' 
                  : 'bg-[#080808] border-white/5 hover:border-accent/40 hover:bg-[#0c0c0c]/80 shadow-sm'
              }`}
            >
              {/* Left Zone: Details */}
              <div className="min-w-0 flex-1 space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono border ${
                    isTeste1 
                      ? 'bg-white/15 border-white/10 text-white' 
                      : 'bg-zinc-900 border-white/5 text-zinc-400'
                  }`}>
                    {label}
                  </span>
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
                  ? 'bg-white border-transparent text-[#1E40AF] shadow-md group-hover:scale-105' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-400 group-hover:border-accent/20 group-hover:bg-accent/5 group-hover:text-accent'
              }`}>
                <Play size={11} className="fill-current group-hover:scale-110 ml-0.5 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>

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

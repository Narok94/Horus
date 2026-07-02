import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../store';
import { henriqueDiet, jessicaDiet } from '../../src/data/dietPlans';
import { Clock, Info, Utensils, Apple } from 'lucide-react';

export const DietView: React.FC = () => {
  const { user } = useStore();
  const username = user?.username.toLowerCase();

  // Determine which diet plan to show based on username
  let currentDiet = null;
  if (username === 'teste1' || username?.includes('henrique')) {
    currentDiet = henriqueDiet;
  } else if (username === 'jessica' || username?.includes('jessica')) {
    currentDiet = jessicaDiet;
  }

  const isLightUser = user?.role !== 'teacher';
  const accentColor = isLightUser ? (user?.sex === 'feminino' ? '#FF007F' : '#2563EB') : '#10B981';

  if (!currentDiet) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 p-6 text-center">
        <Utensils size={48} className={isLightUser ? 'text-zinc-300' : 'text-zinc-700'} />
        <h2 className={`text-xl font-black tracking-tight ${isLightUser ? 'text-zinc-900' : 'text-white'}`}>Plano Alimentar Indisponível</h2>
        <p className={`text-sm ${isLightUser ? 'text-zinc-500' : 'text-zinc-400'}`}>Não encontramos um plano alimentar específico para o seu usuário. Por favor, consulte sua nutricionista.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pb-24 font-sans max-w-full">
      {/* HEADER */}
      <div className="px-1 shrink-0 mb-6 text-left mt-2">
        <span className={`text-[9px] font-black uppercase tracking-[0.3em] font-mono`} style={{ color: accentColor }}>Nutrição</span>
        <h1 className={`text-2xl font-extrabold tracking-tight leading-none mt-1 ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-white'}`}>
          Plano Alimentar
        </h1>
        <p className={`text-[10px] mt-1.5 font-bold uppercase tracking-wider ${isLightUser ? 'text-zinc-500' : 'text-white/50'}`}>
          {user?.name}
        </p>
      </div>

      <div className="space-y-4">
        {/* ORIENTATIONS CARD */}
        {currentDiet.orientations && currentDiet.orientations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-[20px] shadow-sm border ${
              isLightUser 
                ? 'bg-zinc-100 border-zinc-200' 
                : 'bg-zinc-800/50 border-white/10'
            }`}
          >
            <h3 className={`font-black text-xs uppercase tracking-widest mb-3`} style={{ color: accentColor }}>
              Orientações Gerais
            </h3>
            <ul className="space-y-2">
              {currentDiet.orientations.map((orientation, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  <span className={`text-[11px] font-semibold leading-relaxed ${isLightUser ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {orientation}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* MEALS */}
        {currentDiet.meals.map((meal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-[20px] shadow-sm border ${
              isLightUser 
                ? 'bg-white border-zinc-200' 
                : 'bg-zinc-900/50 border-white/5'
            }`}
          >
            {/* Meal Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isLightUser ? 'bg-zinc-100' : 'bg-black/40'
                }`} style={{ color: accentColor }}>
                  <Apple size={16} />
                </div>
                <div>
                  <h3 className={`font-black text-sm tracking-tight ${isLightUser ? 'text-zinc-900' : 'text-white'}`}>
                    {meal.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className={isLightUser ? 'text-zinc-400' : 'text-zinc-500'} />
                    <span className={`text-[9.5px] font-bold tracking-widest uppercase font-mono ${
                      isLightUser ? 'text-zinc-400' : 'text-zinc-500'
                    }`}>
                      {meal.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Items */}
            <ul className="space-y-2 mt-4">
              {meal.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  <span className={`text-xs font-semibold leading-relaxed ${isLightUser ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Meal Tips */}
            {meal.tips && meal.tips.length > 0 && (
              <div className={`mt-4 p-3 rounded-xl border ${
                isLightUser ? 'bg-zinc-50 border-zinc-100' : 'bg-black/30 border-white/5'
              }`}>
                {meal.tips.map((tip, i) => (
                  <p key={i} className={`text-[10px] font-medium leading-relaxed flex items-start gap-1.5 ${
                    i > 0 ? 'mt-2' : ''
                  } ${isLightUser ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    <Info size={12} className="shrink-0 mt-0.5" style={{ color: accentColor }} />
                    {tip}
                  </p>
                ))}
              </div>
            )}

            {/* Substitutions */}
            {meal.substitutions && meal.substitutions.length > 0 && (
              <div className="mt-4 space-y-3">
                {meal.substitutions.map((sub, i) => (
                  <div key={i} className={`p-3 rounded-xl border border-dashed ${
                    isLightUser ? 'border-zinc-300 bg-transparent' : 'border-white/15 bg-transparent'
                  }`}>
                    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2`} style={{ color: accentColor }}>
                      {sub.name}
                    </h4>
                    <ul className="space-y-1.5">
                      {sub.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <div className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current opacity-40" />
                          <span className={`text-[11px] font-semibold leading-relaxed ${isLightUser ? 'text-zinc-700' : 'text-zinc-300'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {sub.tips && sub.tips.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-dashed border-current border-opacity-10">
                        {sub.tips.map((tip, idx) => (
                          <p key={idx} className={`text-[9px] font-medium leading-relaxed ${isLightUser ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            • {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

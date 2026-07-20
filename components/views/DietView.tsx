import React from 'react';
import { useStore } from '../../store';
import { Utensils, Info, Check, Clock, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DietPlan, Meal, MealItem } from '../../types';

export const DietView: React.FC = () => {
  const { user, toggleMealComplete, theme } = useStore();
  const dietPlan = user?.dietPlan;

  const isLightUser = user?.username.toLowerCase() === 'henrique' || theme === 'light';

  if (!dietPlan) {
    return (
      <div className={`w-full min-h-screen flex flex-col justify-start pt-12 sm:pt-6 pb-32 bg-transparent select-none font-sans ${isLightUser ? 'text-zinc-950 font-black' : 'text-white'}`}>
        <header className={`flex items-center justify-between py-1.5 px-1.5 border-b shrink-0 ${isLightUser ? 'border-zinc-200' : 'border-white/5'}`}>
          <div>
            <h1 className={`text-xl font-black tracking-tighter uppercase leading-none ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-white'}`}>Sua <span className={isLightUser ? 'text-[#2563EB]' : 'text-accent'}>Dieta</span></h1>
            <p className={`${isLightUser ? 'text-zinc-500 font-bold' : 'text-white/40'} uppercase tracking-widest mt-1 text-[8px] font-mono`}>Plano Alimentar.</p>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-12">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-500 mb-2">
            <Utensils size={16} />
          </div>
          <p className="text-zinc-500 text-[8.5px] font-black uppercase tracking-[0.15em]">Nenhum plano alimentar cadastrado.</p>
        </div>
      </div>
    );
  }

  // Find if meal is completed today
  const tzOffset = (new Date()).getTimezoneOffset() * 60000;
  const today = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
  const completedToday = user?.completedMeals?.[today] || [];

  return (
    <div className={`w-full min-h-screen flex flex-col justify-start pt-12 sm:pt-6 pb-32 bg-transparent select-none font-sans ${isLightUser ? 'text-zinc-950 font-black' : 'text-white'}`}>
      <header className={`flex items-center justify-between py-1.5 px-1.5 border-b shrink-0 ${isLightUser ? 'border-zinc-200' : 'border-white/5'}`}>
        <div>
          <h1 className={`text-xl font-black tracking-tighter uppercase leading-none ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-white'}`}>Sua <span className={isLightUser ? 'text-[#2563EB]' : 'text-accent'}>Dieta</span></h1>
          <p className={`${isLightUser ? 'text-zinc-500 font-bold' : 'text-white/40'} uppercase tracking-widest mt-1 text-[8px] font-mono`}>Plano Alimentar.</p>
        </div>
      </header>

      {/* Resumo/Header da Dieta */}
      <div className="px-1.5 mt-3 space-y-3">
        <div className={`rounded-xl p-3 border shadow-sm ${isLightUser ? 'bg-white border-zinc-200' : 'bg-zinc-900/40 border-zinc-800'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} className={isLightUser ? 'text-[#2563EB]' : 'text-accent'} />
            <span className="text-[10px] font-black uppercase tracking-tight">Orientações Gerais</span>
          </div>
          <p className={`text-[11px] leading-snug font-medium ${isLightUser ? 'text-zinc-700' : 'text-zinc-400'}`}>
            {dietPlan.generalGuidelines}
          </p>
          <div className="mt-3 pt-2 border-t border-dashed border-zinc-200 dark:border-white/10 flex flex-col gap-0.5">
            <span className={`text-[8.5px] font-bold uppercase tracking-widest ${isLightUser ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Nutricionista: {dietPlan.nutritionist.name} (CRN {dietPlan.nutritionist.crn})
            </span>
          </div>
        </div>

        {/* Timeline das Refeições */}
        <div className="space-y-3">
          {dietPlan.meals.map((meal) => {
            const isCompleted = completedToday.includes(meal.id);
            return (
              <div 
                key={meal.id} 
                className={`rounded-2xl p-4 shadow-md border transition-all duration-200 ${
                  isCompleted 
                    ? (isLightUser ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-900/20 border-emerald-500/20')
                    : (isLightUser ? 'bg-gradient-to-br from-[#2563EB] to-[#122C60] border-white/10 text-white shadow-lg' : 'bg-zinc-900/40 border-zinc-850/80')
                }`}
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Clock size={10} className={isCompleted ? 'text-emerald-500' : (isLightUser ? 'text-white/70' : 'text-accent')} />
                      <span className={`text-[9px] font-mono font-bold tracking-widest ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : (isLightUser ? 'text-white/80' : 'text-zinc-400')}`}>
                        {meal.time}
                      </span>
                    </div>
                    <h3 className={`text-[14px] font-black uppercase tracking-tight italic leading-tight ${isCompleted ? (isLightUser ? 'text-emerald-700' : 'text-emerald-400') : (isLightUser ? 'text-white' : 'text-white')}`}>
                      {meal.name}
                    </h3>
                  </div>

                  <button 
                    onClick={() => toggleMealComplete(meal.id)}
                    className={`w-7 h-7 rounded flex items-center justify-center border transition-all duration-200 shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : (isLightUser ? 'bg-white/10 border-white/20 text-transparent' : 'bg-zinc-950 border-zinc-800 text-transparent')
                    }`}
                  >
                    <Check size={14} className={isCompleted ? 'opacity-100' : 'opacity-0'} />
                  </button>
                </div>

                {/* Items */}
                <div className={`space-y-1.5 pt-2 border-t ${isCompleted ? 'border-emerald-500/10' : (isLightUser ? 'border-white/10' : 'border-white/[0.03]')}`}>
                  {meal.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[11px] font-bold leading-tight ${isCompleted ? (isLightUser ? 'text-emerald-800' : 'text-emerald-100') : (isLightUser ? 'text-white' : 'text-zinc-200')}`}>
                          • {item.food}
                        </span>
                        {item.quantity && (
                          <span className={`text-[9px] font-mono font-bold tracking-wider shrink-0 mt-0.5 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400/70' : (isLightUser ? 'text-white/70' : 'text-zinc-500')}`}>
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      {item.alternatives && item.alternatives.length > 0 && (
                        <div className={`text-[9px] font-medium italic pl-3 ${isCompleted ? 'text-emerald-600/70 dark:text-emerald-400/50' : (isLightUser ? 'text-white/60' : 'text-zinc-500')}`}>
                          ou: {item.alternatives.join(' / ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {meal.obs && (
                  <div className={`mt-3 pt-2 border-t text-[10px] italic font-medium leading-snug ${isCompleted ? 'border-emerald-500/10 text-emerald-700/80 dark:text-emerald-300/70' : (isLightUser ? 'border-white/10 text-white/70' : 'border-white/[0.03] text-zinc-400')}`}>
                    <span className="font-bold not-italic">Obs:</span> {meal.obs}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Substitutions */}
        {dietPlan.substitutions && dietPlan.substitutions.length > 0 && (
          <div className={`mt-4 rounded-xl p-3 border border-dashed ${isLightUser ? 'bg-white/50 border-zinc-300' : 'bg-zinc-900/20 border-zinc-800'}`}>
            <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isLightUser ? 'text-zinc-800' : 'text-zinc-400'}`}>Substituições e Dicas</h4>
            <div className="space-y-3">
              {dietPlan.substitutions.map((sub, idx) => (
                <div key={idx} className="space-y-1">
                  <span className={`text-[11px] font-bold uppercase ${isLightUser ? 'text-zinc-900' : 'text-white'}`}>{sub.name}</span>
                  {sub.items.map((item, i) => (
                     <div key={i} className="flex justify-between items-start gap-2">
                        <span className={`text-[10px] font-medium leading-tight ${isLightUser ? 'text-zinc-700' : 'text-zinc-300'}`}>- {item.food}</span>
                        <span className={`text-[9px] font-mono font-bold ${isLightUser ? 'text-zinc-500' : 'text-zinc-500'}`}>{item.quantity}</span>
                     </div>
                  ))}
                  {sub.obs && <p className={`text-[9px] italic mt-1 ${isLightUser ? 'text-zinc-500' : 'text-zinc-500'}`}>* {sub.obs}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

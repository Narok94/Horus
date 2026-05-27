import React, { useState, useEffect, useRef } from 'react';
import { Search, Check, X, Sparkles, Command, Dumbbell } from 'lucide-react';
import { BaseExercise, exerciseDatabase } from '../../../data/exerciseDatabase';

interface ExerciseLibraryProps {
  filteredSuggestions: BaseExercise[];
  searchExerciseQuery: string;
  setSearchExerciseQuery: (query: string) => void;
  selectedMuscleFilter: string;
  setSelectedMuscleFilter: (muscle: string) => void;
  recentAddedId: string | null;
  onAddExercise: (baseEx: BaseExercise) => void;
  onInjectBlock?: (exercisesList: BaseExercise[]) => void;
}

const blockTemplates = [
  {
    id: 'push',
    name: 'Push (Peito, Ombros e Tríceps)',
    desc: 'Básico completo empurrar',
    muscleGroup: 'Peito',
    exercises: ['Supino Reto Barra', 'Supino Inclinado Halter', 'Elevação Lateral Halter', 'Desenvolvimento Halter', 'Tríceps Pulley']
  },
  {
    id: 'pull',
    name: 'Pull (Costas e Bíceps)',
    desc: 'Completo de puxar e trapézio',
    muscleGroup: 'Costas',
    exercises: ['Puxada Alta Pronada', 'Remada Baixa Triângulo', 'Pulldown Polia', 'Rosca Direta Barra W', 'Rosca Martelo']
  },
  {
    id: 'pernas_quad',
    name: 'Quadríceps & Glúteos',
    desc: 'Foco na cadeia anterior e quadril',
    muscleGroup: 'Pernas',
    exercises: ['Agachamento Livre', 'Leg Press 45', 'Cadeira Extensora', 'Cadeira Abdutora']
  },
  {
    id: 'pernas_post',
    name: 'Posterior & Pernas',
    desc: 'Cadeia posterior focada',
    muscleGroup: 'Pernas',
    exercises: ['Mesa Flexora', 'Stiff Barra', 'Agachamento Sumô', 'Elevação Pélvica']
  },
  {
    id: 'ombros',
    name: 'Ombro Completo',
    desc: 'Foco em largura e densidade',
    muscleGroup: 'Ombros',
    exercises: ['Elevação Lateral Halter', 'Desenvolvimento Halter', 'Crucifixo Invertido', 'Encolhimento']
  },
  {
    id: 'bracos',
    name: 'Braços Máximos',
    desc: 'Bíceps e tríceps em sinergia',
    muscleGroup: 'Braços',
    exercises: ['Rosca Direta Barra W', 'Tríceps Pulley', 'Rosca Martelo', 'Tríceps Testa', 'Rosca Alternada']
  }
];

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  filteredSuggestions,
  searchExerciseQuery,
  setSearchExerciseQuery,
  selectedMuscleFilter,
  setSelectedMuscleFilter,
  recentAddedId,
  onAddExercise,
  onInjectBlock,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'movements' | 'templates'>('movements');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey 'A' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        (activeEl as HTMLElement).contentEditable === 'true'
      );
      if (isInput) return;

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Enter triggers rapid add of first filtered recommendation
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (activeSubTab === 'movements' && filteredSuggestions.length > 0) {
        onAddExercise(filteredSuggestions[0]);
        setSearchExerciseQuery(''); // clean search text for rapid workflow
      }
    }
  };

  // Convert template names list into actual database objects list
  const handleSelectTemplate = (exercisesNames: string[]) => {
    if (!onInjectBlock) return;
    const resolvedExercises = exercisesNames.map(name => {
      return exerciseDatabase.find(ex => ex.name.toLowerCase() === name.toLowerCase()) || {
        name,
        muscleGroup: 'Livre',
        defaultSets: 3,
        defaultReps: '10',
        defaultRest: 60
      };
    });
    onInjectBlock(resolvedExercises);
  };

  return (
    <div className="flex flex-col min-h-0 bg-transparent border-0 rounded-none p-6 md:p-8 lg:overflow-hidden lg:h-full h-auto w-full">
      
      {/* Search Header and minimal tab switch */}
      <div className="flex flex-col space-y-5 pb-6 border-b border-white/[0.015] shrink-0">
        
        {/* Silent segment pickers for Movements or Core Block Templates */}
        <div className="flex items-center justify-between">
          <div className="flex bg-[#111318] p-1 rounded-xl border border-white/[0.015]">
            <button
              type="button"
              onClick={() => setActiveSubTab('movements')}
              className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-150 cursor-pointer ${
                activeSubTab === 'movements'
                  ? 'bg-[#171A20] text-zinc-100 font-extrabold shadow-sm border border-white/5'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Biblioteca
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('templates')}
              className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'templates'
                  ? 'bg-[#171A20] text-zinc-100 font-extrabold shadow-sm border border-white/5'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Sparkles size={12} className="text-zinc-400" />
              <span>Blocos Prontos</span>
            </button>
          </div>
          
          <span className="text-xs text-zinc-650 font-mono flex items-center gap-1.5 h-4 select-none mr-1">
            <Command size={12} />
            <span>Pressione 'A'</span>
          </span>
        </div>

        {activeSubTab === 'movements' && (
          <>
            {/* Search command slot - Premium search input with spacious padding */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                <Search size={18} />
               </div>
              <input 
                ref={inputRef}
                type="text"
                placeholder="Buscar exercício... [Pressione Enter para adicionar]"
                value={searchExerciseQuery}
                onChange={(e) => setSearchExerciseQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="w-full bg-[#111318] border border-white/[0.015] text-sm sm:text-[15px] py-4 pl-11 pr-20 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/10 transition-all font-sans font-semibold tracking-tight shadow-inner"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 select-none text-[10px] font-mono font-bold text-zinc-500 bg-[#0F1014] border border-white/5 px-2 py-1 rounded-md">
                <span>Enter</span>
              </div>
            </div>

            {/* Quiet categories list */}
            <div className="flex flex-wrap gap-2 pt-1 overflow-x-auto no-scrollbar select-none">
              {['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços'].map(muscle => {
                const isSelected = selectedMuscleFilter === muscle;
                return (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => setSelectedMuscleFilter(muscle)}
                    className={`px-4.5 py-2.5 text-xs font-bold rounded-xl transition-all duration-155 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#171A20] text-zinc-100 border border-white/5 shadow' 
                        : 'bg-[#111318]/40 text-zinc-500 hover:text-zinc-200 border border-white/[0.005] hover:bg-[#111318]/90'
                    }`}
                  >
                    {muscle}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* List Area */}
      <div className="flex-grow lg:overflow-y-auto lg:overscroll-contain lg:pr-1 lg:no-scrollbar mt-4 overflow-visible h-auto lg:h-full">
        {activeSubTab === 'movements' ? (
          <div className="divide-y divide-white/[0.015] space-y-1.5 pb-2">
            {filteredSuggestions.map((baseEx, bIdx) => {
              const isRecentlyAdded = recentAddedId === baseEx.name;

              return (
                <div
                  key={bIdx}
                  onClick={() => onAddExercise(baseEx)}
                  className="flex items-center justify-between py-5 px-4 hover:bg-[#171A20]/25 border border-transparent hover:border-white/[0.015] transition-all duration-150 group rounded-xl cursor-pointer select-none"
                >
                  <div className="min-w-0 pr-4">
                    <span className="text-[15px] font-bold text-zinc-100 block truncate group-hover:text-white transition-colors tracking-tight">
                      {baseEx.name}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-sans mt-1.5 block">
                      {baseEx.muscleGroup}
                    </span>
                  </div>
                  
                  <div className="shrink-0">
                    {isRecentlyAdded ? (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl border border-white/5">
                        <Check size={12} className="text-emerald-400" />
                        <span>Adicionado</span>
                      </span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-zinc-300 font-bold transition-all duration-150 bg-[#171A20] px-3.5 py-2 rounded-xl border border-white/5 hover:bg-zinc-100 hover:text-[#09090B] shadow-sm">
                        + Incluir
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredSuggestions.length === 0 && (
              <p className="text-zinc-650 text-sm text-center py-20 font-sans">Nenhum exercício encontrado</p>
            )}
          </div>
        ) : (
          /* PRESETS TEMPLATE PANEL with extra luxury and larger lines */
          <div className="space-y-4 pt-2 select-none">
            <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase px-1">
              Inserir blocos estruturados em 1 clique
            </p>

            <div className="space-y-4">
              {blockTemplates.map((block) => (
                <div 
                  key={block.id}
                  className="border border-white/[0.015] bg-[#111318] rounded-2xl p-6 hover:border-white/[0.035] hover:bg-[#111318]/70 transition-all flex flex-col justify-between gap-5 group"
                >
                  <div>
                    <h4 className="text-base font-bold text-zinc-200 tracking-tight">
                      {block.name}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {block.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {block.exercises.slice(0, 3).map((exName, idx) => (
                        <span key={idx} className="bg-[#0F1014] border border-white/5 text-zinc-400 text-[11px] px-3 py-1 rounded-lg font-bold">
                          {exName.split(' ')[0]} {/* simplified label snippet */}
                        </span>
                      ))}
                      {block.exercises.length > 3 && (
                        <span className="text-xs text-zinc-600 self-center font-extrabold pl-1 select-none">
                          +{block.exercises.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(block.exercises)}
                    className="w-full text-center py-3.5 bg-[#171A20] hover:bg-zinc-100 hover:text-[#09090B] text-zinc-200 text-xs font-black tracking-widest uppercase rounded-xl border border-white/5 transition-all duration-150 cursor-pointer"
                  >
                    Carregar Bloco
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

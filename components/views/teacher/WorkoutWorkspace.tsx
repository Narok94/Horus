import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, Sliders, Play, Plus, Copy, RefreshCw, X, Check, Eye, ChevronDown, User, AlertCircle
} from 'lucide-react';
import { WorkoutRoutine, Exercise, User as StudentUser } from '../../../types';
import { BaseExercise } from '../../../data/exerciseDatabase';

interface WorkoutWorkspaceProps {
  localRoutines: WorkoutRoutine[];
  activeRoutineIdx: number;
  setActiveRoutineIdx: (idx: number) => void;
  expandedExerciseId: string | null;
  setExpandedExerciseId: (id: string | null) => void;
  sheetFrequency: 'AB' | 'ABC' | 'ABCD' | 'ABCDE';
  getFrequencyCount: () => number;
  onUpdateExerciseField: (id: string, field: keyof Exercise, val: any) => void;
  onRemoveExercise: (id: string) => void;
  onAddCustomExercise: () => void;
  onUpdateRoutineTitle: (title: string) => void;
  students?: StudentUser[];
  onCloneRoutine?: (fromIdx: number) => void;
  onCloneFromOtherStudent?: (otherStudentUsername: string) => void;
  onClearWorkoutRoutine?: () => void;
  onInjectBlock?: (exercisesList: BaseExercise[]) => void;
}

export const WorkoutWorkspace: React.FC<WorkoutWorkspaceProps> = ({
  localRoutines,
  activeRoutineIdx,
  setActiveRoutineIdx,
  expandedExerciseId,
  setExpandedExerciseId,
  sheetFrequency,
  getFrequencyCount,
  onUpdateExerciseField,
  onRemoveExercise,
  onAddCustomExercise,
  onUpdateRoutineTitle,
  students = [],
  onCloneRoutine,
  onCloneFromOtherStudent,
  onClearWorkoutRoutine,
}) => {
  const activeRoutine = localRoutines[activeRoutineIdx];
  const exercises = activeRoutine?.exercises || [];
  
  // Local state for dropdown managers
  const [showDuplicateMenu, setShowDuplicateMenu] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);

  // Grab the specific active exercise object for the inspector drawer
  const activeExercise = exercises.find(ex => ex.id === expandedExerciseId);

  // Available tag toggles
  const intensityTags = [
    { label: 'Drop Set', field: 'dropSet' as keyof Exercise },
    { label: "Rest 'n' Pause", field: 'restPause' as keyof Exercise },
    { label: 'Bi-set', field: 'biSet' as keyof Exercise },
    { label: 'Cluster', field: 'cluster' as keyof Exercise },
    { label: 'Isometria', field: 'isometria' as keyof Exercise },
    { label: 'Falha', field: 'falha' as keyof Exercise }
  ];

  // Calculate precise training metrics for the header summary
  const totalSets = exercises.reduce((acc, curr) => acc + (curr.sets || 0), 0);
  const totalVolumeEst = exercises.reduce((acc, curr) => {
    const weight = parseFloat(String(curr.notes || '0').replace(/[^0-9.]/g, '')) || 0;
    const reps = parseInt(String(curr.reps || '10').replace(/[^0-9]/g, '')) || 10;
    return acc + (curr.sets || 0) * reps * (weight || 1);
  }, 0);

  return (
    <div className="flex flex-col min-h-0 bg-transparent border-0 rounded-none p-6 md:p-8 lg:overflow-hidden lg:h-full animate-fade relative w-full h-auto">
      
      {/* 1. CONTINUOUS WORKSPACE INTEGRATED HEADER (CABEÇALHO DO TREINO) */}
      <div className="flex flex-col space-y-4 pb-6 border-b border-white/[0.015] shrink-0">
        
        {/* Main Title, Training Slot Badges & Analytics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 select-none">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              Treino {String.fromCharCode(65 + activeRoutineIdx)}
            </h2>
            <span className="text-zinc-800 select-none hidden sm:inline">•</span>
            
            {/* Horizontal analytics badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-[#171A20] text-zinc-300 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/5">
                {exercises.length} {exercises.length === 1 ? 'Movimento' : 'Movimentos'}
              </span>
              <span className="bg-[#171A20] text-zinc-300 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/5">
                {totalSets} Séries
              </span>
              {totalVolumeEst > 0 && (
                <span className="bg-[#171A20]/80 text-[#00D2FF] text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/5">
                  Vol. Est: {totalVolumeEst} kg
                </span>
              )}
            </div>
          </div>

          {/* Clean slot navigation tab segment integrated inside the layout frame */}
          <div className="flex items-center gap-1 bg-[#0F1014] p-1 rounded-xl border border-white/[0.015] shrink-0 select-none">
            {Array.from({ length: getFrequencyCount() }).map((_, idx) => {
              const char = String.fromCharCode(65 + idx);
              const isSelected = activeRoutineIdx === idx;
              return (
                <button
                  key={char}
                  type="button"
                  onClick={() => {
                    setActiveRoutineIdx(idx);
                    setExpandedExerciseId(null);
                    setShowDuplicateMenu(false);
                    setShowStudentMenu(false);
                  }}
                  className={`py-1.5 px-3 md:px-3.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#171A20] text-white shadow border border-white/5 font-black'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Slot {char}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic target muscle focus input block (Foco Muscular) */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 font-sans select-none">
            Foco de Treinamento / Grupamento Muscular
          </label>
          <input 
            type="text"
            value={activeRoutine?.title || ''}
            onChange={(e) => onUpdateRoutineTitle(e.target.value)}
            placeholder="Ex: Peitoral, Ombros & Tríceps (Cadeia Empurrar)"
            className="w-full bg-[#0F1014] border border-white/[0.015] focus:border-white/10 focus:bg-[#0F1014] py-3.5 px-4 rounded-xl text-sm font-bold text-zinc-100 outline-none transition-all placeholder:text-zinc-650"
          />
        </div>

        {/* Integrated interactive action toolbar with flush borders (Ações Rápidas) */}
        <div className="flex flex-wrap items-center gap-2 pt-1.5 relative select-none">
          
          {/* Quick copy/clone slot dropdown panel */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowDuplicateMenu(!showDuplicateMenu);
                setShowStudentMenu(false);
              }}
              className="py-2.5 px-3.5 text-xs text-zinc-400 font-extrabold hover:text-white bg-[#0F1014] border border-white/[0.015] hover:border-white/5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Copy size={13} className="text-zinc-500" />
              <span>Clonar Treino</span>
              <ChevronDown size={11} className="text-zinc-500" />
            </button>
 
            {showDuplicateMenu && (
              <div className="absolute left-0 top-11.5 w-[200px] bg-[#0F1014] border border-white/[0.015] rounded-xl shadow-2xl p-1.5 z-50 animate-fade">
                <p className="text-[9px] text-zinc-500 font-mono tracking-wider p-2.5 uppercase select-none">Origens de cópia (Slots)</p>
                {Array.from({ length: getFrequencyCount() }).map((_, idx) => {
                  if (idx === activeRoutineIdx) return null;
                  const char = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (onCloneRoutine) onCloneRoutine(idx);
                        setShowDuplicateMenu(false);
                      }}
                      className="w-full text-left text-xs px-2.5 py-2 rounded-lg hover:bg-[#111318] hover:text-white transition-colors cursor-pointer text-zinc-400 flex items-center gap-2 font-bold"
                    >
                      <Copy size={11} className="text-zinc-500" />
                      <span>Clonar do Treino {char}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
 
          {/* Student list duplicator flow */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStudentMenu(!showStudentMenu);
                setShowDuplicateMenu(false);
              }}
              className="py-2.5 px-3.5 text-xs text-zinc-400 font-extrabold hover:text-white bg-[#0F1014] border border-white/[0.015] hover:border-white/5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <User size={13} className="text-zinc-500" />
              <span>Importar de Aluno...</span>
              <ChevronDown size={11} className="text-zinc-500" />
            </button>
 
            {showStudentMenu && (
              <div className="absolute left-0 top-11.5 w-[230px] bg-[#0F1014] border border-white/[0.015] rounded-xl shadow-2xl p-1.5 z-50 max-h-[200px] overflow-y-auto no-scrollbar animate-fade">
                <p className="text-[9px] text-zinc-500 font-mono tracking-wider p-2.5 uppercase select-none">Copiar estrutura de:</p>
                {students.map((st) => (
                  <button
                    key={st.username}
                    type="button"
                    onClick={() => {
                      if (onCloneFromOtherStudent) onCloneFromOtherStudent(st.username);
                      setShowStudentMenu(false);
                    }}
                    className="w-full text-left text-xs px-2.5 py-2 rounded-lg hover:bg-[#111318] hover:text-white transition-colors cursor-pointer text-zinc-400 flex items-center gap-2 truncate font-bold"
                  >
                    <User size={11} className="text-zinc-500" />
                    <span>{st.name}</span>
                  </button>
                ))}
                {students.length === 0 && (
                  <p className="text-[11px] text-zinc-600 p-3 text-center">Nenhum aluno cadastrado</p>
                )}
              </div>
            )}
          </div>
 
          {/* Trash and clean list triggers */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Deseja realmente esvaziar todos os exercícios deste treino? Encomendas associadas serão limpas.") && onClearWorkoutRoutine) {
                onClearWorkoutRoutine();
              }
            }}
            className="py-2.5 px-4 text-xs text-red-400/80 hover:text-red-400 hover:bg-red-500/5 bg-[#0F1014] border border-white/[0.015] hover:border-red-500/10 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ml-auto font-black uppercase tracking-wider"
            title="Esvaziar planilha de treino"
          >
            <Trash2 size={12} className="text-red-400" />
            <span>Limpar Treino</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN ACTIVE EXERCISE EDITABLE DIRECTLY FLOW (LISTA DE EXERCÍCIOS COMEÇA IMEDIATAMENTE AQUI) */}
      <div className="flex-grow lg:overflow-y-auto lg:overscroll-contain lg:pr-1 lg:no-scrollbar mt-4 text-zinc-350 flex flex-col justify-between overflow-visible h-auto lg:h-full">
        <div className="space-y-4">
          <div className="divide-y divide-white/[0.015] space-y-3 pb-6">
            {exercises.map((ex, idx) => {
              const indexStr = String(idx + 1).padStart(2, '0');
              const hasIntensity = ex.dropSet || ex.restPause || ex.biSet || ex.cluster || ex.isometria || ex.falha;

              return (
                <div 
                  key={ex.id}
                  onClick={() => setExpandedExerciseId(ex.id)}
                  className="flex items-center justify-between py-6 px-6 sm:py-7 sm:px-8 hover:bg-[#171A20]/20 border border-white/[0.015] hover:border-white/[0.035] cursor-pointer rounded-2xl group transition-all duration-150 shadow bg-[#0F1014]/40"
                >
                  <div className="flex items-center gap-6 min-w-0 pr-4">
                    <span className="text-base sm:text-lg font-mono text-zinc-650 font-black w-8 shrink-0 block select-none">
                      {indexStr}
                    </span>

                    <div className="min-w-0">
                      <span className="text-[17px] sm:text-[19px] md:text-xl font-extrabold text-white tracking-tight leading-snug block group-hover:text-white transition-colors">
                        {ex.name}
                      </span>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm font-bold text-zinc-400 tracking-wide font-sans">
                        <span className="text-white font-extrabold">
                          {ex.sets}x{ex.reps}
                        </span>
                        <span className="text-[#171A20] select-none font-normal">•</span>
                        <span>
                          {ex.rest}s descanso
                        </span>
                        {parseFloat(ex.notes || '') > 0 && (
                          <>
                            <span className="text-[#171A20] select-none font-normal">•</span>
                            <span className="text-zinc-300 font-mono font-black bg-[#171A20] px-3 py-1 rounded-lg border border-white/5 text-[12px] sm:text-xs">
                              {ex.notes} kg
                            </span>
                          </>
                        )}
                        
                        {hasIntensity && (
                          <>
                            <span className="text-[#171A20] select-none font-normal">•</span>
                            <span className="text-[11px] font-black tracking-widest text-[#00D2FF] bg-[#00D2FF]/5 border border-[#00D2FF]/10 px-3 py-1 rounded-xl uppercase select-none">
                              {[
                                ex.dropSet && 'Drop',
                                ex.restPause && 'R-Pause',
                                ex.biSet && 'Bi-set',
                                ex.cluster && 'Cluster',
                                ex.isometria && 'Isom',
                                ex.falha && 'Falha'
                              ].filter(Boolean).join(' • ')}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setExpandedExerciseId(ex.id)}
                      className="p-3 text-zinc-500 hover:text-white hover:bg-[#171A20] border border-transparent hover:border-white/5 rounded-xl transition-all cursor-pointer"
                      title="Configurações e Tags"
                    >
                      <Sliders size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveExercise(ex.id)}
                      className="p-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-xl transition-all cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {exercises.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-white/[0.015] rounded-2xl px-6 mt-2 bg-[#0F1014]/30">
              <AlertCircle className="text-zinc-650 mb-3" size={28} />
              <p className="text-zinc-200 font-bold text-sm tracking-tight">O seu treino está limpo e confortável</p>
              <p className="text-zinc-500 text-xs mt-1.5 max-w-sm leading-relaxed">
                Use a barra de pesquisa da Biblioteca à esquerda para incluir movimentos em tempo real, ou selecione blocos na aba "Blocos Prontos" para carregar planilhas inteiras em um clique.
              </p>
            </div>
          )}
        </div>

        {/* 3. SOLID BOTTOM WORKSPACE ADDER BUTTON */}
        <div className="pt-6 shrink-0 pb-2">
          <button
            type="button"
            onClick={onAddCustomExercise}
            className="w-full py-4.5 bg-[#0F1014] hover:bg-zinc-100 hover:text-[#09090B] text-zinc-350 hover:border-transparent border border-white/[0.015] rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 outline-none"
          >
            <Plus size={14} />
            <span>Inserir movimento personalizado</span>
          </button>
        </div>
      </div>

      {/* FLOATING INSPECTOR SIDE PANEL (drawer on desktop, native bottom sheet on mobile) */}
      <AnimatePresence>
        {expandedExerciseId && activeExercise && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedExerciseId(null)}
              className="fixed inset-0 bg-black/70 z-[110] backdrop-blur-[1px]"
            />

            {/* Main Slide Panel Drawer config */}
            <motion.div
              initial={{ x: '100%', y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-zinc-900 z-[120] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto no-scrollbar"
            >
              <div>
                {/* Header of Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">
                      Ajustes Especiais
                    </span>
                    <h3 className="text-sm font-bold text-zinc-100 tracking-tight leading-tight mt-0.5">
                      {activeExercise.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedExerciseId(null)}
                    className="p-1 px-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Grid Inputs panel */}
                <div className="grid grid-cols-2 gap-3.5 mt-5">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Séries</label>
                    <div className="flex items-center bg-zinc-900 border border-zinc-900/80 rounded-lg overflow-hidden focus-within:border-zinc-800 transition-colors">
                      <input 
                        type="number"
                        min="1"
                        value={activeExercise.sets}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'sets', parseInt(e.target.value) || 1)}
                        className="w-full bg-transparent text-zinc-200 text-xs focus:outline-none p-2.5 text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Repetições</label>
                    <div className="flex items-center bg-zinc-900 border border-zinc-900/80 rounded-lg overflow-hidden focus-within:border-zinc-800 transition-colors">
                      <input 
                        type="text"
                        value={activeExercise.reps}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'reps', e.target.value)}
                        className="w-full bg-transparent text-zinc-200 text-xs focus:outline-none p-2.5 text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Descanso (s)</label>
                    <div className="flex items-center bg-zinc-900 border border-zinc-900/80 rounded-lg overflow-hidden focus-within:border-zinc-800 transition-colors">
                      <input 
                        type="number"
                        step="5"
                        min="0"
                        value={activeExercise.rest}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'rest', parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent text-zinc-200 text-xs focus:outline-none p-2.5 text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Carga (kg)</label>
                    <div className="flex items-center bg-zinc-900 border border-zinc-900/80 rounded-lg overflow-hidden focus-within:border-zinc-800 transition-colors">
                      <input 
                        type="text"
                        value={activeExercise.notes || '0'}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'notes', e.target.value)}
                        className="w-full bg-transparent text-zinc-200 text-xs focus:outline-none p-2.5 text-center font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* INTENSITY TAGS TRIGGER SYSTEM */}
                <div className="mt-8">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-3.5">
                    Metodologias de Intensidade
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {intensityTags.map((tag) => {
                      const isActive = !!(activeExercise[tag.field]);
                      return (
                        <button
                          key={tag.field}
                          type="button"
                          onClick={() => onUpdateExerciseField(activeExercise.id, tag.field, !isActive)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-semibold tracking-tight border transition-all duration-150 cursor-pointer flex items-center justify-between text-left ${
                            isActive
                              ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 font-bold'
                              : 'bg-zinc-900/50 border-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-zinc-350'
                          }`}
                        >
                          <span>{tag.label}</span>
                          {isActive && <Check size={11} className="text-blue-400" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-zinc-650 mt-3.5 leading-relaxed">
                    Sinalize metodologias avançadas para destaque visual instantâneo na planilha do aluno. O sistema sincroniza de forma transparente.
                  </p>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-6 border-t border-zinc-900 space-y-2 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    onRemoveExercise(activeExercise.id);
                    setExpandedExerciseId(null);
                  }}
                  className="w-full py-2.5 hover:bg-red-500/5 text-red-405 border border-dashed border-red-950/40 hover:border-red-900/60 transition-colors text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={12} />
                  <span>Excluir Exercício deste Treino</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedExerciseId(null)}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Pronto
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

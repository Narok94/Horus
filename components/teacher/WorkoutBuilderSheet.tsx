import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Check, Trash2, Sliders, ArrowUp, ArrowDown } from 'lucide-react';
import { WorkoutRoutine, Exercise } from '../../types';
import { getHorusGifUrl } from '../../src/utils/exerciseUtils';

const MOBILE_STATIC_EXERCISES = [
  { name: 'Supino Reto', muscleGroup: 'Peito' },
  { name: 'Supino Inclinado', muscleGroup: 'Peito' },
  { name: 'Supino Declinado', muscleGroup: 'Peito' },
  { name: 'Crucifixo', muscleGroup: 'Peito' },
  { name: 'Cross Cable', muscleGroup: 'Peito' },
  { name: 'Remada Curvada', muscleGroup: 'Costas' },
  { name: 'Puxada Frontal', muscleGroup: 'Costas' },
  { name: 'Remada Unilateral', muscleGroup: 'Costas' },
  { name: 'Agachamento', muscleGroup: 'Pernas' },
  { name: 'Leg Press', muscleGroup: 'Pernas' },
  { name: 'Cadeira Extensora', muscleGroup: 'Pernas' },
  { name: 'Cadeira Flexora', muscleGroup: 'Pernas' },
  { name: 'Stiff', muscleGroup: 'Pernas' },
  { name: 'Glúteo no Cross', muscleGroup: 'Pernas' },
  { name: 'Hip Thrust', muscleGroup: 'Pernas' },
  { name: 'Panturrilha', muscleGroup: 'Pernas' },
  { name: 'Desenvolvimento', muscleGroup: 'Ombros' },
  { name: 'Elevação Lateral', muscleGroup: 'Ombros' },
  { name: 'Rosca Direta', muscleGroup: 'Bíceps' },
  { name: 'Rosca Martelo', muscleGroup: 'Bíceps' },
  { name: 'Tríceps Corda', muscleGroup: 'Tríceps' },
  { name: 'Tríceps Testa', muscleGroup: 'Tríceps' },
  { name: 'Abdômen Crunch', muscleGroup: 'Outros' },
  { name: 'Prancha', muscleGroup: 'Outros' }
];

interface WorkoutBuilderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentUsername: string;
  division: 'AB' | 'ABC' | 'ABCD' | 'ABCDE';
  setDivision: (div: 'AB' | 'ABC' | 'ABCD' | 'ABCDE') => void;
  routines: WorkoutRoutine[];
  onUpdateRoutines: (updatedRoutines: WorkoutRoutine[]) => void;
  onSave: () => void;
}

export const WorkoutBuilderSheet: React.FC<WorkoutBuilderSheetProps> = ({
  isOpen,
  onClose,
  studentName,
  studentUsername,
  division,
  setDivision,
  routines,
  onUpdateRoutines,
  onSave
}) => {
  // Mobile Top Tab choice: "library" | "sheet"
  const [mobileTab, setMobileTab] = useState<'library' | 'sheet'>('library');

  // Slots Tab Index tracker (A=0, B=1, C=2...)
  const [activeSlotIdx, setActiveSlotIdx] = useState<number>(0);

  // Library Category and Search tracker inside bottom sheet
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('Todos');
  const [addedFlash, setAddedFlash] = useState<string | null>(null);

  // Collapsed exercises items for sliders configuring
  const [configuredExId, setConfiguredExId] = useState<string | null>(null);

  const slotLimit = (): number => {
    switch (division) {
      case 'AB': return 2;
      case 'ABC': return 3;
      case 'ABCD': return 4;
      case 'ABCDE': return 5;
      default: return 3;
    }
  };

  const limitCount = slotLimit();
  const currentSlotRoutine = routines[activeSlotIdx] || {
    id: `routine_${activeSlotIdx}`,
    title: `Treino ${String.fromCharCode(65 + activeSlotIdx)}`,
    description: '',
    exercises: [],
    color: 'blue'
  };

  const exercises = currentSlotRoutine.exercises || [];

  // Filter exercises in real time inside Bottom Sheet library
  const filtered = MOBILE_STATIC_EXERCISES.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    if (selectedMuscle === 'Todos') return matchesSearch;
    return matchesSearch && ex.muscleGroup === selectedMuscle;
  });

  // Adding item to active slot
  const handleAddExercise = (name: string, muscleGroup: string) => {
    const newEx: Exercise = {
      id: `ex_${Math.random().toString(36).substring(2, 9)}`,
      name,
      muscleGroup,
      sets: 3,
      reps: '12',
      rest: 60,
      notes: '10',
      image: getHorusGifUrl(name)
    };

    const updatedRoutines = routines.map((r, rIdx) => {
      if (rIdx === activeSlotIdx) {
        return {
          ...r,
          exercises: [...(r.exercises || []), newEx]
        };
      }
      return r;
    });

    onUpdateRoutines(updatedRoutines);
    setAddedFlash(name);
    setTimeout(() => setAddedFlash(null), 850);
  };

  // Modify individual parameters inline on mobile
  const handleUpdateExField = (id: string, updates: Partial<Exercise>) => {
    const updated = routines.map((r, rIdx) => {
      if (rIdx === activeSlotIdx) {
        return {
          ...r,
          exercises: r.exercises.map((ex) => {
            if (ex.id === id) {
              return { ...ex, ...updates };
            }
            return ex;
          })
        };
      }
      return r;
    });
    onUpdateRoutines(updated);
  };

  // Remove exercises from index slot
  const handleRemoveEx = (id: string) => {
    const updated = routines.map((r, rIdx) => {
      if (rIdx === activeSlotIdx) {
        return {
          ...r,
          exercises: r.exercises.filter((ex) => ex.id !== id)
        };
      }
      return r;
    });
    onUpdateRoutines(updated);
  };

  // Handle Enter key for custom items on mobile
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault();
      // Muscle guesser
      const lower = search.toLowerCase();
      let estGroup = 'Livre';
      if (lower.includes('supino') || lower.includes('peito')) estGroup = 'Peito';
      else if (lower.includes('costas') || lower.includes('puxada')) estGroup = 'Costas';
      else if (lower.includes('perna') || lower.includes('agachamento')) estGroup = 'Pernas';
      else if (lower.includes('ombro') || lower.includes('elevação')) estGroup = 'Ombros';
      else if (lower.includes('biceps') || lower.includes('rosca')) estGroup = 'Bíceps';
      else if (lower.includes('triceps') || lower.includes('corda')) estGroup = 'Tríceps';

      handleAddExercise(search.trim(), estGroup);
      setSearch('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="builder-sheet-wrapper" className="fixed inset-0 flex items-end justify-center z-50 p-0 font-sans select-none pointer-events-none md:hidden">
          
          {/* Backdrop screen overlay */}
          <motion.div
            id="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black pointer-events-auto"
          />

          {/* Core Bottom Sheet Sliding component */}
          <motion.div
            id="mobile-bottom-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-[#F8F9FA] w-full rounded-t-3xl shadow-2xl z-50 flex flex-col h-[90dvh] overflow-hidden pointer-events-auto"
          >
            {/* Top gray handlebar decoration */}
            <div id="drag-bar" className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3 shrink-0" />

            {/* Back Close X button */}
            <button
              id="close-bottom-sheet-btn"
              type="button"
              onClick={onClose}
              className="absolute top-3 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={16} />
            </button>

            {/* HEADER METRICS INFO */}
            <div className="px-5 pb-3 pt-1 border-b border-gray-100 shrink-0 bg-white">
              <span className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider block">Ficha do Aluno</span>
              <h2 className="text-sm font-black text-gray-900 mt-0.5">{studentName}</h2>
            </div>

            {/* MOBILE TOP NAVIGATION SWITCH TABS */}
            <div id="mobile-tabs-switch" className="flex border-b border-gray-150 shrink-0 bg-white select-none">
              <button
                type="button"
                onClick={() => setMobileTab('library')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider relative flex items-center justify-center gap-1.5 transition-colors ${
                  mobileTab === 'library' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <span>📚 Biblioteca</span>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black rounded-full px-2 py-0.5 border border-blue-100">
                  {exercises.length}
                </span>
                {mobileTab === 'library' && (
                  <motion.div layoutId="m-active-indicator" className="absolute bottom-0 inset-x-6 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileTab('sheet')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider relative flex items-center justify-center gap-1.5 transition-colors ${
                  mobileTab === 'sheet' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <span>📋 Ficha</span>
                {mobileTab === 'sheet' && (
                  <motion.div layoutId="m-active-indicator" className="absolute bottom-0 inset-x-6 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            {/* DYNAMIC VIEWPORTS MAIN AREA */}
            <div className="flex-grow overflow-y-auto no-scrollbar">
              
              {/* TAB 1: LIBRARY CATEGORY SEARCH */}
              {mobileTab === 'library' && (
                <div id="mobile-lib-section" className="flex flex-col h-full bg-[#F1F5F9] p-4">
                  {/* Search box row */}
                  <div className="relative mb-3.5 shrink-0">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search size={15} />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar exercício... [Enter para add]"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      className="w-full bg-white border border-gray-200 text-xs py-3 pl-10 pr-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all font-semibold shadow-sm"
                    />
                  </div>

                  {/* Horizontal Category Pill scrollbar */}
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-3 select-none">
                    {['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Bíceps', 'Tríceps'].map((cat) => {
                      const sel = selectedMuscle === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedMuscle(cat)}
                          className={`px-3 py-1.8 text-[11px] font-black rounded-full shrink-0 transition-colors border ${
                            sel ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white border-gray-250 text-gray-600'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  {/* Exercise clickable rows */}
                  <div className="space-y-2 mt-1 pb-16">
                    {filtered.map((item) => {
                      const isAdded = addedFlash === item.name;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => handleAddExercise(item.name, item.muscleGroup)}
                          className="w-full text-left bg-white border border-gray-200 active:border-blue-300 rounded-xl p-3.5 flex items-center justify-between shadow-sm transition-all"
                        >
                          <div>
                            <span className="text-xs font-bold text-gray-950 block">{item.name}</span>
                            <span className="text-[10px] text-gray-400 font-extrabold uppercase mt-0.5 block tracking-wider">{item.muscleGroup}</span>
                          </div>
                          <div className="shrink-0">
                            {isAdded ? (
                              <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded">✓ Adicionado</span>
                            ) : (
                              <span className="bg-blue-50 text-blue-600 border border-blue-105 text-[10px] font-black uppercase px-2 py-1 rounded">+ Incluir</span>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {filtered.length === 0 && search.trim() && (
                      <button
                        type="button"
                        onClick={() => {
                          handleAddExercise(search.trim(), 'Customizado');
                          setSearch('');
                        }}
                        className="w-full text-left bg-blue-50 border border-dashed border-blue-200 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-black text-blue-700 block">Adicionar personalizado</span>
                          <span className="text-sm font-extrabold text-blue-900 mt-0.5 block">"{search}"</span>
                        </div>
                        <span className="bg-blue-600 text-white text-[10px] rounded px-2.5 py-1 font-black">NEW</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ACTIVE SLOT LIST EDITOR */}
              {mobileTab === 'sheet' && (
                <div id="mobile-sheet-section" className="flex flex-col h-full p-4 space-y-4">
                  {/* Slots switches tabs (A | B | C...) */}
                  <div className="flex gap-1 overflow-x-auto shrink-0 select-none pb-1 no-scrollbar-all border-b border-gray-150">
                    {Array.from({ length: limitCount }).map((_, idx) => {
                      const tabChar = String.fromCharCode(65 + idx);
                      const isSel = idx === activeSlotIdx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveSlotIdx(idx);
                            setConfiguredExId(null);
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-black transition-colors border ${
                            isSel ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow' : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          Slot {tabChar}
                        </button>
                      );
                    })}
                  </div>

                  {/* Heading slot input focus text */}
                  <div className="space-y-1.5 shrink-0">
                    <span className="text-[10px] font-black text-gray-400 block uppercase tracking-wider">Foco/Grupamento do Treino:</span>
                    <input
                      type="text"
                      placeholder="Foco de Treinamento"
                      value={currentSlotRoutine.title || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const upd = routines.map((r, rIdx) => {
                          if (rIdx === activeSlotIdx) {
                            return { ...r, title: val };
                          }
                          return r;
                        });
                        onUpdateRoutines(upd);
                      }}
                      className="w-full bg-white border border-gray-250 font-bold text-xs text-gray-900 px-3 py-2.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* Exercises inside active mobile index cards */}
                  <div className="space-y-2.5 pb-20 mt-1">
                    <span className="text-[10px] font-black text-gray-400 block uppercase tracking-wide">Exercícios Incluídos ({exercises.length}):</span>
                    
                    {exercises.length === 0 ? (
                      <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl p-4">
                        <span className="text-gray-400 text-xs font-bold block">Ficha sem movimentos incluídos</span>
                        <button
                          type="button"
                          onClick={() => setMobileTab('library')}
                          className="mt-4 bg-blue-50 text-blue-600 text-[10px] tracking-wider uppercase font-black border border-blue-105 px-4 py-2 rounded-lg"
                        >
                          Ir para Biblioteca
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {exercises.map((ex, idx) => {
                          const openSet = configuredExId === ex.id;
                          return (
                            <div key={ex.id} className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col gap-2 shadow-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-900 truncate max-w-[200px] block">{idx + 1}. {ex.name}</span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setConfiguredExId(openSet ? null : ex.id)}
                                    className={`p-1.5 rounded-lg border ${openSet ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent text-gray-400 border-transparent'}`}
                                  >
                                    <Sliders size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveEx(ex.id)}
                                    className="p-1.5 rounded-lg text-red-500 active:bg-red-50"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>

                              {/* Static display values or dynamic editable sliders row */}
                              {openSet ? (
                                <div className="bg-gray-50 rounded-xl p-2.5 mt-1 space-y-3">
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Séries</span>
                                      <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={ex.sets}
                                        onChange={(e) => handleUpdateExField(ex.id, { sets: Math.max(1, parseInt(e.target.value) || 3) })}
                                        className="w-full bg-white border border-gray-200 text-center rounded-lg py-1 text-xs font-bold"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Reps</span>
                                      <input
                                        type="text"
                                        value={ex.reps}
                                        onChange={(e) => handleUpdateExField(ex.id, { reps: e.target.value })}
                                        className="w-full bg-white border border-gray-200 text-center rounded-lg py-1 text-xs font-bold"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Rest (s)</span>
                                      <input
                                        type="number"
                                        min="0"
                                        value={ex.rest}
                                        onChange={(e) => handleUpdateExField(ex.id, { rest: Math.max(0, parseInt(e.target.value) || 60) })}
                                        className="w-full bg-white border border-gray-200 text-center rounded-lg py-1 text-xs font-bold"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1 border-t border-gray-150 pt-2 grid grid-cols-3 gap-1">
                                    {[
                                      { label: 'DropSet', field: 'dropSet' as keyof Exercise },
                                      { label: 'Bi-Set', field: 'biSet' as keyof Exercise },
                                      { label: 'Falha', field: 'falha' as keyof Exercise }
                                    ].map((t) => {
                                      const isCh = !!ex[t.field];
                                      return (
                                        <button
                                          key={t.label}
                                          type="button"
                                          onClick={() => handleUpdateExField(ex.id, { [t.field]: !isCh })}
                                          className={`py-1 rounded text-[9px] font-black text-center uppercase border transition-colors ${
                                            isCh ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 text-gray-500'
                                          }`}
                                        >
                                          {t.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 mt-0.5 select-none">
                                  <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase px-2 py-0.5 rounded italic">
                                    {ex.sets} X {ex.reps}
                                  </span>
                                  <span className="text-[10px] text-gray-400 font-extrabold">{ex.rest}s descanso</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* FIXED GREEN SAVE TRIGGER FOOTER IN EMERALD GREEN */}
            <div id="mobile-sheet-footer" className="p-4 border-t border-gray-150 shrink-0 bg-white">
              <button
                id="mobile-btn-salvar-ficha"
                type="button"
                onClick={onSave}
                className="w-full h-14 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>SALVAR FICHA</span>
                <span>✓</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

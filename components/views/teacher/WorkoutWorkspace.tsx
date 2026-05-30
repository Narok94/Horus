import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, Sliders, Play, Plus, Copy, RefreshCw, X, Check, Eye, ChevronDown, User, AlertCircle, ArrowUp, ArrowDown, Search
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
  onReorderExercises?: (exercises: Exercise[]) => void;
  
  // Extra props for unified mobile creation workspace
  filteredSuggestions?: BaseExercise[];
  searchExerciseQuery?: string;
  setSearchExerciseQuery?: (query: string) => void;
  selectedMuscleFilter?: string;
  setSelectedMuscleFilter?: (muscle: string) => void;
  onAddExercise?: (baseEx: BaseExercise) => void;
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
  onReorderExercises,
  
  filteredSuggestions = [],
  searchExerciseQuery = '',
  setSearchExerciseQuery = () => {},
  selectedMuscleFilter = 'Todos',
  setSelectedMuscleFilter = () => {},
  onAddExercise = () => {},
}) => {
  const activeRoutine = localRoutines[activeRoutineIdx];
  const exercises = activeRoutine?.exercises || [];
  
  const [showDuplicateMenu, setShowDuplicateMenu] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);

  const activeExercise = exercises.find(ex => ex.id === expandedExerciseId);

  const intensityTags = [
    { label: 'Drop Set', field: 'dropSet' as keyof Exercise },
    { label: "Rest 'n' Pause", field: 'restPause' as keyof Exercise },
    { label: 'Bi-set', field: 'biSet' as keyof Exercise },
    { label: 'Cluster', field: 'cluster' as keyof Exercise },
    { label: 'Isometria', field: 'isometria' as keyof Exercise },
    { label: 'Falha', field: 'falha' as keyof Exercise }
  ];

  const totalSets = exercises.reduce((acc, curr) => acc + (curr.sets || 0), 0);
  const totalVolumeEst = exercises.reduce((acc, curr) => {
    const weight = parseFloat(String(curr.notes || '0').replace(/[^0-9.]/g, '')) || 0;
    const reps = parseInt(String(curr.reps || '10').replace(/[^0-9]/g, '')) || 10;
    return acc + (curr.sets || 0) * reps * (weight || 1);
  }, 0);

  // Manual sorting handlers
  const handleMove = (idx: number, direction: 'up' | 'down') => {
    if (!onReorderExercises) return;
    const list = [...exercises];
    if (direction === 'up' && idx > 0) {
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
    } else if (direction === 'down' && idx < list.length - 1) {
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
    }
    onReorderExercises(list);
  };

  return (
    <div className="flex flex-col min-h-0 bg-[#F5F7FA] p-4 sm:p-6 lg:p-8 overflow-y-auto no-scrollbar h-full w-full">
      
      {/* 1. SIMPLE & CLEAN HEADER (CABEÇALHO) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">
              Slot {String.fromCharCode(65 + activeRoutineIdx)}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              <span className="bg-blue-50 text-blue-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-blue-105">
                {exercises.length} Movimentos
              </span>
              <span className="bg-gray-100 text-gray-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-gray-200">
                {totalSets} Séries
              </span>
              {totalVolumeEst > 0 && (
                <span className="bg-green-50 text-green-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-green-105">
                  Vol. Est: {totalVolumeEst} kg
                </span>
              )}
            </div>
          </div>

          {/* Large touch targets Slot Navigation */}
          <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl select-none shrink-0 self-start sm:self-center">
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
                  className={`py-2 px-4 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  style={{ minWidth: '44px', minHeight: '40px' }}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>

        {/* Training Sheet Title / Focus Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 select-none">
            Foco de Treinamento / Grupamento Muscular
          </label>
          <input 
            type="text"
            value={activeRoutine?.title || ''}
            onChange={(e) => onUpdateRoutineTitle(e.target.value)}
            placeholder="Ex: Peito e Tríceps (Foco Peitoral Superior)"
            className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white py-3 px-4 rounded-xl text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Toolbar of Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 relative select-none">
          {/* Duplicate Menu Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowDuplicateMenu(!showDuplicateMenu);
                setShowStudentMenu(false);
              }}
              className="py-2.5 px-4 text-xs text-gray-600 font-extrabold hover:text-gray-900 bg-gray-50 border border-gray-200 hover:bg-white rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
              style={{ minHeight: '44px' }}
            >
              <Copy size={13} className="text-gray-400" />
              <span>Clonar Treino</span>
              <ChevronDown size={11} className="text-gray-400" />
            </button>
 
            {showDuplicateMenu && (
              <div className="absolute left-0 top-12 w-[210px] bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-50 animate-fade">
                <p className="text-[9px] text-gray-400 font-bold tracking-wider p-2.5 uppercase select-none">Clonar de outro Slot:</p>
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
                      className="w-full text-left text-xs px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-700 flex items-center gap-2 font-bold"
                    >
                      <Copy size={11} className="text-gray-400" />
                      <span>Clonar do Treino {char}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
 
          {/* Import Student Workout Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStudentMenu(!showStudentMenu);
                setShowDuplicateMenu(false);
              }}
              className="py-2.5 px-4 text-xs text-gray-600 font-extrabold hover:text-gray-900 bg-gray-50 border border-gray-200 hover:bg-white rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
              style={{ minHeight: '44px' }}
            >
              <User size={13} className="text-gray-400" />
              <span>Importar de Aluno...</span>
              <ChevronDown size={11} className="text-gray-400" />
            </button>
 
            {showStudentMenu && (
              <div className="absolute left-0 top-12 w-[240px] bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-50 max-h-[220px] overflow-y-auto no-scrollbar animate-fade">
                <p className="text-[9px] text-gray-400 font-bold tracking-wider p-2.5 uppercase select-none">Importar estrutura de:</p>
                {students.map((st) => (
                  <button
                    key={st.username}
                    type="button"
                    onClick={() => {
                      if (onCloneFromOtherStudent) onCloneFromOtherStudent(st.username);
                      setShowStudentMenu(false);
                    }}
                    className="w-full text-left text-xs px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-700 flex items-center gap-2 truncate font-bold"
                  >
                    <User size={11} className="text-gray-400" />
                    <span>{st.name}</span>
                  </button>
                ))}
                {students.length === 0 && (
                  <p className="text-xs text-gray-400 p-3 text-center">Nenhum aluno cadastrado</p>
                )}
              </div>
            )}
          </div>
 
          {/* Clear sheet trigger */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Deseja realmente esvaziar todos os exercícios deste treino?") && onClearWorkoutRoutine) {
                onClearWorkoutRoutine();
              }
            }}
            className="py-2.5 px-4 text-xs text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-100 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ml-auto font-black uppercase tracking-wider"
            style={{ minHeight: '44px' }}
          >
            <Trash2 size={12} />
            <span>Limpar Treino</span>
          </button>
        </div>
      </div>

      {/* 2. PROTAGONIST SEARCH IN WORKSPACE ON MOBILE (Foco total no mobile) */}
      <div className="block lg:hidden bg-white border border-gray-200 rounded-2xl p-5 mb-5 shadow-sm space-y-4">
        <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 select-none">
          🔍 Adicionar exercício rapidamente
        </label>
        
        {/* Large 52px input for physical accessibility */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Buscar exercício na biblioteca..."
            value={searchExerciseQuery}
            onChange={(e) => setSearchExerciseQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm py-4 pl-11 pr-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold shadow-inner"
            style={{ minHeight: '52px' }}
          />
        </div>

        {/* Filter Scroll Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 select-none">
          {['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços'].map(muscle => {
            const isSelected = selectedMuscleFilter === muscle;
            return (
              <button
                key={muscle}
                type="button"
                onClick={() => setSelectedMuscleFilter(muscle)}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-sm font-extrabold' 
                    : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                style={{ minHeight: '38px' }}
              >
                {muscle}
              </button>
            );
          })}
        </div>

        {/* Search Results Display embedded right inside column on query */}
        {searchExerciseQuery.trim() !== '' && (
          <div className="border border-blue-100 bg-blue-50/20 rounded-xl p-2.5 space-y-1 max-h-[220px] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center px-1 mb-1 border-b border-blue-50 pb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500">Resultados da Busca</span>
              <button 
                type="button" 
                onClick={() => setSearchExerciseQuery('')} 
                className="text-[9px] font-bold text-gray-400 hover:text-gray-600"
              >
                Limpar
              </button>
            </div>
            {filteredSuggestions.map((baseEx, bIdx) => (
              <div
                key={bIdx}
                onClick={() => {
                  onAddExercise(baseEx);
                  setSearchExerciseQuery(''); // clean context
                }}
                className="flex items-center justify-between p-2.5 bg-white border border-gray-150 rounded-lg hover:border-blue-300 transition-all cursor-pointer shadow-sm active:scale-98"
                style={{ minHeight: '44px' }}
              >
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{baseEx.name}</span>
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wide mt-0.5 block">{baseEx.muscleGroup}</span>
                </div>
                <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  + Add
                </span>
              </div>
            ))}
            {filteredSuggestions.length === 0 && (
              <p className="text-[11px] text-gray-400 text-center py-4">Nenhum resultado encontrado</p>
            )}
          </div>
        )}
      </div>

      {/* 3. CURRENT EXERCISES LIST DESIGN (Treino Sendo Montado) */}
      <div className="flex-grow space-y-4">
        <h3 className="text-xs uppercase font-black tracking-widest text-gray-400 select-none px-1">
          Exercícios na Ficha ({exercises.length})
        </h3>
        
        <div className="space-y-3 pb-8">
          {exercises.map((ex, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            const hasIntensity = ex.dropSet || ex.restPause || ex.biSet || ex.cluster || ex.isometria || ex.falha;

            return (
              <div 
                key={ex.id}
                onClick={() => setExpandedExerciseId(ex.id)}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 hover:border-blue-300 rounded-2xl cursor-pointer transition-all duration-150 shadow-sm active:bg-gray-50"
              >
                {/* Index & Name block */}
                <div className="flex items-center gap-4 min-w-0 pr-2">
                  <span className="text-sm font-mono text-gray-400 font-black w-6 text-center shrink-0 block select-none">
                    {indexStr}
                  </span>

                  <div className="min-w-0">
                    <span className="text-base font-black text-gray-900 leading-tight block truncate">
                      {ex.name}
                    </span>
                    
                    {/* Badge parameters bar */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-xs font-bold text-gray-500 tracking-wide">
                      <span className="text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded-md">
                        {ex.sets}x{ex.reps}
                      </span>
                      <span className="text-gray-300 font-normal shrink-0 select-none">•</span>
                      <span>
                        {ex.rest}s descanso
                      </span>
                      {parseFloat(ex.notes || '') > 0 && (
                        <>
                          <span className="text-gray-300 font-normal shrink-0 select-none">•</span>
                          <span className="text-gray-700 font-mono font-black bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                            {ex.notes} kg
                          </span>
                        </>
                      )}
                      
                      {hasIntensity && (
                        <>
                          <span className="text-gray-300 font-normal shrink-0 select-none">•</span>
                          <span className="text-[10px] font-black tracking-wider text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md uppercase">
                            {[
                              ex.dropSet && 'Drop',
                              ex.restPause && 'Pause',
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

                {/* Control Action Tools */}
                <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                  {onReorderExercises && (
                    <div className="flex flex-col gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className={`p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-25 transition-all cursor-pointer`}
                        style={{ minWidth: '32px', minHeight: '32px' }}
                        title="Mover para cima"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === exercises.length - 1}
                        className={`p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-25 transition-all cursor-pointer`}
                        style={{ minWidth: '32px', minHeight: '32px' }}
                        title="Mover para baixo"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedExerciseId(ex.id)}
                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                    style={{ minHeight: '44px', minWidth: '44px' }}
                    title="Editar Configuração"
                  >
                    <Sliders size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveExercise(ex.id)}
                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    style={{ minHeight: '44px', minWidth: '44px' }}
                    title="Excluir"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {exercises.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center bg-white border border-gray-200 border-dashed rounded-2xl px-6">
            <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-3">
              <AlertCircle size={22} />
            </div>
            <p className="text-gray-800 font-bold text-sm">Este treino está esvaziado</p>
            <p className="text-gray-400 text-xs mt-1 max-w-sm leading-relaxed">
              Use a barra de pesquisa ou a biblioteca {window.innerWidth >= 1024 ? 'à esquerda' : ''} para buscar de forma rápida e incluir novos movimentos na ficha!
            </p>
          </div>
        )}
      </div>

      {/* 4. INSERT CUSTOM MOVEMENT COMPACT TRIGGER */}
      <div className="pt-4 pb-2 shrink-0">
        <button
          type="button"
          onClick={onAddCustomExercise}
          className="w-full py-4 bg-white border border-gray-250 hover:bg-gray-50 text-gray-700 hover:border-blue-300 rounded-xl text-xs font-black tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-2 outline-none shadow-sm"
          style={{ minHeight: '52px' }}
        >
          <Plus size={14} className="text-blue-500" />
          <span>Movimento Personalizado</span>
        </button>
      </div>

      {/* FLOATING NATIVE-FEEL BOTTOM SHEET DRAWER (Sliding Panel for editing) */}
      <AnimatePresence>
        {expandedExerciseId && activeExercise && (
          <>
            {/* Soft dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedExerciseId(null)}
              className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-[1px]"
            />

            {/* Smart dynamic slide drawer: slide-up on mobile, slide-right on big screens */}
            <motion.div
              initial={typeof window !== 'undefined' && window.innerWidth < 1024 ? { y: '100%', x: 0 } : { x: '100%', y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={typeof window !== 'undefined' && window.innerWidth < 1024 ? { y: '100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed bottom-0 lg:top-0 right-0 h-[80vh] lg:h-full w-full lg:w-[420px] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 z-[120] shadow-2xl p-6 flex flex-col justify-between rounded-t-3xl lg:rounded-none overflow-y-auto no-scrollbar"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                      Ajuste de Cargas & Séries
                    </span>
                    <h3 className="text-base font-black text-gray-900 tracking-tight leading-snug mt-1">
                      {activeExercise.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedExerciseId(null)}
                    className="p-1 px-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Main parameter inputs grid */}
                <div className="grid grid-cols-2 gap-3.5 mt-5">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Séries</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                      <input 
                        type="number"
                        min="1"
                        value={activeExercise.sets}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'sets', parseInt(e.target.value) || 1)}
                        className="w-full bg-transparent text-gray-905 text-sm font-bold focus:outline-none p-3 text-center"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Repetições</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                      <input 
                        type="text"
                        value={activeExercise.reps}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'reps', e.target.value)}
                        className="w-full bg-transparent text-gray-905 text-sm font-bold focus:outline-none p-3 text-center"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Descanso (s)</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                      <input 
                        type="number"
                        step="5"
                        min="0"
                        value={activeExercise.rest}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'rest', parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent text-gray-905 text-sm font-bold focus:outline-none p-3 text-center"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Carga (kg)</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                      <input 
                        type="text"
                        value={activeExercise.notes || '0'}
                        onChange={(e) => onUpdateExerciseField(activeExercise.id, 'notes', e.target.value)}
                        className="w-full bg-transparent text-gray-950 text-sm font-bold focus:outline-none p-3 text-center font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced intensity techniques toggle toggles */}
                <div className="mt-6">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-3">
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
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-between text-left ${
                            isActive
                              ? 'bg-blue-55 border-blue-500 text-blue-700'
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-500'
                          }`}
                          style={{ minHeight: '44px' }}
                        >
                          <span>{tag.label}</span>
                          {isActive && <Check size={11} className="text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
                    Sinalize metodologias avançadas para destaque visual instantâneo na planilha do seu aluno. O sistema sincroniza de forma transparente.
                  </p>
                </div>
              </div>

              {/* Bottom sheet actions */}
              <div className="pt-6 border-t border-gray-100 space-y-2.5 lg:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    onRemoveExercise(activeExercise.id);
                    setExpandedExerciseId(null);
                  }}
                  className="w-full py-3 hover:bg-red-50 text-red-600 border border-dashed border-red-200 transition-colors text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  <Trash2 size={13} />
                  <span>Excluir do Treino</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedExerciseId(null)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md shadow-blue-100 active:scale-95"
                  style={{ minHeight: '48px' }}
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

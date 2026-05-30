import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Dumbbell, 
  TrendingUp, 
  UserPlus,
  LogOut,
  Flame,
  ChevronLeft,
  Save
} from 'lucide-react';
import { useStore } from '../../store';
import { User, WorkoutRoutine, Exercise } from '../../types';
import { exerciseDatabase, BaseExercise } from '../../data/exerciseDatabase';

// Sub-components
import { StudentsTab } from './teacher/StudentsTab';
import { EvolutionTab } from './teacher/EvolutionTab';
import { ExerciseLibrary } from './teacher/ExerciseLibrary';
import { WorkoutWorkspace } from './teacher/WorkoutWorkspace';
import { StudentModals } from './teacher/StudentModals';

export const TeacherView: React.FC = () => {
  const { user, allWorkouts, setAllWorkouts, addToast, logout } = useStore();
  
  // Active Tab: 'alunos', 'construtor' or 'evolucao'
  const [activeTab, setActiveTab] = useState<'alunos' | 'construtor' | 'evolucao'>('alunos');
  
  // Selected Student for Workout Constructor or History Views
  const [selectedStudentUsername, setSelectedStudentUsername] = useState<string | null>(null);

  // Division Auto-collapse state
  const [isDivisionSet, setIsDivisionSet] = useState<boolean>(true);

  // Add Student modal trigger
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    username: '',
    name: '',
    password: '12345',
    sex: 'masculino' as 'masculino' | 'feminino',
  });

  // Edit Student modal trigger
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [editStudentData, setEditStudentData] = useState({
    username: '',
    name: '',
    password: '',
    sex: 'masculino' as 'masculino' | 'feminino'
  });

  // Local state directory and sync trigger
  const [trigger, setTrigger] = useState(0);
  const [students, setStudents] = useState<User[]>([]);

  // Selected Division Frequency (AB, ABC, ABCD, ABCDE)
  const [sheetFrequency, setSheetFrequency] = useState<'AB' | 'ABC' | 'ABCD' | 'ABCDE'>('ABC');

  // Local storage workouts during generation
  const [localRoutines, setLocalRoutines] = useState<WorkoutRoutine[]>([]);
  const [activeRoutineIdx, setActiveRoutineIdx] = useState<number>(0);

  // UI state query and accordion selection
  const [searchExerciseQuery, setSearchExerciseQuery] = useState('');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('Todos');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  // Highlight effect helper for recently added exercises to visually verify where it goes
  const [recentAddedId, setRecentAddedId] = useState<string | null>(null);

  // Security Gate for Docente profile 'teste3'
  if (!user || user.username.toLowerCase() !== 'teste3') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 p-6 text-center font-sans">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl max-w-sm shrink-0 shadow-lg">
          <span className="text-red-500 font-extrabold text-xs uppercase tracking-wider block mb-1">Acesso Restrito</span>
          <p className="text-sm leading-relaxed text-gray-500 mb-6">Esta interface administrativa é exclusiva para o Docente Credenciado (Prof. Teste3).</p>
          <button 
            onClick={logout} 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    );
  }

  // Load students data directory from local registry
  useEffect(() => {
    const list: User[] = [];
    const defaults = ['teste', 'teste2'];
    
    defaults.forEach(uname => {
      const saved = localStorage.getItem(`tatugym_user_profile_${uname}`);
      if (saved) {
        try {
          list.push(JSON.parse(saved));
        } catch {
          // ignore cache error
        }
      } else {
        list.push({
          username: uname,
          name: uname === 'teste' ? 'Teste Masculino' : 'Teste Feminino',
          role: 'student',
          sex: uname === 'teste2' ? 'feminino' : 'masculino',
          streak: 0,
          totalWorkouts: 0,
          checkIns: [],
          history: [],
          isProfileComplete: true
        });
      }
    });

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tatugym_user_profile_')) {
        const username = key.replace('tatugym_user_profile_', '');
        if (username !== 'teste' && username !== 'teste2' && username !== 'teste3') {
          try {
            const profileData = JSON.parse(localStorage.getItem(key) || '');
            if (profileData && profileData.role === 'student' && !list.some(s => s.username === username)) {
              list.push(profileData);
            }
          } catch {
            // ignore JSON error
          }
        }
      }
    }

    setStudents(list);
  }, [allWorkouts, trigger]);

  // Sync builder routines whenever active student context is switched
  useEffect(() => {
    if (selectedStudentUsername) {
      const lower = selectedStudentUsername.toLowerCase();
      const existing = allWorkouts[lower] || [];
      
      // Auto deduce sheet division setting
      if (existing.length <= 2) {
        setSheetFrequency('AB');
      } else if (existing.length === 3) {
        setSheetFrequency('ABC');
      } else if (existing.length === 4) {
        setSheetFrequency('ABCD');
      } else {
        setSheetFrequency('ABCDE');
      }

      // Prepopulate slots A-E
      const initialRoutines: WorkoutRoutine[] = Array.from({ length: 5 }).map((_, idx) => {
        const char = String.fromCharCode(65 + idx);
        const matched = existing[idx];
        return matched ? { ...matched } : {
          id: `routine_${char}_${Math.random().toString(36).substring(2, 9)}`,
          title: `Treino ${char}`,
          description: '',
          exercises: [],
          color: 'blue'
        };
      });

      setLocalRoutines(initialRoutines);
      setActiveRoutineIdx(0);
      setIsDivisionSet(true);
    }
  }, [selectedStudentUsername]);

  // Add new student integration
  const handleCreateStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = newStudentData.username.trim().toLowerCase();
    const cleanName = newStudentData.name.trim();

    if (!cleanUser || !cleanName) {
      if (addToast) addToast("Preencha todos os campos obrigatórios.", "error");
      return;
    }

    const isConflict = students.some(s => s.username.toLowerCase() === cleanUser) || cleanUser === 'teste3';
    if (isConflict) {
      if (addToast) addToast("Este nome de usuário já está sendo utilizado.", "error");
      return;
    }

    const newStudent: User = {
      username: cleanUser,
      name: cleanName,
      password: newStudentData.password,
      sex: newStudentData.sex,
      role: 'student',
      streak: 0,
      totalWorkouts: 0,
      checkIns: [],
      history: [],
      weights: {},
      isProfileComplete: true
    };

    localStorage.setItem(`tatugym_user_profile_${cleanUser}`, JSON.stringify(newStudent));
    setNewStudentData({
      username: '',
      name: '',
      password: '12345',
      sex: 'masculino',
    });
    setShowAddModal(false);
    setTrigger(prev => prev + 1);
    if (addToast) addToast(`Aluno ${cleanName} cadastrado com sucesso!`, "success");
  };

  // Open Edit student Modal
  const handleOpenEditModal = (student: User) => {
    setEditingStudent(student);
    setEditStudentData({
      username: student.username,
      name: student.name,
      password: student.password || '12345',
      sex: student.sex || 'masculino'
    });
  };

  // Saved Edit student
  const handleEditStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const savedKey = `tatugym_user_profile_${editingStudent.username}`;
    const updatedUser: User = {
      ...editingStudent,
      name: editStudentData.name,
      password: editStudentData.password,
      sex: editStudentData.sex,
    };

    localStorage.setItem(savedKey, JSON.stringify(updatedUser));
    setEditingStudent(null);
    setTrigger(prev => prev + 1);
    if (addToast) addToast("Cadastro do aluno atualizado!", "success");
  };

  // Delete individual student records
  const handleDeleteStudent = (username: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.confirm(`Tem certeza que deseja excluir sumariamente o aluno @${username}?`)) {
      return;
    }

    localStorage.removeItem(`tatugym_user_profile_${username}`);
    
    // Clear workouts
    const currentAll = { ...allWorkouts };
    delete currentAll[username.toLowerCase()];
    setAllWorkouts(currentAll);

    // Notify state
    setEditingStudent(null);
    if (selectedStudentUsername === username) {
      setSelectedStudentUsername(null);
    }
    setTrigger(prev => prev + 1);
    if (addToast) addToast(`Aluno @${username} deletado do banco de dados.`, "success");
  };

  // Append exercise inside active training sheet
  const handleAddNewExercise = (baseEx: BaseExercise) => {
    const updated = [...localRoutines];
    const routine = { ...updated[activeRoutineIdx] };
    if (!routine) return;

    // Build specific structure targeting active layout row
    const exerciseID = `ex_${Math.random().toString(36).substring(2, 9)}`;
    const newEx: Exercise = {
      id: exerciseID,
      name: baseEx.name,
      muscleGroup: baseEx.muscleGroup,
      sets: baseEx.defaultSets || 3,
      reps: baseEx.defaultReps || '10-12',
      rest: baseEx.defaultRest || 60,
      notes: '0',
      dropSet: false,
      restPause: false,
      biSet: false,
      cluster: false,
      isometria: false,
      falha: false
    };

    routine.exercises = [...(routine.exercises || []), newEx];
    updated[activeRoutineIdx] = routine;
    setLocalRoutines(updated);
    setExpandedExerciseId(exerciseID);

    // Dynamic added visual checklist flash effect
    setRecentAddedId(baseEx.name);
    setTimeout(() => {
      setRecentAddedId(null);
    }, 800);

    if (addToast) addToast(`"${baseEx.name}" incluído no Treino ${String.fromCharCode(65 + activeRoutineIdx)}`, "success");
  };

  // Append flexible customized exercise card at bottom request button
  const handleAddCustomExercise = () => {
    const updated = [...localRoutines];
    const routine = { ...updated[activeRoutineIdx] };
    if (!routine) return;

    const exerciseID = `ex_${Math.random().toString(36).substring(2, 9)}`;
    const newEx: Exercise = {
      id: exerciseID,
      name: 'Exercício Personalizado',
      muscleGroup: 'Livre',
      sets: 4,
      reps: '10',
      rest: 60,
      notes: '0',
      dropSet: false,
      restPause: false,
      biSet: false
    };

    routine.exercises = [...(routine.exercises || []), newEx];
    updated[activeRoutineIdx] = routine;
    setLocalRoutines(updated);
    setExpandedExerciseId(exerciseID);

    if (addToast) addToast("Exercício livre adicionado ao construtor!", "success");
  };

  // Handle configuration updates
  const handleUpdateExerciseField = (id: string, field: keyof Exercise, val: any) => {
    const updated = [...localRoutines];
    const routine = { ...updated[activeRoutineIdx] };
    if (!routine) return;

    routine.exercises = (routine.exercises || []).map(ex => {
      if (ex.id === id) {
        return { ...ex, [field]: val };
      }
      return ex;
    });

    updated[activeRoutineIdx] = routine;
    setLocalRoutines(updated);
  };

  // Remove exercise from routine
  const handleRemoveExercise = (id: string) => {
    const updated = [...localRoutines];
    const routine = { ...updated[activeRoutineIdx] };
    if (!routine) return;

    routine.exercises = (routine.exercises || []).map(ex => {
      if (ex.id === id && selectedStudentUsername) {
        const studentProfileKey = `tatugym_user_profile_${selectedStudentUsername.toLowerCase()}`;
        const cached = localStorage.getItem(studentProfileKey);
        if (cached) {
          try {
            const p = JSON.parse(cached);
            if (p.weights && p.weights[ex.name]) {
              delete p.weights[ex.name];
              localStorage.setItem(studentProfileKey, JSON.stringify(p));
            }
          } catch {
            // ignore
          }
        }
      }
      return ex;
    }).filter(ex => ex.id !== id);

    updated[activeRoutineIdx] = routine;
    setLocalRoutines(updated);
    if (expandedExerciseId === id) setExpandedExerciseId(null);
    if (addToast) addToast("Exercício removido da planilha.", "success");
  };

  // Continuously auto-saves any changes to workouts in real-time
  useEffect(() => {
    if (!selectedStudentUsername || localRoutines.length === 0) return;

    const lowerStr = selectedStudentUsername.toLowerCase();
    const limit = getFrequencyCount();
    const activeRoutines = localRoutines.slice(0, limit);

    const payload = {
      ...allWorkouts,
      [lowerStr]: activeRoutines,
    };

    setAllWorkouts(payload);
    localStorage.setItem('tatugym_all_workouts', JSON.stringify(payload));
  }, [localRoutines, sheetFrequency, selectedStudentUsername]);

  // Inject a block template of exercises with default presets instantly
  const handleInjectBlock = (exercisesList: BaseExercise[]) => {
    const updated = [...localRoutines];
    const routine = { ...updated[activeRoutineIdx] };
    if (!routine) return;

    const newExs: Exercise[] = exercisesList.map(baseEx => {
      const exerciseID = `ex_${Math.random().toString(36).substring(2, 9)}`;
      return {
        id: exerciseID,
        name: baseEx.name,
        muscleGroup: baseEx.muscleGroup,
        sets: baseEx.defaultSets || 3,
        reps: baseEx.defaultReps || '10-12',
        rest: baseEx.defaultRest || 60,
        notes: '0',
        dropSet: false,
        restPause: false,
        biSet: false,
        cluster: false,
        isometria: false,
        falha: false
      };
    });

    routine.exercises = [...(routine.exercises || []), ...newExs];
    updated[activeRoutineIdx] = routine;
    setLocalRoutines(updated);
    
    if (addToast) addToast(`Injetado bloco de ${exercisesList.length} exercícios com presets!`, "success");
  };

  // Clones exercises from another training slot (e.g. A to B)
  const handleCloneRoutine = (fromIdx: number) => {
    if (fromIdx < 0 || fromIdx >= localRoutines.length) return;
    const source = localRoutines[fromIdx];
    if (!source) return;

    const updated = [...localRoutines];
    const clonedExercises: Exercise[] = (source.exercises || []).map(ex => ({
      ...ex,
      id: `ex_${Math.random().toString(36).substring(2, 9)}`
    }));

    updated[activeRoutineIdx] = {
      ...updated[activeRoutineIdx],
      exercises: clonedExercises,
      title: source.title || updated[activeRoutineIdx].title
    };

    setLocalRoutines(updated);
    if (addToast) addToast(`Copiado estrutura do Treino ${String.fromCharCode(65 + fromIdx)} para este treino!`, "success");
  };

  // Clones entire sheet from another student
  const handleCloneFromOtherStudent = (otherStudentUsername: string) => {
    const existing = allWorkouts[otherStudentUsername.toLowerCase()] || [];
    if (existing.length === 0) {
      if (addToast) addToast(`O aluno @${otherStudentUsername} ainda não possui treinos cadastrados.`, "error");
      return;
    }

    const clonedRoutines = existing.map(routine => ({
      ...routine,
      id: `routine_${Math.random().toString(36).substring(2, 9)}`,
      exercises: (routine.exercises || []).map(ex => ({
        ...ex,
        id: `ex_${Math.random().toString(36).substring(2, 9)}`
      }))
    }));

    const initialRoutines: WorkoutRoutine[] = Array.from({ length: 5 }).map((_, idx) => {
      const char = String.fromCharCode(65 + idx);
      const matched = clonedRoutines[idx];
      return matched ? { ...matched } : {
        id: `routine_${char}_${Math.random().toString(36).substring(2, 9)}`,
        title: `Treino ${char}`,
        description: '',
        exercises: [],
        color: 'blue'
      };
    });

    setLocalRoutines(initialRoutines);
    if (addToast) addToast(`Treinos clonados com sucesso do aluno @${otherStudentUsername}!`, "success");
  };

  // Wipe current routine exercises
  const handleClearWorkoutRoutine = () => {
    const updated = [...localRoutines];
    if (updated[activeRoutineIdx]) {
      updated[activeRoutineIdx].exercises = [];
      setLocalRoutines(updated);
      if (addToast) addToast("Todos os exercícios foram removidos deste treino.", "success");
    }
  };

  // Fast forward to builder
  const handleManageStudent = (username: string) => {
    setSelectedStudentUsername(username);
    setActiveTab('construtor');
  };

  // Helper limits
  const getFrequencyCount = () => {
    switch (sheetFrequency) {
      case 'AB': return 2;
      case 'ABC': return 3;
      case 'ABCD': return 4;
      case 'ABCDE': return 5;
      default: return 3;
    }
  };

  // Filter recommendations database list
  const filteredSuggestions = exerciseDatabase.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchExerciseQuery.toLowerCase()) || 
                          item.muscleGroup.toLowerCase().includes(searchExerciseQuery.toLowerCase());
    
    if (selectedMuscleFilter === 'Todos') return matchesSearch;
    
    if (selectedMuscleFilter === 'Braços') {
      return matchesSearch && ['Bíceps', 'Tríceps', 'Antebraço'].includes(item.muscleGroup);
    }
    if (selectedMuscleFilter === 'Pernas') {
      return matchesSearch && ['Quadríceps', 'Isquiotibiais', 'Panturrilha', 'Perna', 'Coxa', 'Glúteos'].includes(item.muscleGroup);
    }
    
    return matchesSearch && item.muscleGroup.toLowerCase().includes(selectedMuscleFilter.toLowerCase().slice(0, 4));
  });

  const selectedStudentProfile = students.find(s => s.username === selectedStudentUsername);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-gray-950 flex flex-col lg:flex-row font-sans lg:overflow-hidden pb-safe-bottom w-full">
      
      {/* 1. DESKTOP PERMANENT GLOBAL SIDEBAR - Elegant and fine (Notion / Figma / Stripe inspiration) */}
      <aside className="hidden lg:flex flex-col w-[260px] h-screen bg-white border-r border-gray-200 p-6 shrink-0 justify-between select-none">
        <div className="space-y-8">
          
          {/* Brand header */}
          <div className="flex items-center gap-3 py-1">
            <span className="font-black text-xl tracking-wider text-blue-600 uppercase italic">
              HORUS<span className="text-gray-300 font-normal">/</span>TRAINING
            </span>
          </div>

          {/* Quick modules menu list */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest pl-1.5 mb-2 block">
              Painel do Docente
            </span>
            {[
              { id: 'alunos', label: 'Meus alunos', icon: Users },
              { id: 'construtor', label: 'Ficha de Treino', icon: Dumbbell },
              { id: 'evolucao', label: 'Progresso/Evolução', icon: TrendingUp },
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'construtor' && !selectedStudentUsername) {
                      const first = students[0]?.username || null;
                      if (first) setSelectedStudentUsername(first);
                    }
                    setActiveTab(item.id as any);
                  }}
                  className={`flex items-center gap-3.5 w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                    isActive 
                      ? 'bg-blue-600 border-transparent text-white shadow-md shadow-blue-105' 
                      : 'bg-transparent border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* User profile action section */}
        <div className="space-y-3 pt-5 border-t border-gray-150">
          <div className="flex flex-col rounded-xl bg-gray-50 border border-gray-200 p-4">
            <span className="text-sm font-black text-gray-950">Prof. Teste3</span>
            <span className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Docente Credenciado</span>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 py-3.5 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-blue-100"
          >
            <UserPlus size={14} />
            <span>Novo Aluno</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-gray-200"
          >
            <LogOut size={13} />
            <span>Sair do sistema</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE TOP NAV (Visible only on small viewports) */}
      <div className="flex lg:hidden flex-col w-full shrink-0 select-none bg-white border-b border-gray-200">
        <header className="flex flex-col justify-between py-4 px-4 gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-blue-600 tracking-tight uppercase italic">HORUS <span className="text-gray-900 font-extrabold font-sans">TRAINING</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="py-2.5 px-4 bg-blue-600 text-white text-[11px] font-black uppercase rounded-xl transition-all cursor-pointer shadow-sm shadow-blue-100"
              >
                + Aluno
              </button>
              <button
                type="button"
                onClick={logout}
                className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2.5 rounded-xl text-xs cursor-pointer border border-gray-200"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>

          {/* Quick Switch segment picker */}
          <div className="flex items-center gap-0.5 bg-gray-100 p-1 rounded-xl">
            {[
              { id: 'alunos', label: 'Alunos', icon: Users },
              { id: 'construtor', label: 'Ficha', icon: Dumbbell },
              { id: 'evolucao', label: 'Evolução', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'construtor' && !selectedStudentUsername) {
                    const first = students[0]?.username || null;
                    if (first) setSelectedStudentUsername(first);
                  }
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-905 shadow-sm font-black'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <tab.icon size={12} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </header>
      </div>

      {/* 3. RIGHT MASTER VIEWPORT CONTAINER - Spans 100% of the layout frame */}
      <div className="flex-grow flex flex-col min-h-0 lg:h-screen lg:overflow-hidden bg-transparent">
        
        <main className="flex-grow flex flex-col min-h-0 lg:overflow-hidden h-auto lg:h-full">
          
          {/* TAB 1: MEUS ALUNOS */}
          {activeTab === 'alunos' && (
            <div className="flex-grow flex flex-col min-h-0 h-full overflow-y-auto p-4 sm:p-6 md:p-8">
              <StudentsTab 
                students={students}
                onOpenEditModal={handleOpenEditModal}
                onManageStudent={handleManageStudent}
              />
            </div>
          )}
  
          {/* TAB 2: CONSTRUTOR DE FICHA */}
          {activeTab === 'construtor' && (
            <div className="flex flex-col min-h-0 flex-grow lg:overflow-hidden lg:h-full h-auto">
              
              {!selectedStudentUsername ? (
                <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 text-center h-full">
                  <div className="border border-gray-200 bg-white rounded-2xl p-8 max-w-md w-full flex flex-col items-center shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                      <Dumbbell className="animate-pulse" size={28} />
                    </div>
                    <p className="text-gray-900 font-bold text-lg">Nenhum aluno ativo para montagem</p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">Selecione um aluno cadastrado nas abas para desenhar as fichas de forma instantânea e organizar os exercícios.</p>
                    <button
                      onClick={() => setActiveTab('alunos')}
                      className="mt-6 py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-sm shadow-blue-100"
                    >
                      Ver Alunos Cadastrados
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col flex-grow min-h-0 lg:h-full lg:overflow-hidden h-auto">
                  
                  {/* DEDICATED SUB-HEADER / ACTIONS STRIP - Notion / Stripe inspired */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-6 md:px-8 border-b border-gray-200 shrink-0 bg-white select-none">
                    
                    {/* Active target profile badge block */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-250 px-3.5 py-1.5 rounded-xl select-none">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Aluno Ativo:</span>
                        <span className="text-sm text-gray-950 font-black tracking-tight font-sans">
                          {selectedStudentProfile?.name || selectedStudentUsername}
                        </span>
                      </div>
 
                      {/* Interactive workout frequency sheet layout dropdown */}
                      {isDivisionSet ? (
                        <div className="flex items-center gap-2 text-xs py-1.5 px-3 rounded-xl bg-gray-50 border border-gray-200 select-none">
                          <span className="text-gray-400 font-bold text-[11px]">Esquema de Divisão:</span>
                          <span className="text-blue-600 font-mono font-black tracking-widest uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-105">
                            {sheetFrequency.split('').join('/')}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsDivisionSet(false)}
                            className="text-blue-600 hover:text-blue-700 underline cursor-pointer hover:no-underline text-xs font-black tracking-wide ml-2"
                          >
                            Alterar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 p-1 px-3.5 rounded-xl select-none">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Escolha:</span>
                          <div className="flex gap-1.5 select-none">
                            {(['AB', 'ABC', 'ABCD', 'ABCDE'] as const).map((freq) => {
                              const isCurrentFreq = sheetFrequency === freq;
                              return (
                                <button
                                  key={freq}
                                  type="button"
                                  onClick={() => {
                                    setSheetFrequency(freq);
                                    setIsDivisionSet(true);
                                    if (activeRoutineIdx >= freq.length) {
                                      setActiveRoutineIdx(0);
                                    }
                                  }}
                                  className={`px-2.5 py-1 text-xs font-bold font-mono rounded-lg transition-colors cursor-pointer ${
                                    isCurrentFreq
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-transparent text-gray-400 hover:text-gray-700'
                                  }`}
                                >
                                  {freq}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* Auto-saved checklist and go back-actions */}
                    <div className="flex items-center justify-between sm:justify-start gap-4">
                      <div className="flex items-center gap-2 text-green-600 select-none bg-green-50 px-3 py-1.5 rounded-lg border border-green-105">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-black tracking-wide font-sans">Salvo na Nuvem</span>
                      </div>
 
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStudentUsername(null);
                          setActiveTab('alunos');
                        }}
                        className="py-2 px-3.5 bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 hover:text-gray-950 font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-gray-200"
                        style={{ minHeight: '40px' }}
                      >
                        <span>Voltar Alunos</span>
                      </button>
                    </div>
                  </div>
 
                  {/* FULL-CANVAS RESPONSIVE SPLITS (Library left on big screen, integrated fully on mobile) */}
                  <div className="flex-grow flex flex-col lg:flex-row gap-0 lg:overflow-hidden min-h-0 w-full lg:h-full h-auto">
                    
                    {/* LEFT COL: EMBEDDED DOCKED EXERCISE LIBRARY PANEL - Visible only on Desktop to prevent cluttering mobile */}
                    <aside className="hidden lg:flex w-full lg:w-[350px] xl:w-[400px] lg:h-full shrink-0 flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white h-auto lg:overflow-hidden">
                      <ExerciseLibrary 
                        filteredSuggestions={filteredSuggestions}
                        searchExerciseQuery={searchExerciseQuery}
                        setSearchExerciseQuery={setSearchExerciseQuery}
                        selectedMuscleFilter={selectedMuscleFilter}
                        setSelectedMuscleFilter={setSelectedMuscleFilter}
                        recentAddedId={recentAddedId}
                        onAddExercise={handleAddNewExercise}
                        onInjectBlock={handleInjectBlock}
                      />
                    </aside>
 
                    {/* RIGHT COL: MAIN DOMINANT WORKSPACE */}
                    <section className="flex-grow lg:h-full lg:overflow-hidden flex flex-col bg-[#F5F7FA] min-w-0 h-auto">
                      <WorkoutWorkspace 
                        localRoutines={localRoutines}
                        activeRoutineIdx={activeRoutineIdx}
                        setActiveRoutineIdx={setActiveRoutineIdx}
                        expandedExerciseId={expandedExerciseId}
                        setExpandedExerciseId={setExpandedExerciseId}
                        sheetFrequency={sheetFrequency}
                        getFrequencyCount={getFrequencyCount}
                        onUpdateExerciseField={handleUpdateExerciseField}
                        onRemoveExercise={handleRemoveExercise}
                        onAddCustomExercise={handleAddCustomExercise}
                        onUpdateRoutineTitle={(title) => {
                          const updated = [...localRoutines];
                          if (updated[activeRoutineIdx]) {
                            updated[activeRoutineIdx].title = title;
                            setLocalRoutines(updated);
                          }
                        }}
                        students={students}
                        onCloneRoutine={handleCloneRoutine}
                        onCloneFromOtherStudent={handleCloneFromOtherStudent}
                        onClearWorkoutRoutine={handleClearWorkoutRoutine}
                        onInjectBlock={handleInjectBlock}
                        onReorderExercises={(reorderedExercises) => {
                          const updated = [...localRoutines];
                          if (updated[activeRoutineIdx]) {
                            updated[activeRoutineIdx].exercises = reorderedExercises;
                            setLocalRoutines(updated);
                          }
                        }}
                        // Mobilizer integrated parameters for responsive quick additions
                        filteredSuggestions={filteredSuggestions}
                        searchExerciseQuery={searchExerciseQuery}
                        setSearchExerciseQuery={setSearchExerciseQuery}
                        selectedMuscleFilter={selectedMuscleFilter}
                        setSelectedMuscleFilter={setSelectedMuscleFilter}
                        onAddExercise={handleAddNewExercise}
                      />
                    </section>
                  </div>
 
                </div>
              )}
            </div>
          )}
 
          {/* TAB 3: PROGRESÃO */}
          {activeTab === 'evolucao' && (
            <div className="flex-grow flex flex-col min-h-0 h-full overflow-y-auto p-4 sm:p-6 md:p-8">
              <EvolutionTab 
                selectedStudentUsername={selectedStudentUsername}
                selectedStudentProfile={selectedStudentProfile}
                onTabChange={setActiveTab}
              />
            </div>
          )}
 
        </main>
      </div>
 
      {/* GLOBAL MODALS */}
      <StudentModals 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newStudentData={newStudentData}
        setNewStudentData={setNewStudentData}
        onCreateStudentSubmit={handleCreateStudentSubmit}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        editStudentData={editStudentData}
        setEditStudentData={setEditStudentData}
        onEditStudentSubmit={handleEditStudentSubmit}
        onDeleteStudent={handleDeleteStudent}
      />
 
    </div>
  );
};

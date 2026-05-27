import React from 'react';
import { Users, Settings, Dumbbell } from 'lucide-react';
import { User } from '../../../types';

interface StudentsTabProps {
  students: User[];
  onOpenEditModal: (student: User) => void;
  onManageStudent: (username: string) => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  onOpenEditModal,
  onManageStudent,
}) => {
  return (
    <div className="flex-grow overflow-y-auto no-scrollbar pb-10 space-y-6 animate-fade">
      {/* Title block */}
      <div className="flex justify-between items-center py-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Alunos cadastrados</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Gerencie e crie fichas de treinamento individuais ({students.length} alunos ativos)
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => {
          const isFemale = student.sex === 'feminino';
          const countOfWorkouts = student.totalWorkouts || 0;
          
          return (
            <div 
              key={student.username}
              className="bg-zinc-900/60 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between space-y-5 hover:border-zinc-800 hover:bg-zinc-900/80 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Status dot – quiet and single-colored without neon glow */}
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: isFemale ? '#ec4899' : '#3b82f6',
                      }}
                      title={isFemale ? 'Feminino - Tema Rosa' : 'Masculino - Tema Azul'}
                    />
                    <span className="text-sm font-medium text-zinc-100 truncate block">
                      {student.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    @{student.username}
                  </span>
                </div>
                
                <div className="text-xs text-zinc-400 font-normal">
                  <span className="text-zinc-500">Check-ins de treino:</span> &nbsp;
                  <span className="font-medium text-zinc-300">{countOfWorkouts} {countOfWorkouts === 1 ? 'concluído' : 'concluídos'}</span>
                </div>
              </div>

              {/* Simplified non-bulky layout actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenEditModal(student)}
                  className="flex-grow py-2 px-3 bg-zinc-800/60 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onManageStudent(student.username)}
                  className="flex-grow py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Ficha de Treino
                </button>
              </div>
            </div>
          );
        })}

        {students.length === 0 && (
          <div className="col-span-full border border-zinc-800 border-dashed bg-zinc-900/20 py-16 text-center rounded-xl flex flex-col items-center justify-center">
            <Users className="text-zinc-700 mb-3" size={28} />
            <h3 className="text-zinc-300 font-medium text-sm">Nenhum aluno cadastrado no sistema</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs text-center leading-relaxed">Clique no botão "+ Novo Aluno" no topo direito para cadastrar o primeiro.</p>
          </div>
        )}
      </div>
    </div>
  );
};

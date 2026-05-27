import React from 'react';
import { TrendingUp, User } from 'lucide-react';
import { User as UserType } from '../../../types';

interface EvolutionTabProps {
  selectedStudentUsername: string | null;
  selectedStudentProfile: UserType | undefined;
  onTabChange: (tab: 'alunos' | 'construtor' | 'evolucao') => void;
}

export const EvolutionTab: React.FC<EvolutionTabProps> = ({
  selectedStudentUsername,
  selectedStudentProfile,
  onTabChange,
}) => {
  if (!selectedStudentUsername) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-16 text-center border border-zinc-900 border-dashed rounded-xl min-h-[300px] animate-fade">
        <TrendingUp className="text-zinc-700 mb-3" size={32} />
        <h3 className="text-zinc-300 text-sm font-medium mb-1">Nenhum aluno selecionado</h3>
        <p className="text-zinc-500 text-xs max-w-sm leading-relaxed mb-5">
          Selecione um aluno na lista para consultar registros de evolução e históricos de treino.
        </p>
        <button
          onClick={() => onTabChange('alunos')}
          className="py-2 px-5 bg-zinc-800 text-zinc-150 rounded-lg text-xs font-semibold hover:bg-zinc-750 transition-colors cursor-pointer"
        >
          Ver Alunos
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto no-scrollbar pb-12 space-y-6 animate-fade">
      <div className="flex items-center justify-between py-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Progresso do aluno</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Métricas ativas e histórico de {selectedStudentProfile?.name || selectedStudentUsername}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onTabChange('alunos')}
          className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
        >
          Trocar Aluno
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metas de Carga de Treino */}
        <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl">
          <span className="text-xs font-medium text-zinc-400 block mb-4 pb-1.5 border-b border-zinc-900">Metas de Cargas de Treino</span>
          
          {selectedStudentProfile?.weights && Object.keys(selectedStudentProfile.weights).filter(key => !key.startsWith('ex_')).length > 0 ? (
            <div className="divide-y divide-zinc-900 max-h-64 overflow-y-auto pr-1 no-scrollbar pt-1">
              {Object.entries(selectedStudentProfile.weights).map(([exLabel, weightVal]) => {
                if (exLabel.startsWith('ex_')) return null;
                return (
                  <div key={exLabel} className="flex justify-between items-center text-xs py-2.5 transition-colors">
                    <span className="text-zinc-300">{exLabel}</span>
                    <span className="font-mono text-zinc-300 bg-zinc-905 border border-zinc-850 px-2.5 py-0.5 rounded text-[11px] font-medium">{weightVal} kg</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-zinc-650 text-xs text-center py-12">Nenhuma carga salva no perfil ainda.</p>
          )}
        </div>

        {/* Últimos Treinos Conclusos */}
        <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl">
          <span className="text-xs font-medium text-zinc-400 block mb-4 pb-1.5 border-b border-zinc-900">Últimos Treinos Concluídos</span>
          
          {selectedStudentProfile?.history && selectedStudentProfile.history.length > 0 ? (
            <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1 no-scrollbar pt-1">
              {selectedStudentProfile.history.slice(0, 5).map((entry, eIdx) => (
                <div key={eIdx} className="bg-zinc-900/20 p-3.5 rounded-lg border border-zinc-900 transition-colors">
                  <div className="flex justify-between text-xs font-medium mb-2.5">
                    <span className="text-blue-400">{entry.workoutTitle}</span>
                    <span className="text-zinc-550 font-mono text-[10px]">
                      {new Date(entry.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2.5 border-t border-zinc-900">
                    {entry.exercises.map((ex, exIdx) => (
                      <div key={exIdx} className="flex justify-between text-[11px] items-center">
                        <span className="text-zinc-450">{ex.name}</span>
                        <span className="text-zinc-300 font-mono">
                          {ex.performance.length} séries • {ex.performance[0]?.weight || 0}kg
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-650 text-xs text-center py-12">Nenhum histórico registrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

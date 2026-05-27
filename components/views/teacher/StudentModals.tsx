import React from 'react';
import { AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { User } from '../../../types';

interface StudentModalsProps {
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  newStudentData: any;
  setNewStudentData: (data: any) => void;
  onCreateStudentSubmit: (e: React.FormEvent) => void;
  
  editingStudent: User | null;
  setEditingStudent: (student: User | null) => void;
  editStudentData: any;
  setEditStudentData: (data: any) => void;
  onEditStudentSubmit: (e: React.FormEvent) => void;
  onDeleteStudent: (username: string, e: React.MouseEvent) => void;
}

export const StudentModals: React.FC<StudentModalsProps> = ({
  showAddModal,
  setShowAddModal,
  newStudentData,
  setNewStudentData,
  onCreateStudentSubmit,
  editingStudent,
  setEditingStudent,
  editStudentData,
  setEditStudentData,
  onEditStudentSubmit,
  onDeleteStudent,
}) => {
  return (
    <>
      {/* CADASTRO DE ALUNO NOVO */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade">
            <div className="bg-zinc-950 border border-zinc-900 w-full max-w-sm rounded-xl p-5 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                <span className="text-sm font-medium text-zinc-200">Cadastrar novo aluno</span>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)} 
                  className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors p-1"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={onCreateStudentSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1">Nome completo</label>
                  <input 
                    type="text"
                    required
                    value={newStudentData.name}
                    onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                    placeholder="Ex: Ana Souza"
                    className="w-full bg-zinc-900 border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1">Login (Usuário)</label>
                  <input 
                    type="text"
                    required
                    value={newStudentData.username}
                    onChange={(e) => setNewStudentData({ ...newStudentData, username: e.target.value })}
                    placeholder="Ex: anasouza"
                    className="w-full bg-zinc-900 border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1">Senha de entrada</label>
                  <input 
                    type="text"
                    value={newStudentData.password}
                    onChange={(e) => setNewStudentData({ ...newStudentData, password: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1.5">Gênero (Configuração de tema)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewStudentData({ ...newStudentData, sex: 'masculino' })}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        newStudentData.sex === 'masculino' 
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-700' 
                          : 'bg-transparent border-zinc-900 text-zinc-500 hover:text-zinc-400'
                      }`}
                    >
                      Masculino (Azul)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStudentData({ ...newStudentData, sex: 'feminino' })}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        newStudentData.sex === 'feminino' 
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-700' 
                          : 'bg-transparent border-zinc-900 text-zinc-400 hover:text-zinc-300'
                      }`}
                    >
                      Feminino (Rosa)
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors mt-4 cursor-pointer"
                >
                  Confirmar Cadastro
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIÇÃO DE ALUNO / EXCLUSÃO */}
      <AnimatePresence>
        {editingStudent && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade">
            <div className="bg-zinc-950 border border-zinc-900 w-full max-w-sm rounded-xl p-5 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                <span className="text-sm font-medium text-zinc-200">Editar cadastro</span>
                <button 
                  type="button"
                  onClick={() => setEditingStudent(null)} 
                  className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors p-1"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={onEditStudentSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1">Nome completo</label>
                  <input 
                    type="text"
                    required
                    value={editStudentData.name}
                    onChange={(e) => setEditStudentData({ ...editStudentData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1">Login (Usuário)</label>
                  <input 
                    type="text"
                    required
                    value={editStudentData.username}
                    onChange={(e) => setEditStudentData({ ...editStudentData, username: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1">Senha</label>
                  <input 
                    type="text"
                    value={editStudentData.password}
                    onChange={(e) => setNewStudentData({ ...editStudentData, password: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 block mb-1.5">Gênero (Configuração de tema)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditStudentData({ ...editStudentData, sex: 'masculino' })}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        editStudentData.sex === 'masculino' 
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-700' 
                          : 'bg-transparent border-zinc-900 text-zinc-500 hover:text-zinc-400'
                      }`}
                    >
                      Masculino (Azul)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditStudentData({ ...editStudentData, sex: 'feminino' })}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        editStudentData.sex === 'feminino' 
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-700' 
                          : 'bg-transparent border-zinc-900 text-zinc-400 hover:text-zinc-305'
                      }`}
                    >
                      Feminino (Rosa)
                    </button>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button 
                    type="button"
                    onClick={(e) => onDeleteStudent(editingStudent.username, e)}
                    className="flex-1 py-2 bg-red-950/20 text-red-400 hover:bg-red-900/10 border border-red-900/40 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Excluir Aluno
                  </button>

                  <button 
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentModals;

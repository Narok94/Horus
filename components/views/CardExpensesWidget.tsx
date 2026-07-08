import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { CardExpense } from '../../types';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { defaultExpenses } from '../../data/users';

export const CardExpensesWidget: React.FC = () => {
  const { user, updateUserProfile, addToast, triggerConfetti } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'installments' | 'single' | 'pending'>('all');
  
  // Modal / Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCurrentInst, setNewCurrentInst] = useState('');
  const [newTotalInst, setNewTotalInst] = useState('');
  const [newIsPending, setNewIsPending] = useState(false);

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDesc, setEditDesc] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editCurrentInst, setEditCurrentInst] = useState('');
  const [editTotalInst, setEditTotalInst] = useState('');
  const [editIsPending, setEditIsPending] = useState(false);

  // Fetch expenses from user profile, fallback to preloaded defaults
  const expenses = useMemo(() => {
    return user?.cardExpenses || defaultExpenses;
  }, [user?.cardExpenses]);

  // Vibrate helper
  const handleVibrate = (ms = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    let total = 0;
    let paidCount = 0;
    let activeCount = 0;
    let pendingCount = 0;

    expenses.forEach(exp => {
      if (exp.isPendingValue) {
        pendingCount++;
      } else {
        total += exp.value;
        activeCount++;
      }
      
      // If it's a finished installment (e.g. 3/3, 10/10, 2/2)
      if (exp.currentInstallment && exp.totalInstallments && exp.currentInstallment >= exp.totalInstallments) {
        paidCount++;
      }
    });

    return {
      total,
      pendingCount,
      activeCount,
      paidCount,
      totalCount: expenses.length
    };
  }, [expenses]);

  // Filtered expenses list
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const matchSearch = exp.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      if (filterType === 'all') return true;
      if (filterType === 'installments') return exp.totalInstallments !== undefined && exp.totalInstallments > 1;
      if (filterType === 'single') return exp.totalInstallments === undefined || exp.totalInstallments <= 1;
      if (filterType === 'pending') return exp.isPendingValue === true;
      return true;
    });
  }, [expenses, searchQuery, filterType]);

  // Save list helper
  const saveExpenses = (updatedList: CardExpense[]) => {
    updateUserProfile({ cardExpenses: updatedList });
  };

  // Add Gasto handler
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    handleVibrate(25);

    if (!newDesc.trim()) {
      if (addToast) addToast('Insira uma descrição válida.', 'error');
      return;
    }

    const val = parseFloat(newValue.replace(',', '.')) || 0;
    if (val <= 0 && !newIsPending) {
      if (addToast) addToast('Insira um valor maior que zero ou marque como pendente.', 'error');
      return;
    }

    const currentI = parseInt(newCurrentInst) || undefined;
    const totalI = parseInt(newTotalInst) || undefined;

    const newExp: CardExpense = {
      id: Date.now().toString(),
      description: newDesc.trim(),
      value: newIsPending ? 0 : val,
      currentInstallment: currentI,
      totalInstallments: totalI,
      isPendingValue: newIsPending
    };

    const updated = [...expenses, newExp];
    saveExpenses(updated);
    triggerConfetti();

    if (addToast) addToast(`Gasto "${newDesc}" adicionado com sucesso!`, 'success');

    // Reset Form
    setNewDesc('');
    setNewValue('');
    setNewCurrentInst('');
    setNewTotalInst('');
    setNewIsPending(false);
    setShowAddForm(false);
  };

  // Delete Gasto handler
  const handleDeleteExpense = (id: string, desc: string) => {
    handleVibrate(30);
    if (confirm(`Deseja realmente excluir o gasto "${desc}"?`)) {
      const updated = expenses.filter(exp => exp.id !== id);
      saveExpenses(updated);
      if (addToast) addToast(`Gasto "${desc}" excluído.`, 'info');
    }
  };

  // Start Editing handler
  const startEditing = (exp: CardExpense) => {
    handleVibrate(15);
    setEditingId(exp.id);
    setEditDesc(exp.description);
    setEditValue(exp.isPendingValue ? '' : exp.value.toString());
    setEditCurrentInst(exp.currentInstallment?.toString() || '');
    setEditTotalInst(exp.totalInstallments?.toString() || '');
    setEditIsPending(!!exp.isPendingValue);
  };

  // Save Edit handler
  const handleSaveEdit = (id: string) => {
    handleVibrate(25);
    
    if (!editDesc.trim()) {
      if (addToast) addToast('A descrição não pode ser vazia.', 'error');
      return;
    }

    const val = parseFloat(editValue.replace(',', '.')) || 0;
    if (val <= 0 && !editIsPending) {
      if (addToast) addToast('Insira um valor maior que zero ou marque como pendente.', 'error');
      return;
    }

    const updated = expenses.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          description: editDesc.trim(),
          value: editIsPending ? 0 : val,
          currentInstallment: parseInt(editCurrentInst) || undefined,
          totalInstallments: parseInt(editTotalInst) || undefined,
          isPendingValue: editIsPending
        };
      }
      return exp;
    });

    saveExpenses(updated);
    setEditingId(null);
    if (addToast) addToast('Gasto atualizado!', 'success');
  };

  // Clear / Reset list to the exact requested version on 07/07/2026
  const handleResetToDefault = () => {
    handleVibrate(40);
    if (confirm('Deseja realmente redefinir todos os gastos para a lista oficial de 07/07/2026? Isso apagará alterações manuais.')) {
      saveExpenses([...defaultExpenses]);
      triggerConfetti();
      if (addToast) addToast('Lista de gastos restaurada para a versão oficial!', 'success');
    }
  };

  const isLightUser = user?.role !== 'teacher';
  const themeAccent = user?.sex === 'feminino' ? '#FF007F' : '#2563EB';

  return (
    <div className={`w-full rounded-[24px] border transition-all duration-300 shadow-sm ${
      isLightUser 
        ? 'bg-white border-zinc-200' 
        : 'bg-[#0E0E12] border-white/5'
    } overflow-hidden p-4`}>
      
      {/* Header Block with Card Icon */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-indigo-500/10 text-indigo-500">
            <CreditCard size={18} />
          </div>
          <div className="text-left">
            <span className="text-[8.5px] font-black uppercase tracking-[0.2em] text-indigo-500 font-mono block">
              Financeiro
            </span>
            <h3 className={`text-sm font-black uppercase tracking-tight italic ${
              isLightUser ? 'text-zinc-950 font-[900]' : 'text-white font-[900]'
            }`}>
              Gastos Cartão
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Reset / Reload Original List */}
          <button
            onClick={handleResetToDefault}
            title="Restaurar lista original de 07/07/2026"
            className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-zinc-400 hover:text-indigo-500 cursor-pointer border-0"
          >
            <RefreshCw size={13} />
          </button>

          {/* Expand Toggle */}
          <button
            onClick={() => {
              handleVibrate(15);
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-pointer border-0"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Main Stats Summary Block */}
      <div className="grid grid-cols-2 gap-3.5 py-3.5 select-none text-left">
        <div className="space-y-0.5 border-r border-zinc-100 dark:border-white/[0.04]">
          <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            TOTAL DO CARTÃO
          </span>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-black ${isLightUser ? 'text-zinc-950 font-[950]' : 'text-white font-[950]'} tracking-tight`}>
              R$ {calculations.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <span className="text-[9px] font-bold text-zinc-400 leading-none">
            {calculations.activeCount} contas ativas calculadas
          </span>
        </div>

        <div className="space-y-1 pl-1">
          <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            STATUS GERAL
          </span>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-zinc-400 dark:text-zinc-500">Finalizados:</span>
              <span className="text-emerald-500">{calculations.paidCount} de {calculations.totalCount}</span>
            </div>
            {calculations.pendingCount > 0 && (
              <div className="flex items-center gap-1 text-[9.5px] font-extrabold text-amber-500 leading-none">
                <AlertCircle size={10} />
                <span>{calculations.pendingCount} pendentes (Spotify, YT)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapsed view top list preview */}
      {!isExpanded && (
        <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-white/[0.03]">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider text-zinc-400">
            <span>Alguns Gastos da Fatura</span>
            <button
              onClick={() => { handleVibrate(15); setIsExpanded(true); }}
              className="text-indigo-500 hover:underline bg-transparent border-0 cursor-pointer font-black text-[9px] uppercase"
            >
              Ver todos ({calculations.totalCount}) →
            </button>
          </div>

          <div className="space-y-1.5">
            {expenses.slice(0, 3).map((exp) => (
              <div 
                key={exp.id} 
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  isLightUser 
                    ? 'bg-zinc-50/70 border-zinc-200/60' 
                    : 'bg-white/[0.01] border-white/[0.03]'
                }`}
              >
                <div className="text-left space-y-0.5">
                  <div className={`font-black uppercase tracking-tight ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-zinc-100 font-[900]'}`}>
                    {exp.description}
                  </div>
                  {exp.currentInstallment && exp.totalInstallments && (
                    <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-400">
                      <span>PARCELA:</span>
                      <span className={exp.currentInstallment >= exp.totalInstallments ? 'text-emerald-500 font-extrabold' : 'text-indigo-400'}>
                        {exp.currentInstallment}/{exp.totalInstallments}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  {exp.isPendingValue ? (
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 font-mono">Pendente 💤</span>
                  ) : (
                    <span className={`font-black font-mono tracking-tight ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-white'}`}>
                      R$ {exp.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expanded view full list with Search, Filters, Add, and inline edits */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-3 border-t border-zinc-100 dark:border-white/[0.03] space-y-3"
          >
            {/* Search and filter row */}
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <Search size={13} className="absolute left-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Buscar gastos (ex: Farmácia, Shopee)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-8 pr-3 py-2 text-xs font-semibold rounded-xl outline-none transition-all ${
                    isLightUser 
                      ? 'bg-zinc-50 border border-zinc-200 focus:border-indigo-400 focus:bg-white text-zinc-800' 
                      : 'bg-white/[0.02] border border-white/5 focus:border-indigo-500 focus:bg-white/[0.04] text-white'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'installments', label: 'Parcelados' },
                  { id: 'single', label: 'À Vista' },
                  { id: 'pending', label: 'Pendentes' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { handleVibrate(); setFilterType(tab.id as any); }}
                    className={`px-3 py-1.5 text-[9.5px] font-black uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer border-0 leading-none ${
                      filterType === tab.id
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : isLightUser
                          ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-400'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List Header Actions */}
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-zinc-400 pt-1">
              <span>Lista de Gastos ({filteredExpenses.length})</span>
              <button
                onClick={() => { handleVibrate(); setShowAddForm(!showAddForm); }}
                className="text-indigo-500 hover:text-indigo-600 font-black uppercase tracking-wider flex items-center gap-1 bg-transparent border-0 cursor-pointer text-[10px]"
              >
                <Plus size={12} />
                <span>Novo Gasto</span>
              </button>
            </div>

            {/* Add Gasto Form */}
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleAddExpense}
                className={`p-3.5 rounded-2xl border text-left space-y-3 ${
                  isLightUser ? 'bg-zinc-50 border-zinc-250' : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className="flex justify-between items-center pb-1.5 border-b border-zinc-200/50 dark:border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500">Adicionar Gasto Fatura</span>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Desc */}
                  <div className="space-y-1">
                    <label className="font-extrabold text-[9px] uppercase tracking-wider text-zinc-400">Descrição / Estabelecimento</label>
                    <input
                      type="text"
                      placeholder="Ex: Farmácia, Shopee, BH"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      required
                      className={`w-full p-2 rounded-xl outline-none border transition-all ${
                        isLightUser ? 'bg-white border-zinc-200 focus:border-indigo-400' : 'bg-black/40 border-white/5 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  {/* Pending Checkbox Toggle */}
                  <label className="flex items-center gap-2 py-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newIsPending}
                      onChange={(e) => { handleVibrate(); setNewIsPending(e.target.checked); }}
                      className="accent-indigo-500"
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Gasto com valor pendente (Spotify/YT)</span>
                  </label>

                  {/* Value and Installments Row */}
                  {!newIsPending && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1 space-y-1">
                        <label className="font-extrabold text-[9px] uppercase tracking-wider text-zinc-400">Valor (R$)</label>
                        <input
                          type="text"
                          placeholder="0,00"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          required={!newIsPending}
                          className={`w-full p-2 rounded-xl outline-none border transition-all ${
                            isLightUser ? 'bg-white border-zinc-200 focus:border-indigo-400' : 'bg-black/40 border-white/5 focus:border-indigo-500'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-extrabold text-[9px] uppercase tracking-wider text-zinc-400">Parcela Atual</label>
                        <input
                          type="number"
                          placeholder="Ex: 2"
                          min="1"
                          value={newCurrentInst}
                          onChange={(e) => setNewCurrentInst(e.target.value)}
                          className={`w-full p-2 rounded-xl outline-none border transition-all ${
                            isLightUser ? 'bg-white border-zinc-200 focus:border-indigo-400' : 'bg-black/40 border-white/5 focus:border-indigo-500'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-extrabold text-[9px] uppercase tracking-wider text-zinc-400">Total Parc.</label>
                        <input
                          type="number"
                          placeholder="Ex: 3"
                          min="1"
                          value={newTotalInst}
                          onChange={(e) => setNewTotalInst(e.target.value)}
                          className={`w-full p-2 rounded-xl outline-none border transition-all ${
                            isLightUser ? 'bg-white border-zinc-200 focus:border-indigo-400' : 'bg-black/40 border-white/5 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all cursor-pointer border-0"
                >
                  Salvar Lançamento
                </button>
              </motion.form>
            )}

            {/* Scrollable List Container */}
            <div className="max-h-[360px] overflow-y-auto no-scrollbar space-y-1.5 pr-0.5">
              {filteredExpenses.length === 0 ? (
                <div className="py-8 text-center text-zinc-400">
                  <AlertCircle size={24} className="mx-auto mb-2 opacity-55" />
                  <p className="text-xs font-semibold">Nenhum gasto encontrado.</p>
                </div>
              ) : (
                filteredExpenses.map((exp) => {
                  const isEditing = editingId === exp.id;
                  const isPaid = exp.currentInstallment && exp.totalInstallments && exp.currentInstallment >= exp.totalInstallments;

                  return (
                    <div 
                      key={exp.id}
                      className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 text-left ${
                        isEditing 
                          ? 'bg-indigo-500/5 border-indigo-500/40 shadow-sm' 
                          : isPaid
                            ? (isLightUser ? 'bg-emerald-500/[0.02] border-emerald-500/10 opacity-70' : 'bg-emerald-500/[0.01] border-emerald-500/5 opacity-60')
                            : (isLightUser ? 'bg-zinc-50 border-zinc-200/60 hover:bg-zinc-100/50' : 'bg-white/[0.01] border-white/[0.03] hover:bg-white/[0.02]')
                      }`}
                    >
                      {isEditing ? (
                        /* Editing Layout */
                        <div className="space-y-2.5 text-xs">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editDesc}
                              onChange={(e) => setEditDesc(e.target.value)}
                              className="flex-1 p-1.5 rounded-lg border outline-none text-xs"
                            />
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editIsPending}
                                onChange={(e) => setEditIsPending(e.target.checked)}
                              />
                              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Pend</span>
                            </label>
                          </div>

                          {!editIsPending && (
                            <div className="grid grid-cols-3 gap-1.5">
                              <input
                                type="text"
                                placeholder="Valor"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="p-1.5 rounded-lg border outline-none text-xs font-mono"
                              />
                              <input
                                type="number"
                                placeholder="Parc. Atu"
                                value={editCurrentInst}
                                onChange={(e) => setEditCurrentInst(e.target.value)}
                                className="p-1.5 rounded-lg border outline-none text-xs"
                              />
                              <input
                                type="number"
                                placeholder="Parc. Tot"
                                value={editTotalInst}
                                onChange={(e) => setEditTotalInst(e.target.value)}
                                className="p-1.5 rounded-lg border outline-none text-xs"
                              />
                            </div>
                          )}

                          <div className="flex justify-end gap-1.5 pt-1">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-500 dark:border-white/5 dark:hover:bg-white/5 cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleSaveEdit(exp.id)}
                              className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
                            >
                              Salvar
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Normal Layout */
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-black uppercase tracking-tight text-xs ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-zinc-100 font-[900]'}`}>
                                {exp.description}
                              </span>
                              {isPaid && (
                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[7.5px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest font-mono">
                                  PAGO💤
                                </span>
                              )}
                            </div>

                            {exp.currentInstallment && exp.totalInstallments ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[8.5px] font-bold text-zinc-400">Parcelas:</span>
                                <span className={`text-[9.5px] font-black font-mono tracking-tight ${isPaid ? 'text-emerald-500' : 'text-indigo-400'}`}>
                                  {exp.currentInstallment} de {exp.totalInstallments}
                                </span>
                                
                                {/* Mini Progress bar */}
                                <div className="w-16 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all ${isPaid ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                    style={{ width: `${Math.min(100, (exp.currentInstallment / exp.totalInstallments) * 100)}%` }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-zinc-400">À Vista</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 pl-1">
                            {/* Value display */}
                            <div className="text-right">
                              {exp.isPendingValue ? (
                                <span className="text-[9.5px] font-black uppercase tracking-wider text-amber-500 font-mono">Pendente</span>
                              ) : (
                                <span className={`font-black font-mono tracking-tight text-xs ${isLightUser ? 'text-zinc-950 font-[900]' : 'text-white'}`}>
                                  R$ {exp.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              )}
                            </div>

                            {/* Actions block */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEditing(exp)}
                                className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-400 hover:text-indigo-500 cursor-pointer border-0 transition-colors"
                              >
                                <Edit2 size={11} />
                              </button>
                              <button
                                onClick={() => handleDeleteExpense(exp.id, exp.description)}
                                className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-400 hover:text-rose-500 cursor-pointer border-0 transition-colors"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Expanded Footer Stats */}
            <div className={`p-2.5 rounded-xl border flex items-center justify-between text-[10px] font-bold ${
              isLightUser ? 'bg-indigo-50/20 border-indigo-100' : 'bg-indigo-500/[0.01] border-indigo-500/10'
            }`}>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <AlertCircle size={11} className="text-indigo-400 shrink-0" />
                <span>Valores pendentes não entram na soma.</span>
              </div>
              <button
                onClick={() => { handleVibrate(15); setIsExpanded(false); }}
                className="text-indigo-500 hover:underline bg-transparent border-0 cursor-pointer uppercase font-black"
              >
                Recolher Listagem
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

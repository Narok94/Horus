import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Flame, Scale, Ruler, Calendar, CheckCircle2, 
  Plus, Copy, Trash2, Edit3, Share2, 
  Dumbbell, Camera, Target, Zap, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useStore } from '../../store';
import { Operacao9CheckIn, Operacao9State } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const Operacao9View: React.FC = () => {
  const { user, updateUserProfile, addToast } = useStore();

  // Get or initialize Operação 9% state
  const operacaoState: Operacao9State = useMemo(() => {
    if (user?.operacao9Data) {
      return user.operacao9Data;
    }
    return {
      dataInicio: '2026-07-20',
      dataFim: '2026-10-18',
      pesoInicial: 68.9,
      gorduraInicial: 13.61,
      cinturaInicial: 84.0,
      abdomenInicial: 85.0,
      metaGordura: 9.0,
      checkIns: [
        {
          id: 'chk-w1',
          semana: 1,
          data: '2026-07-20',
          peso: 68.9,
          cintura: 84.0,
          abdomen: 85.0,
          treinosConcluidos: 5,
          gorduraCorporal: 13.61,
          fotoProgresso: true,
          observacoes: 'Início oficial da Operação 9%. Avaliação física com a nutricionista. Aposta valendo com a esposa!'
        }
      ]
    };
  }, [user?.operacao9Data]);

  const [showModal, setShowModal] = useState(false);
  const [selectedChartMetric, setSelectedChartMetric] = useState<'peso' | 'gorduraCorporal' | 'cintura' | 'abdomen'>('peso');
  const [editingCheckInId, setEditingCheckInId] = useState<string | null>(null);

  // Form State
  const [formSemana, setFormSemana] = useState<number>(operacaoState.checkIns.length + 1);
  const [formData, setFormData] = useState<string>(new Date().toISOString().split('T')[0]);
  const [formPeso, setFormPeso] = useState<string>('68.9');
  const [formCintura, setFormCintura] = useState<string>('84.0');
  const [formAbdomen, setFormAbdomen] = useState<string>('85.0');
  const [formTreinos, setFormTreinos] = useState<number>(5);
  const [formGordura, setFormGordura] = useState<string>('13.61');
  const [formFoto, setFormFoto] = useState<boolean>(true);
  const [formObs, setFormObs] = useState<string>('');

  // Calculations for Days & Progress
  const startDate = new Date('2026-07-20T00:00:00');
  const endDate = new Date('2026-10-18T00:00:00');
  const today = new Date();

  // Reset hours for accurate day calc
  today.setHours(0, 0, 0, 0);

  const totalDays = 90;
  const diffTime = today.getTime() - startDate.getTime();
  const daysPassedRaw = Math.floor(diffTime / (1000 * 3600 * 24));
  const daysPassed = Math.max(0, Math.min(totalDays, daysPassedRaw));
  const daysRemaining = Math.max(0, totalDays - daysPassed);
  const progressPercent = Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100)));

  // Latest check-in values
  const sortedCheckIns = [...operacaoState.checkIns].sort((a, b) => b.semana - a.semana);
  const latestCheckIn = sortedCheckIns[0] || {
    peso: operacaoState.pesoInicial,
    cintura: operacaoState.cinturaInicial,
    abdomen: operacaoState.abdomenInicial,
    gorduraCorporal: operacaoState.gorduraInicial,
    treinosConcluidos: 5,
    semana: 1,
    data: '2026-07-20'
  };

  const currentWeight = latestCheckIn.peso;
  const currentWaist = latestCheckIn.cintura;
  const currentAbdomen = latestCheckIn.abdomen;
  const currentBF = latestCheckIn.gorduraCorporal ?? operacaoState.gorduraInicial;

  // Deltas vs initial
  const deltaWeight = (currentWeight - operacaoState.pesoInicial).toFixed(1);
  const deltaWaist = (currentWaist - operacaoState.cinturaInicial).toFixed(1);
  const deltaAbdomen = (currentAbdomen - operacaoState.abdomenInicial).toFixed(1);
  const deltaBF = (currentBF - operacaoState.gorduraInicial).toFixed(2);
  const bfRemaining = Math.max(0, currentBF - operacaoState.metaGordura).toFixed(2);

  const handleOpenNewCheckIn = () => {
    setEditingCheckInId(null);
    const nextSemana = (sortedCheckIns[0]?.semana || 0) + 1;
    setFormSemana(nextSemana);
    setFormData(new Date().toISOString().split('T')[0]);
    setFormPeso(currentWeight.toString());
    setFormCintura(currentWaist.toString());
    setFormAbdomen(currentAbdomen.toString());
    setFormTreinos(5);
    setFormGordura(currentBF.toString());
    setFormFoto(true);
    setFormObs('');
    setShowModal(true);
  };

  const handleEditCheckIn = (item: Operacao9CheckIn) => {
    setEditingCheckInId(item.id);
    setFormSemana(item.semana);
    setFormData(item.data);
    setFormPeso(item.peso.toString());
    setFormCintura(item.cintura.toString());
    setFormAbdomen(item.abdomen.toString());
    setFormTreinos(item.treinosConcluidos);
    setFormGordura((item.gorduraCorporal ?? operacaoState.gorduraInicial).toString());
    setFormFoto(item.fotoProgresso);
    setFormObs(item.observacoes || '');
    setShowModal(true);
  };

  const handleSaveCheckIn = (e: React.FormEvent) => {
    e.preventDefault();

    const pesoNum = parseFloat(formPeso.replace(',', '.')) || currentWeight;
    const cinturaNum = parseFloat(formCintura.replace(',', '.')) || currentWaist;
    const abdomenNum = parseFloat(formAbdomen.replace(',', '.')) || currentAbdomen;
    const gorduraNum = parseFloat(formGordura.replace(',', '.')) || currentBF;

    const newEntry: Operacao9CheckIn = {
      id: editingCheckInId || `chk-${Date.now()}`,
      semana: formSemana,
      data: formData,
      peso: pesoNum,
      cintura: cinturaNum,
      abdomen: abdomenNum,
      treinosConcluidos: formTreinos,
      gorduraCorporal: gorduraNum,
      fotoProgresso: formFoto,
      observacoes: formObs.trim()
    };

    let updatedList: Operacao9CheckIn[] = [];
    if (editingCheckInId) {
      updatedList = operacaoState.checkIns.map(c => c.id === editingCheckInId ? newEntry : c);
    } else {
      updatedList = [...operacaoState.checkIns.filter(c => c.semana !== formSemana), newEntry];
    }

    updatedList.sort((a, b) => a.semana - b.semana);

    const newState: Operacao9State = {
      ...operacaoState,
      checkIns: updatedList
    };

    updateUserProfile({
      operacao9Data: newState
    });

    setShowModal(false);
    if (addToast) {
      addToast(`Check-in da Semana ${formSemana} registrado com sucesso! 🎉`, 'success');
    }
  };

  const handleDeleteCheckIn = (id: string, semana: number) => {
    if (operacaoState.checkIns.length <= 1) {
      if (addToast) addToast('Não é possível excluir o check-in inicial.', 'error');
      return;
    }

    const updatedList = operacaoState.checkIns.filter(c => c.id !== id);
    updateUserProfile({
      operacao9Data: {
        ...operacaoState,
        checkIns: updatedList
      }
    });

    if (addToast) {
      addToast(`Check-in da Semana ${semana} removido.`, 'info');
    }
  };

  // WhatsApp Summary Copy
  const handleCopyWhatsAppSummary = () => {
    const text = `🏆 *OPERAÇÃO 9% - RESUMO SEMANAL* 🏆
────────────────────────
📍 *Semana ${latestCheckIn.semana}* (${new Date(latestCheckIn.data).toLocaleDateString('pt-BR')})
⏳ *Contagem:* ${daysRemaining} dias restantes para a pesagem final (18/10/2026)

📊 *MEDIDAS ATUAIS:*
• Peso: *${currentWeight.toFixed(1)} kg* (Inicial: 68,9 kg | Δ ${deltaWeight} kg)
• Cintura: *${currentWaist} cm* (Inicial: 84 cm)
• Abdômen: *${currentAbdomen} cm* (Inicial: 85 cm)
• % Gordura Corporal: *${currentBF.toFixed(2)}%* (Meta: 9,00% | Falta: ${bfRemaining}%)

🏋️ *TREINOS NA SEMANA:* ${latestCheckIn.treinosConcluidos}/5 concluídos
📸 *Foto de Progresso:* ${latestCheckIn.fotoProgresso ? '✅ Realizada' : '❌ Não tirou'}
${latestCheckIn.observacoes ? `💬 *Obs:* ${latestCheckIn.observacoes}` : ''}

🎯 *Foco total até a avaliação da nutricionista!* 💪`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (addToast) addToast('Resumo da semana copiado! Cole no WhatsApp. 📲', 'success');
      }).catch(() => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      if (addToast) addToast('Resumo copiado para a área de transferência! 📲', 'success');
    } catch (err) {
      if (addToast) addToast('Erro ao copiar texto.', 'error');
    }
    document.body.removeChild(textArea);
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    return [...operacaoState.checkIns]
      .sort((a, b) => a.semana - b.semana)
      .map(c => ({
        semanaLabel: `Sem. ${c.semana}`,
        semana: c.semana,
        peso: c.peso,
        gorduraCorporal: c.gorduraCorporal ?? operacaoState.gorduraInicial,
        cintura: c.cintura,
        abdomen: c.abdomen,
        metaBF: 9.0
      }));
  }, [operacaoState.checkIns]);

  return (
    <div className="w-full min-h-screen bg-[#EEF1F7] text-[#1B2140] p-3 sm:p-5 pb-28 font-sans text-left">
      
      {/* HEADER / HERO CARD DE DESTAQUE */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#12225C] via-[#1A3882] to-[#2F5FDE] p-5 sm:p-7 shadow-xl mb-5 text-white">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-extrabold tracking-wide backdrop-blur-md">
                DESAFIO 90 DIAS
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-extrabold tracking-wide backdrop-blur-md">
                META 9.0% BF
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold">
                JUÍZA: NUTRICIONISTA
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Operação <span className="text-blue-200">9%</span>
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-xl">
              Desafio pessoal contra a esposa. Avaliação física e pesagem final no dia <strong className="text-white">18/10/2026</strong> pela nutricionista.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyWhatsAppSummary}
              className="px-4 py-3 bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs font-extrabold rounded-full shadow-sm flex items-center justify-center gap-2 transition-all border border-white/25 cursor-pointer"
            >
              <Share2 size={16} /> Compartilhar Resumo
            </button>

            <button
              onClick={handleOpenNewCheckIn}
              className="px-5 py-3 bg-white text-[#12225C] hover:bg-blue-50 active:scale-95 text-xs font-black rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus size={18} /> Novo Check-in
            </button>
          </div>
        </div>
      </div>

      {/* 1. COUNTDOWN & PROGRESS BAR CARD (CARD SECUNDÁRIO BRANCO) */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-zinc-200/80 mb-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#12225C]/10 text-[#12225C]">
              <Flame size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A8] block">
                CONTAGEM REGRESSIVA DOS 90 DIAS
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1B2140] tracking-tight">
                {daysRemaining} dias restantes <span className="text-[#2F5FDE] text-sm font-bold">({daysPassed}/90 dias)</span>
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-semibold text-[#8A93A8] block">Pesagem Final Oficial:</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#12225C]">18 de Outubro de 2026</span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#8A93A8]">
            <span>20/07 (Início)</span>
            <span className="text-[#2F5FDE] font-extrabold">{progressPercent}% do desafio concluído</span>
            <span>18/10 (Nutricionista)</span>
          </div>

          <div className="w-full h-3.5 bg-[#EEF1F7] rounded-full overflow-hidden p-0.5 relative">
            <div 
              className="h-full bg-gradient-to-r from-[#12225C] to-[#2F5FDE] rounded-full transition-all duration-700 relative"
              style={{ width: `${Math.max(2, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* GRID: GAUGE + STATS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        
        {/* 2. CIRCULAR GAUGE METER FOR BODY FAT % */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-zinc-200/80 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B2140]">
              <Target size={16} className="text-[#2F5FDE]" /> % Gordura Corporal
            </div>
            <span className="px-3 py-1 rounded-full bg-[#12225C]/10 text-[#12225C] font-extrabold text-xs">
              META: 9.0%
            </span>
          </div>

          {/* GAUGE SVG METER */}
          <div className="relative w-48 h-48 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#EEF1F7"
                strokeWidth="9"
                fill="transparent"
              />
              {/* Target Zone Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#2F5FDE"
                strokeWidth="9"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * 0.09)}
                strokeLinecap="round"
                fill="transparent"
                className="opacity-25"
              />
              {/* Current Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#12225C"
                strokeWidth="9"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * (Math.min(25, currentBF) / 25))}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Center Gauge Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold uppercase text-[#8A93A8]">ATUAL EST.</span>
              <span className="text-3xl font-extrabold text-[#1B2140] leading-none tracking-tight">
                {currentBF.toFixed(2)}<span className="text-sm font-bold text-[#2F5FDE]">%</span>
              </span>
              <span className="text-xs font-bold text-[#12225C] mt-1">
                Falta {bfRemaining}% BF
              </span>
            </div>
          </div>

          <div className="w-full p-3 rounded-2xl bg-[#EEF1F7] border border-zinc-200/60 flex items-center justify-around text-center">
            <div>
              <span className="text-[10px] font-bold text-[#8A93A8] uppercase block">INICIAL</span>
              <span className="text-xs font-extrabold text-[#1B2140]">{operacaoState.gorduraInicial}%</span>
            </div>
            <div className="h-6 w-px bg-zinc-300" />
            <div>
              <span className="text-[10px] font-bold text-[#8A93A8] uppercase block">EVOLUÇÃO</span>
              <span className={`text-xs font-extrabold ${parseFloat(deltaBF) <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {parseFloat(deltaBF) <= 0 ? `${deltaBF}%` : `+${deltaBF}%`}
              </span>
            </div>
            <div className="h-6 w-px bg-zinc-300" />
            <div>
              <span className="text-[10px] font-bold text-[#8A93A8] uppercase block">META</span>
              <span className="text-xs font-extrabold text-[#2F5FDE]">9.00%</span>
            </div>
          </div>
        </div>

        {/* 3. STATS CARDS (GRID OF 4 CARDS SECUNDÁRIOS) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* PESO ATUAL */}
          <div className="bg-white rounded-[24px] p-4 sm:p-5 shadow-sm border border-zinc-200/80 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#1B2140] flex items-center gap-1.5">
                <Scale size={16} className="text-[#2F5FDE]" /> Peso Atual
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF1F7] text-[#8A93A8]">
                Início: {operacaoState.pesoInicial}kg
              </span>
            </div>

            <div className="my-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2140] tracking-tight">
                {currentWeight.toFixed(1)} <span className="text-sm font-semibold text-[#8A93A8]">kg</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 font-semibold">
              <span className="text-[#8A93A8]">Variação:</span>
              <span className={`font-extrabold ${parseFloat(deltaWeight) <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {parseFloat(deltaWeight) <= 0 ? `${deltaWeight} kg` : `+${deltaWeight} kg`}
              </span>
            </div>
          </div>

          {/* CINTURA */}
          <div className="bg-white rounded-[24px] p-4 sm:p-5 shadow-sm border border-zinc-200/80 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#1B2140] flex items-center gap-1.5">
                <Ruler size={16} className="text-[#12225C]" /> Cintura
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF1F7] text-[#8A93A8]">
                Início: {operacaoState.cinturaInicial}cm
              </span>
            </div>

            <div className="my-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2140] tracking-tight">
                {currentWaist} <span className="text-sm font-semibold text-[#8A93A8]">cm</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 font-semibold">
              <span className="text-[#8A93A8]">Variação:</span>
              <span className={`font-extrabold ${parseFloat(deltaWaist) <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {parseFloat(deltaWaist) <= 0 ? `${deltaWaist} cm` : `+${deltaWaist} cm`}
              </span>
            </div>
          </div>

          {/* ABDÔMEN */}
          <div className="bg-white rounded-[24px] p-4 sm:p-5 shadow-sm border border-zinc-200/80 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#1B2140] flex items-center gap-1.5">
                <Ruler size={16} className="text-teal-600" /> Abdômen
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF1F7] text-[#8A93A8]">
                Início: {operacaoState.abdomenInicial}cm
              </span>
            </div>

            <div className="my-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2140] tracking-tight">
                {currentAbdomen} <span className="text-sm font-semibold text-[#8A93A8]">cm</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 font-semibold">
              <span className="text-[#8A93A8]">Variação:</span>
              <span className={`font-extrabold ${parseFloat(deltaAbdomen) <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {parseFloat(deltaAbdomen) <= 0 ? `${deltaAbdomen} cm` : `+${deltaAbdomen} cm`}
              </span>
            </div>
          </div>

          {/* TREINOS CONCLUÍDOS NA SEMANA */}
          <div className="bg-white rounded-[24px] p-4 sm:p-5 shadow-sm border border-zinc-200/80 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#1B2140] flex items-center gap-1.5">
                <Dumbbell size={16} className="text-[#2F5FDE]" /> Treinos
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F5FDE]/10 text-[#2F5FDE]">
                Meta: 5x
              </span>
            </div>

            <div className="my-3 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2140] tracking-tight">
                {latestCheckIn.treinosConcluidos}
              </span>
              <span className="text-lg font-bold text-[#8A93A8]">/ 5</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 font-semibold">
              <span className="text-[#8A93A8]">Aproveitamento:</span>
              <span className="font-extrabold text-emerald-600">
                {Math.round((latestCheckIn.treinosConcluidos / 5) * 100)}%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. EVOLUTION CHART (CARD SECUNDÁRIO BRANCO) */}
      <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm border border-zinc-200/80 mb-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A8] block">
              ACOMPANHAMENTO GRÁFICO
            </span>
            <h3 className="text-lg font-extrabold text-[#1B2140] tracking-tight">
              Evolução ao Longo das Semanas
            </h3>
          </div>

          {/* Chart Metric Selector Pills */}
          <div className="flex items-center gap-1 bg-[#EEF1F7] p-1 rounded-full border border-zinc-200/60 overflow-x-auto">
            <button
              onClick={() => setSelectedChartMetric('peso')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedChartMetric === 'peso' ? 'bg-[#12225C] text-white shadow-sm' : 'text-[#8A93A8] hover:text-[#1B2140]'
              }`}
            >
              Peso (kg)
            </button>
            <button
              onClick={() => setSelectedChartMetric('gorduraCorporal')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedChartMetric === 'gorduraCorporal' ? 'bg-[#2F5FDE] text-white shadow-sm' : 'text-[#8A93A8] hover:text-[#1B2140]'
              }`}
            >
              % BF
            </button>
            <button
              onClick={() => setSelectedChartMetric('cintura')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedChartMetric === 'cintura' ? 'bg-teal-600 text-white shadow-sm' : 'text-[#8A93A8] hover:text-[#1B2140]'
              }`}
            >
              Cintura (cm)
            </button>
            <button
              onClick={() => setSelectedChartMetric('abdomen')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedChartMetric === 'abdomen' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#8A93A8] hover:text-[#1B2140]'
              }`}
            >
              Abdômen (cm)
            </button>
          </div>
        </div>

        {/* CHART CONTAINER */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F7" vertical={false} />
              <XAxis dataKey="semanaLabel" stroke="#8A93A8" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A93A8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  borderColor: '#E5E7EB', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  color: '#1B2140',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }} 
              />
              {selectedChartMetric === 'gorduraCorporal' && (
                <ReferenceLine y={9.0} label={{ value: 'META 9%', fill: '#2F5FDE', fontSize: 10, fontWeight: 'bold', position: 'top' }} stroke="#2F5FDE" strokeDasharray="4 4" />
              )}
              <Line 
                type="monotone" 
                dataKey={selectedChartMetric} 
                stroke={
                  selectedChartMetric === 'peso' ? '#12225C' :
                  selectedChartMetric === 'gorduraCorporal' ? '#2F5FDE' :
                  selectedChartMetric === 'cintura' ? '#0D9488' : '#2563EB'
                } 
                strokeWidth={3} 
                dot={{ fill: '#FFFFFF', stroke: '#12225C', strokeWidth: 3, r: 5 }} 
                activeDot={{ r: 7, stroke: '#2F5FDE', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. HISTORY OF PREVIOUS WEEKS */}
      <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm border border-zinc-200/80 mb-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A8] block">
              HISTÓRICO COMPLETO
            </span>
            <h3 className="text-lg font-extrabold text-[#1B2140] tracking-tight">
              Registros Semanais ({operacaoState.checkIns.length})
            </h3>
          </div>

          <button
            onClick={handleOpenNewCheckIn}
            className="px-4 py-2 bg-[#12225C]/10 hover:bg-[#12225C]/20 text-[#12225C] rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={15} /> Registrar Semana
          </button>
        </div>

        <div className="space-y-3">
          {sortedCheckIns.map((item) => (
            <div 
              key={item.id}
              className="p-4 rounded-[20px] bg-[#EEF1F7] border border-zinc-200/60 hover:border-zinc-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-left"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#12225C] text-white text-xs font-extrabold">
                    Semana {item.semana}
                  </span>
                  <span className="text-xs font-semibold text-[#8A93A8]">
                    {new Date(item.data).toLocaleDateString('pt-BR')}
                  </span>
                  {item.fotoProgresso ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                      <Camera size={12} /> Foto OK
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-500 text-[11px] font-medium">
                      Sem foto
                    </span>
                  )}
                </div>

                {/* Metrics Badges */}
                <div className="flex items-center gap-3 text-xs font-bold text-[#1B2140] flex-wrap pt-0.5">
                  <span>Peso: <strong className="text-[#12225C] font-extrabold">{item.peso} kg</strong></span>
                  <span className="text-zinc-300">•</span>
                  <span>Cintura: <strong>{item.cintura} cm</strong></span>
                  <span className="text-zinc-300">•</span>
                  <span>Abdômen: <strong>{item.abdomen} cm</strong></span>
                  <span className="text-zinc-300">•</span>
                  <span>Treinos: <strong className="text-emerald-600">{item.treinosConcluidos}/5</strong></span>
                  {item.gorduraCorporal && (
                    <>
                      <span className="text-zinc-300">•</span>
                      <span>% BF: <strong className="text-[#2F5FDE] font-extrabold">{item.gorduraCorporal}%</strong></span>
                    </>
                  )}
                </div>

                {item.observacoes && (
                  <p className="text-xs text-[#8A93A8] italic bg-white p-2.5 rounded-xl border border-zinc-200/50">
                    "{item.observacoes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleEditCheckIn(item)}
                  className="p-2 rounded-full bg-white hover:bg-zinc-100 text-[#1B2140] border border-zinc-200 shadow-sm transition-colors cursor-pointer"
                  title="Editar check-in"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => handleDeleteCheckIn(item.id, item.semana)}
                  className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-sm transition-colors cursor-pointer"
                  title="Excluir check-in"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MODAL FOR CHECK-IN FORM */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm animate-fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 rounded-[28px] w-full max-w-md p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar text-left"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-[#12225C]/10 text-[#12225C]">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#1B2140]">
                      {editingCheckInId ? 'Editar Check-in Semanal' : 'Novo Check-in Semanal'}
                    </h3>
                    <p className="text-xs text-[#8A93A8]">Operação 9% • Desafio 90 Dias</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowModal(false)}
                  className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-full hover:bg-zinc-100 transition-all cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCheckIn} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#1B2140] block mb-1">
                      Semana nº
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={13}
                      value={formSemana}
                      onChange={(e) => setFormSemana(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1B2140] focus:border-[#2F5FDE] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1B2140] block mb-1">
                      Data do Check-in
                    </label>
                    <input
                      type="date"
                      value={formData}
                      onChange={(e) => setFormData(e.target.value)}
                      className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1B2140] focus:border-[#2F5FDE] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#1B2140] block mb-1">
                      Peso Atual (kg)
                    </label>
                    <input
                      type="text"
                      placeholder="68.9"
                      value={formPeso}
                      onChange={(e) => setFormPeso(e.target.value)}
                      className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1B2140] focus:border-[#2F5FDE] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1B2140] block mb-1">
                      Cintura (cm)
                    </label>
                    <input
                      type="text"
                      placeholder="84.0"
                      value={formCintura}
                      onChange={(e) => setFormCintura(e.target.value)}
                      className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1B2140] focus:border-[#2F5FDE] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#1B2140] block mb-1">
                      Abdômen (cm)
                    </label>
                    <input
                      type="text"
                      placeholder="85.0"
                      value={formAbdomen}
                      onChange={(e) => setFormAbdomen(e.target.value)}
                      className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1B2140] focus:border-[#2F5FDE] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1B2140] block mb-1">
                      % Gordura Corporal
                    </label>
                    <input
                      type="text"
                      placeholder="13.61"
                      value={formGordura}
                      onChange={(e) => setFormGordura(e.target.value)}
                      className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#2F5FDE] focus:border-[#2F5FDE] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Treinos Concluídos Selector */}
                <div>
                  <label className="text-xs font-bold text-[#1B2140] block mb-1.5">
                    Treinos Concluídos na Semana (0 a 5)
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setFormTreinos(num)}
                        className={`py-2 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
                          formTreinos === num 
                            ? 'bg-[#12225C] text-white border-[#12225C] shadow-md' 
                            : 'bg-[#EEF1F7] text-[#8A93A8] border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Foto Progresso Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EEF1F7] border border-zinc-200/60">
                  <div className="flex items-center gap-2">
                    <Camera size={18} className="text-[#2F5FDE]" />
                    <span className="text-xs font-bold text-[#1B2140]">Tirou foto de progresso?</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormFoto(!formFoto)}
                    className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      formFoto 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    {formFoto ? 'Sim ✓' : 'Não ✕'}
                  </button>
                </div>

                {/* Observações */}
                <div>
                  <label className="text-xs font-bold text-[#1B2140] block mb-1">
                    Observações / Sensações
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Como foi a alimentação, disposição nos treinos, ingestão de água..."
                    value={formObs}
                    onChange={(e) => setFormObs(e.target.value)}
                    className="w-full bg-[#EEF1F7] border border-zinc-200 rounded-xl p-3 text-xs font-medium text-[#1B2140] focus:border-[#2F5FDE] focus:bg-white outline-none resize-none transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-[#1B2140] rounded-full text-xs font-bold cursor-pointer transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#12225C] to-[#2F5FDE] hover:opacity-95 text-white rounded-full text-xs font-black shadow-md cursor-pointer transition-all"
                  >
                    Salvar Check-in
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

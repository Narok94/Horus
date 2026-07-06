import React from 'react';
import { motion } from 'motion/react';
import { Target, ExternalLink, Trophy } from 'lucide-react';
import { useStore } from '../../store';
import { AppTab } from '../../types';

export const DesafioView: React.FC = () => {
  const { user, setActiveTab } = useStore();
  const isTeste1 = user?.username.toLowerCase() === 'teste1';

  const handleRedirect = () => {
    if (typeof window !== 'undefined') {
      window.open('https://desafio90d.vercel.app', '_blank', 'noopener,noreferrer');
    }
  };

  const accentColor = isTeste1 ? '#2563EB' : 'var(--accent-color)';

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 py-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full max-w-md p-8 rounded-[2rem] border text-center relative overflow-hidden flex flex-col items-center justify-between transition-all duration-300 ${
          isTeste1 
            ? 'bg-white text-zinc-800 border-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)]' 
            : 'bg-[#0E0E12] text-white border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Subtle glowing accent gradient in background */}
        {!isTeste1 && (
          <div 
            className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />
        )}

        <div className="flex flex-col items-center mt-4">
          {/* Glowing/Styled Icon container */}
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 relative transition-all duration-300 ${
              isTeste1 
                ? 'bg-blue-50 text-blue-600' 
                : 'bg-accent/10 text-accent border border-accent/20'
            }`}
          >
            {!isTeste1 && (
              <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-75 pointer-events-none" />
            )}
            <Target size={38} className="relative z-10" />
          </div>

          <span className="text-accent text-[8.5px] font-black tracking-[0.25em] uppercase font-mono mb-2">
            CONEXÃO EXTERNA ⚡ DESAFIO 90 DIAS
          </span>

          <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug font-sans uppercase italic ${
            isTeste1 ? 'text-zinc-900' : 'text-white'
          }`}>
            Indo para o Desafio 90!
          </h2>

          <p className={`text-[12px] sm:text-[13px] font-medium leading-relaxed mt-4 max-w-xs ${
            isTeste1 ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            Você será redirecionado para o aplicativo independente do desafio de 90 dias em uma nova janela.
          </p>
        </div>

        <div className="w-full space-y-3 mt-8">
          {/* Main Redirect Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRedirect}
            className={`w-full h-12 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              isTeste1 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-accent text-zinc-950 hover:brightness-110 shadow-accent/25'
            }`}
          >
            <span>Continuar</span>
            <ExternalLink size={14} strokeWidth={2.5} />
          </motion.button>

          {/* Go back button */}
          <button
            onClick={() => setActiveTab(AppTab.DASHBOARD)}
            className={`w-full py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all bg-transparent cursor-pointer border ${
              isTeste1 
                ? 'text-zinc-500 hover:text-zinc-800 border-zinc-200 hover:bg-zinc-50' 
                : 'text-zinc-400 hover:text-white border-white/5 hover:bg-white/[0.02]'
            }`}
          >
            Voltar para o App
          </button>
        </div>
      </motion.div>
    </div>
  );
};

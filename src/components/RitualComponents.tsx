import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Snowflake, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RitualHeaderProps {
  isWinter: boolean;
  timeOfDay: 'morning' | 'night';
}

export const RitualHeader: React.FC<RitualHeaderProps> = ({ isWinter, timeOfDay }) => {
  const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="fixed top-0 w-full z-50 bg-white/60 dark:bg-stone-900/60 backdrop-blur-[40px] border-b border-white/40 dark:border-stone-800/40 h-16 flex justify-between items-center px-6">
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="w-5 h-5" />
        <h1 className="text-xl font-display tracking-[0.2em] uppercase font-bold">Luz de Cádiz</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="font-mono text-[9px] tracking-widest text-primary/60 uppercase">{currentTime} | Golden Hour</span>
          <span className="font-mono text-[9px] tracking-widest text-primary/40 uppercase">Cádiz, ES</span>
        </div>

        <motion.div 
          layout
          className={cn(
            "flex items-center px-3 py-1.5 rounded-full shadow-md gap-2 cursor-pointer",
            isWinter ? "bg-gradient-to-r from-blue-100 to-white text-blue-900" : "bg-gradient-to-r from-primary-container to-orange-200 text-primary"
          )}
        >
          {isWinter ? <Snowflake className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold">
            {isWinter ? 'Invierno' : 'Verano'} / {timeOfDay === 'morning' ? 'Mañana' : 'Noche'}
          </span>
        </motion.div>
      </div>
    </header>
  );
};

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ y: -2, scale: 1.005 }}
      className={cn("premium-glass rim-light squircle p-4 relative group overflow-hidden", className)}
    >
      {/* Dynamic Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      {children}
    </motion.div>
  );
};

interface RoutineStepProps {
  step: {
    stepNumber: number;
    title: string;
    product: string;
    notes?: string;
    category: string;
  };
  delay?: number;
}

export const RoutineStep: React.FC<RoutineStepProps> = ({ step, delay }) => {
  return (
    <GlassCard delay={delay} className="flex flex-col gap-2">
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary/40 leading-none">
            PASO {step.stepNumber.toString().padStart(2, '0')} — {step.category.toUpperCase()}
          </p>
          <span className="text-[8px] font-mono text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
            {step.title.toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-on-surface">{step.product}</h3>
        {step.notes && (
          <p className="text-xs text-on-surface-variant font-light leading-relaxed">{step.notes}</p>
        )}
      </div>
    </GlassCard>
  );
};

export const BottomNav: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'ritual', label: 'Ritual', icon: Sparkles },
    { id: 'calendar', label: 'Calendario', icon: Sun },
    { id: 'tips', label: 'Consejos', icon: Snowflake },
  ];

  return (
    <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 flex justify-around items-center py-2 px-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[40px] rounded-2xl border border-white/40 dark:border-slate-800/40 shadow-[0_5px_20px_rgba(0,0,0,0.1)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-300",
              isActive ? "text-primary scale-105 font-bold" : "text-stone-400 opacity-60 hover:text-primary hover:opacity-100"
            )}
          >
            <Icon className={cn("w-5 h-5 mb-0.5", isActive && "fill-current")} />
            <span className="font-mono text-[9px] tracking-[0.05em] uppercase">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Snowflake, Sparkles, Wind } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  isSpecial?: boolean;
}

export const RoutineStep: React.FC<RoutineStepProps> = ({ step, delay, isSpecial }) => {
  return (
    <GlassCard delay={delay} className={cn("flex flex-col gap-2", isSpecial && "special-treatment-glow")}>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary/40 leading-none">
            PASO {step.stepNumber.toString().padStart(2, '0')} — {step.category.toUpperCase()}
          </p>
          <span className="text-[8px] font-mono text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
            {step.title.toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-display font-bold tracking-tight text-on-surface">{step.product}</h3>
        {step.notes && (
          <p className="text-xs text-on-surface-variant font-extralight leading-relaxed">{step.notes}</p>
        )}
      </div>
    </GlassCard>
  );
};

export const BottomNav: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'ritual', label: 'Ritual', icon: Sparkles },
    { id: 'atmosphere', label: 'Atmósfera', icon: Wind },
    { id: 'calendar', label: 'Calendario', icon: Sun },
    { id: 'tips', label: 'Consejos', icon: Snowflake },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-auto min-w-[320px] max-w-sm z-50 flex justify-center items-center gap-1 py-2 px-3 bg-white/5 dark:bg-stone-950/20 backdrop-blur-3xl rounded-full border border-white/10 dark:border-white/5 shadow-2xl shadow-black/20">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center justify-center py-1.5 px-5 transition-all duration-500"
          >
            {/* Burbuja activa más minimalista con física orgánica */}
            {isActive && (
              <>
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full"
                  transition={{ 
                    type: "spring", 
                    stiffness: 380, 
                    damping: 30,
                    mass: 1,
                    restDelta: 0.001
                  }}
                />
                {/* Spotlight Glow detrás del icono */}
                <motion.div
                  layoutId="activeTabSpotlight"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 blur-xl rounded-full z-0"
                  transition={{ 
                    type: "spring", 
                    stiffness: 380, 
                    damping: 30,
                    mass: 1
                  }}
                />
              </>
            )}
            
            <Icon 
              className={`w-4 h-4 mb-1 z-10 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-stone-500 opacity-50'}`} 
              strokeWidth={1.2}
            />
            <span className={cn(
              "font-mono text-[7px] tracking-[0.3em] uppercase transition-all duration-300 z-10",
              isActive 
                ? "text-primary font-bold opacity-100" 
                : "text-stone-500 font-medium opacity-40"
            )}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

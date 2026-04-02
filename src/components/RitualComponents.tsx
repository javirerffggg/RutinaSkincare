import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Snowflake, Sparkles, Wind, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
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
  uvIndex?: number;
}

export const RoutineStep: React.FC<RoutineStepProps> = ({ step, delay, isSpecial, uvIndex }) => {
  return (
    <GlassCard delay={delay} className={cn("flex flex-col gap-2", isSpecial && "special-treatment-glow", step.category === 'Cabello' && "border-indigo-500/20")}>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <p className={cn(
            "text-[9px] font-bold tracking-[0.2em] uppercase leading-none",
            step.category === 'Cabello' ? "text-indigo-500/60" : "text-primary/40"
          )}>
            PASO {step.stepNumber.toString().padStart(2, '0')} — {step.category.toUpperCase()}
          </p>
          <div className="flex gap-2">
            {step.category === 'Protección' && uvIndex !== undefined && (
              <span className="text-[8px] font-mono text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Sun className="w-2 h-2" /> UV {uvIndex.toFixed(1)}
              </span>
            )}
            {step.category === 'Cabello' && (
              <span className="text-[8px] font-mono text-indigo-600 bg-indigo-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Zap className="w-2 h-2" /> CAPILAR
              </span>
            )}
            <span className={cn(
              "text-[8px] font-mono px-1.5 py-0.5 rounded",
              step.category === 'Cabello' ? "text-indigo-500/70 bg-indigo-500/10" : "text-primary/70 bg-primary/10"
            )}>
              {step.title.toUpperCase()}
            </span>
          </div>
        </div>
        <h3 className="text-lg font-display font-bold tracking-tight text-on-surface">{step.product}</h3>
        {step.notes && (
          <p className="text-xs text-on-surface-variant font-extralight leading-relaxed">{step.notes}</p>
        )}
      </div>
    </GlassCard>
  );
};

export const SkeletonCard: React.FC<{ className?: string; delay?: number }> = ({ className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("premium-glass rim-light squircle p-6 relative overflow-hidden h-40", className)}
    >
      <div className="space-y-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 animate-pulse" />
        <div className="space-y-2">
          <div className="w-16 h-2 bg-primary/5 rounded animate-pulse" />
          <div className="w-32 h-8 bg-primary/10 rounded animate-pulse" />
        </div>
        <div className="w-full h-12 bg-primary/5 rounded-lg animate-pulse mt-4" />
      </div>
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
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
    <nav className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] left-1/2 -translate-x-1/2 w-auto min-w-[340px] max-w-[90vw] z-50 flex justify-center items-center gap-1 py-3 px-4 bg-white/10 dark:bg-black/40 backdrop-blur-[40px] rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5 overflow-hidden">
      {/* Liquid Glass Satin Layer & Specular Edge */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center justify-center py-1.5 px-5 transition-all duration-500 group outline-none"
          >
            {/* Liquid Interaction Indicator */}
            {isActive && (
              <>
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-2xl"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35,
                    mass: 0.8
                  }}
                />
                {/* Specular Highlight on the indicator */}
                <motion.div
                  layoutId="activeTabHighlight"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35
                  }}
                />
                {/* Organic Glow */}
                <motion.div
                  layoutId="activeTabSpotlight"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary/30 blur-2xl rounded-full z-0"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35
                  }}
                />
              </>
            )}
            
            <motion.div
              animate={{ 
                scale: isActive ? 1.15 : 1,
                y: isActive ? -2 : 0
              }}
              whileTap={{ scale: 0.9, y: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="relative z-10"
            >
              <Icon 
                className={cn(
                  "w-4 h-4 mb-1 transition-colors duration-300",
                  isActive ? 'text-primary' : 'text-stone-500 opacity-60 group-hover:opacity-100'
                )} 
                strokeWidth={isActive ? 1.8 : 1.2}
              />
            </motion.div>
            
            <span className={cn(
              "font-mono text-[7px] tracking-[0.3em] uppercase transition-all duration-300 z-10 relative",
              isActive 
                ? "text-primary font-bold opacity-100 translate-y-[-1px]" 
                : "text-stone-500 font-medium opacity-50 group-hover:opacity-80"
            )}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Droplets, CheckCircle2 } from 'lucide-react';
import { GlassCard, cn } from './RitualComponents';
import { WEEKLY_ROUTINE, DayOfWeek } from '../constants';
import { WeatherData } from '../hooks/useWeather';

interface CalendarTabProps {
  completedRoutines: Record<string, { morning: boolean; night: boolean }>;
  dailyFeelings: Record<string, string>;
  toggleCompletion: (day: string, type: 'morning' | 'night') => void;
  setFeeling: (day: string, feeling: string) => void;
  currentDay: DayOfWeek;
  weatherData: WeatherData;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  completedRoutines,
  dailyFeelings,
  toggleCompletion,
  setFeeling,
  currentDay,
  weatherData
}) => {
  const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  const totalRoutines: number = days.length * 2;
  const completedCount: number = Object.values(completedRoutines).reduce<number>((acc, curr: any) => {
    return acc + (curr.morning ? 1 : 0) + (curr.night ? 1 : 0);
  }, 0);
  const progress: number = (completedCount / totalRoutines) * 100;

  const sunscreenMorningCompletions = Object.values(completedRoutines).filter((d: any) => d.morning).length;
  const sunscreenCapacity = 30;
  const sunscreenRemaining = Math.max(0, 100 - (sunscreenMorningCompletions / sunscreenCapacity) * 100);

  const specialDays = ['Miércoles', 'Sábado'];
  const consecutiveCycles = days.reduce((acc, day) => {
    if (specialDays.includes(day)) {
      if (completedRoutines[day]?.night) {
        return acc + 1;
      } else {
        // If it's a special day and it's NOT completed, we don't necessarily reset 
        // if it's in the future, but if it's in the past, it should break the streak.
        // For simplicity, let's just count how many special days are completed in the current week.
        return acc;
      }
    }
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      <header className="mb-4 space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
            Calendario de <br/><span className="italic font-light opacity-80">Renovación</span>
          </h2>
          <p className="text-on-surface-variant max-w-md text-sm leading-relaxed font-light">
            Siga su ritual diario diseñado para la luminosidad del Atlántico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-primary/60">Progreso Semanal</span>
              <span className="text-[10px] font-display italic text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-primary/60">Estimación: Protector Solar</span>
              <span className="text-[10px] font-display italic text-primary">{Math.round(sunscreenRemaining)}%</span>
            </div>
            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${sunscreenRemaining}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-primary/60">Ciclos de Renovación</span>
              <span className="text-[10px] font-display italic text-primary">{consecutiveCycles} / 2</span>
            </div>
            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(consecutiveCycles / 2) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-4">
        {days.map((day, index) => {
          const routine = WEEKLY_ROUTINE[day];
          const isToday = day === currentDay;
          const isSpecial = day === 'Miércoles' || day === 'Sábado';
          const dayCompletions = completedRoutines[day] || { morning: false, night: false };
          const dayFeeling = dailyFeelings[day];
          const dayWeather = weatherData?.dailyForecast.find(f => f.day === day);

          return (
            <GlassCard 
              key={day} 
              delay={index * 0.03} 
              className={cn(
                "p-4 md:p-6 transition-all duration-500",
                isToday && "ring-1 ring-primary/30 bg-primary/[0.03] scale-[1.02] z-20 shadow-umbra",
                isSpecial && "special-treatment-glow"
              )}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className={cn("text-xl font-display", isToday ? "text-primary font-bold" : "text-primary/80")}>
                        {day}
                      </h3>
                      {isToday && (
                        <span className="text-[7px] font-mono bg-primary text-white px-1.5 py-0.5 rounded-full uppercase tracking-widest">Hoy</span>
                      )}
                      {dayWeather && (
                        <div className="flex items-center gap-2 ml-2 opacity-60">
                          <div className="flex items-center gap-0.5">
                            <Sun className="w-2.5 h-2.5" />
                            <span className="text-[8px] font-mono">{dayWeather.uv}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Droplets className="w-2.5 h-2.5" />
                            <span className="text-[8px] font-mono">{dayWeather.humidity}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="font-mono text-[8px] tracking-widest text-stone-400 uppercase">
                      {isSpecial ? 'Tratamiento Especial (AHA)' : 'Hidratación Base'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1 rounded-full">
                    {['✨', '💧', '☁️', '🌙'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => setFeeling(day, emoji)}
                        className={cn(
                          "w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all",
                          dayFeeling === emoji ? "bg-white dark:bg-stone-800 shadow-sm scale-110" : "opacity-30 hover:opacity-100"
                        )}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary/60">
                        <Sun className="w-3 h-3" strokeWidth={1.2} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Mañana</span>
                      </div>
                      <button 
                        onClick={() => toggleCompletion(day, 'morning')}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all",
                          dayCompletions.morning 
                            ? "bg-primary/10 border-primary/20 text-primary" 
                            : "border-stone-200 dark:border-white/10 text-stone-400 hover:border-primary/30"
                        )}
                      >
                        <CheckCircle2 className={cn("w-3 h-3", dayCompletions.morning ? "opacity-100" : "opacity-30")} />
                        <span className="text-[8px] font-mono uppercase tracking-wider">
                          {dayCompletions.morning ? 'Completado' : 'Marcar'}
                        </span>
                      </button>
                    </div>
                    <div className="space-y-1.5 pl-5 border-l border-primary/10">
                      {routine.morning.map(s => (
                        <div key={s.id} className="text-[11px] text-on-surface-variant font-light flex items-start gap-2">
                          <span className="opacity-30">•</span>
                          <span>{s.product}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary/60">
                        <Moon className="w-3 h-3" strokeWidth={1.2} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Noche</span>
                      </div>
                      <button 
                        onClick={() => toggleCompletion(day, 'night')}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all",
                          dayCompletions.night 
                            ? "bg-primary/10 border-primary/20 text-primary" 
                            : "border-stone-200 dark:border-white/10 text-stone-400 hover:border-primary/30"
                        )}
                      >
                        <CheckCircle2 className={cn("w-3 h-3", dayCompletions.night ? "opacity-100" : "opacity-30")} />
                        <span className="text-[8px] font-mono uppercase tracking-wider">
                          {dayCompletions.night ? 'Completado' : 'Marcar'}
                        </span>
                      </button>
                    </div>
                    <div className="space-y-1.5 pl-5 border-l border-primary/10">
                      {routine.night.map(s => (
                        <div key={s.id} className="text-[11px] text-on-surface-variant font-light flex items-start gap-2">
                          <span className="opacity-30">•</span>
                          <span>{s.product}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEEKLY_ROUTINE, GOLDEN_REMINDERS, DayOfWeek } from './constants';
import { RitualHeader, RoutineStep, BottomNav, GlassCard } from './components/RitualComponents';
import { Sparkles, Sun, Moon, Snowflake, Info, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('ritual');
  const [isWinter, setIsWinter] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'night'>('morning');
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Lunes');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const dayIndex = (now.getDay() + 6) % 7; // Convert 0-6 (Sun-Sat) to 0-6 (Mon-Sun)
    const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    setCurrentDay(days[dayIndex]);
    const isNight = hours < 6 || hours >= 18;
    setTimeOfDay(isNight ? 'night' : 'morning');
    
    if (isNight) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Simple winter/summer logic (Winter: Nov-Apr, Summer: May-Oct)
    const month = now.getMonth();
    setIsWinter(month < 4 || month > 9);
  }, []);

  const currentRoutine = useMemo(() => {
    return WEEKLY_ROUTINE[currentDay][timeOfDay];
  }, [currentDay, timeOfDay]);

  const renderRitual = () => (
    <div className="space-y-4">
      <header className="mb-4 space-y-1">
        <div className="flex justify-between items-start">
          <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
            Hoy — <br/><span className="italic font-light opacity-80">Tu Ritual</span>
          </h2>
        </div>
      </header>

      <div className="space-y-3">
        {currentRoutine.map((step, index) => (
          <RoutineStep key={step.id} step={step} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-4">
      <header className="mb-4 space-y-1">
        <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
          Calendario de <br/><span className="italic font-light opacity-80">Renovación</span>
        </h2>
        <p className="text-on-surface-variant max-w-md text-sm leading-relaxed font-light">
          Siga su ritual diario diseñado para la luminosidad del Atlántico.
        </p>
      </header>

      <div className="grid gap-3">
        {Object.entries(WEEKLY_ROUTINE).map(([day, routine], index) => (
          <GlassCard key={day} delay={index * 0.03} className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="text-xl font-display text-primary">{day}</h3>
                <p className="font-mono text-[8px] tracking-widest text-stone-400 uppercase">
                  {day === 'Miércoles' || day === 'Sábado' ? 'Tratamiento Especial' : 'Hidratación Base'}
                </p>
              </div>
              <div className="flex-1 max-w-xl space-y-2">
                <div className="flex items-center gap-2 text-primary/60">
                  <Sun className="w-3 h-3" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Mañana</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {routine.morning.map(s => (
                    <div key={s.id} className="text-[11px] text-on-surface-variant font-light">• {s.product}</div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary/60 pt-1">
                  <Moon className="w-3 h-3" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Noche</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {routine.night.map(s => (
                    <div key={s.id} className="text-[11px] text-on-surface-variant font-light">• {s.product}</div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderTips = () => (
    <div className="space-y-4">
      <header className="mb-4 space-y-1">
        <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
          Consejos de <br/><span className="italic font-light opacity-80">Oro</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed font-light">
          Descubra los pilares fundamentales del ritual. Principios atemporales diseñados para preservar la luz natural de su piel.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {GOLDEN_REMINDERS.map((reminder, index) => (
          <GlassCard key={index} delay={index * 0.05} className="flex flex-col justify-between p-4">
            <div className="mb-3 w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <p className="text-on-surface-variant leading-relaxed text-sm font-light">
              {reminder}
            </p>
            <div className="mt-4 flex justify-end">
              <CheckCircle2 className="w-4 h-4 text-primary/20" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mesh-gradient relative">
      <div className="grain-overlay" />
      
      <RitualHeader isWinter={isWinter} timeOfDay={timeOfDay} />

      <main className="pt-20 pb-24 px-6 max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {activeTab === 'ritual' && renderRitual()}
            {activeTab === 'calendar' && renderCalendar()}
            {activeTab === 'tips' && renderTips()}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-8 mb-8 flex flex-col items-center gap-2 opacity-30">
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase">The Digital Alchemist v2.5</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-primary to-transparent" />
        </footer>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

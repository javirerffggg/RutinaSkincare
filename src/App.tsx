import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { WEEKLY_ROUTINE, GOLDEN_REMINDERS, DayOfWeek } from './constants';
import { RoutineStep, BottomNav, GlassCard } from './components/RitualComponents';
import { Sparkles, Sun, Moon, Snowflake, Info, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('ritual');
  const [isWinter, setIsWinter] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'night'>('morning');
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Lunes');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const grainX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const grainY = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);
  const meshX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const meshY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const contentX = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const contentY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const dayIndex = (now.getDay() + 6) % 7;
    const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    setCurrentDay(days[dayIndex]);
    
    // Solar Logic
    const isDawn = hours >= 6 && hours < 9;
    const isGoldenHour = hours >= 19 && hours < 21;
    const isNight = hours >= 21 || hours < 6;
    
    const root = document.documentElement;
    root.classList.remove('dawn', 'golden-hour', 'dark');
    
    if (isDawn) root.classList.add('dawn');
    if (isGoldenHour) root.classList.add('golden-hour');
    if (isNight) root.classList.add('dark');

    setTimeOfDay(isNight || isGoldenHour ? 'night' : 'morning');
    
    const month = now.getMonth();
    setIsWinter(month < 4 || month > 9);
  }, []);

  const currentRoutine = useMemo(() => {
    return WEEKLY_ROUTINE[currentDay][timeOfDay];
  }, [currentDay, timeOfDay]);

  const renderRitual = () => (
    <div className="space-y-6">
      <header className="mb-8 space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-on-surface leading-[1.1] tracking-tight font-light">
            {document.documentElement.classList.contains('dawn') ? (
              <>
                Primeros <span className="italic font-normal">Destellos</span> <br />
                <span className="font-bold">de Luz</span>
              </>
            ) : timeOfDay === 'morning' ? (
              <>
                El <span className="italic font-normal">Despertar</span> <br />
                <span className="font-bold">de la Piel</span>
              </>
            ) : (
              <>
                Ritual de <br />
                <span className="italic font-normal">Serenidad</span>
              </>
            )}
          </h2>
        </motion.div>
      </header>

      <div className="space-y-4">
        {currentRoutine.map((step, index) => (
          <RoutineStep 
            key={step.id} 
            step={step} 
            delay={index * 0.1} 
            isSpecial={(currentDay === 'Miércoles' || currentDay === 'Sábado') && timeOfDay === 'night'}
          />
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
                  <Sun className="w-3 h-3" strokeWidth={1.2} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Mañana</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {routine.morning.map(s => (
                    <div key={s.id} className="text-[11px] text-on-surface-variant font-light">• {s.product}</div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary/60 pt-1">
                  <Moon className="w-3 h-3" strokeWidth={1.2} />
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
    <div className="space-y-6">
      <header className="mb-6 space-y-1">
        <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
          Consejos de <br/><span className="italic font-light opacity-80">Oro</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed font-extralight">
          Descubra los pilares fundamentales del ritual. Principios atemporales diseñados para preservar la luz natural de su piel.
        </p>
      </header>

      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        {GOLDEN_REMINDERS.map((reminder, index) => (
          <div key={index} className="break-inside-avoid">
            <GlassCard delay={index * 0.05} className="flex flex-col justify-between p-5">
              <div className="mb-4 w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" strokeWidth={1.2} />
              </div>
              <p className="text-on-surface-variant leading-relaxed text-sm font-extralight italic">
                "{reminder}"
              </p>
              <div className="mt-6 flex justify-end">
                <CheckCircle2 className="w-4 h-4 text-primary/10" strokeWidth={1.2} />
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mesh-gradient relative overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div 
        className="grain-overlay" 
        style={{ x: grainX, y: grainY }}
      />
      
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: meshX, y: meshY }}
      />
      
      <main className="pt-12 pb-24 px-6 max-w-4xl mx-auto relative z-10">
        <motion.div style={{ x: contentX, y: contentY }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {activeTab === 'ritual' && renderRitual()}
              {activeTab === 'calendar' && renderCalendar()}
              {activeTab === 'tips' && renderTips()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <footer className="mt-8 mb-8" />
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

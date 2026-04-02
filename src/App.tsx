import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { CloudFog, ShieldAlert } from 'lucide-react';
import { WEEKLY_ROUTINE, DayOfWeek } from './constants';
import { BottomNav, GlassCard } from './components/RitualComponents';
import { RitualTab } from './components/RitualTab';
import { AtmosphereTab } from './components/AtmosphereTab';
import { CalendarTab } from './components/CalendarTab';
import { TipsTab } from './components/TipsTab';
import { useWeather } from './hooks/useWeather';
import { useRoutineTracking } from './hooks/useRoutineTracking';
import { useTipSelector } from './hooks/useTipSelector';
import { useNotifications } from './hooks/useNotifications';

export default function App() {
  const [activeTab, setActiveTab] = useState('ritual');
  const [isWinter, setIsWinter] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'night'>('morning');
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Lunes');
  
  // Custom Hooks
  const weatherData = useWeather();
  const { trackingData, toggleCompletion, setFeeling, getStreak, exportData } = useRoutineTracking();
  const selectedGoldenTips = useTipSelector(weatherData, currentDay, timeOfDay);
  const { requestPermission } = useNotifications(weatherData, trackingData);

  // Motion Values for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const windSpeedSpring = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    windSpeedSpring.set(weatherData.windSpeed);
  }, [weatherData.windSpeed, windSpeedSpring]);

  const grainSpeed = useTransform(windSpeedSpring, [0, 50], [1, 5]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  }, [mouseX, mouseY]);

  const grainX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const grainY = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);
  const meshX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const meshY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const contentX = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const contentY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);

  // Initial Setup & Solar Logic
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const dayIndex = (now.getDay() + 6) % 7;
    const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    setCurrentDay(days[dayIndex]);
    
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

  return (
    <div className="min-h-screen mesh-gradient relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Modo Bruma: Desenfoque dinámico si la humedad es > 90% */}
      <AnimatePresence>
        {weatherData.humidity > 90 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none backdrop-blur-[2px] bg-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary/40 font-mono text-[8px] tracking-widest uppercase">
              <CloudFog className="w-3 h-3" /> Bruma del Atlántico detectada
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="grain-overlay" 
        style={{ x: grainX, y: grainY, opacity: useTransform(grainSpeed, [1, 5], [0.03, 0.08]) }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 1, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "mirror"
        }}
      />
      
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: meshX, y: meshY }}
      />
      
      <main className="pt-[max(3rem,env(safe-area-inset-top))] pb-[max(6rem,env(safe-area-inset-bottom))] px-6 max-w-4xl mx-auto relative z-10">
        <motion.div style={{ x: contentX, y: contentY }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {weatherData.error && (
                <GlassCard className="p-8 text-center space-y-4 border-red-500/20 bg-red-500/5 mb-8">
                  <ShieldAlert className="w-12 h-12 text-red-500 mx-auto opacity-50" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-bold">Error de Conexión</h3>
                    <p className="text-xs font-extralight opacity-70">No hemos podido sincronizar con las estaciones meteorológicas de la Bahía.</p>
                  </div>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-[10px] font-mono uppercase tracking-widest bg-primary text-white px-4 py-2 rounded-full hover:scale-105 transition-transform"
                  >
                    Reintentar Sincronización
                  </button>
                </GlassCard>
              )}
              {activeTab === 'ritual' && (
                <RitualTab 
                  currentRoutine={currentRoutine} 
                  currentDay={currentDay} 
                  timeOfDay={timeOfDay} 
                  uvIndex={weatherData.uvIndex} 
                />
              )}
              {activeTab === 'atmosphere' && (
                <AtmosphereTab weatherData={weatherData} />
              )}
              {activeTab === 'calendar' && (
                <CalendarTab 
                  trackingData={trackingData}
                  toggleCompletion={toggleCompletion}
                  setFeeling={setFeeling}
                  getStreak={getStreak}
                  exportData={exportData}
                  requestPermission={requestPermission}
                  currentDay={currentDay}
                  weatherData={weatherData}
                />
              )}
              {activeTab === 'tips' && (
                <TipsTab 
                  currentDay={currentDay}
                  timeOfDay={timeOfDay}
                  weatherData={weatherData}
                  isWinter={isWinter}
                  selectedGoldenTips={selectedGoldenTips}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <footer className="mt-8 mb-8" />
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

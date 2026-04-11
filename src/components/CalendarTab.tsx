import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Droplets, CheckCircle2, BarChart3, Calendar as CalendarIcon, Download, Bell, BellOff } from 'lucide-react';
import { GlassCard, cn } from './RitualComponents';
import { WEEKLY_ROUTINE, DayOfWeek } from '../constants';
import { WeatherData } from '../hooks/useWeather';
import { TrackingData } from '../hooks/useRoutineTracking';
import { ProgressDashboard } from './ProgressDashboard';

interface CalendarTabProps {
  trackingData: TrackingData;
  toggleCompletion: (dateStr: string, type: 'morning' | 'night', weather?: { uv: number; humidity: number; temp: number }) => void;
  setFeeling: (dateStr: string, feeling: string) => void;
  getStreak: () => number;
  exportData: () => void;
  requestPermission: () => Promise<boolean>;
  currentDay: DayOfWeek;
  weatherData: WeatherData;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  trackingData,
  toggleCompletion,
  setFeeling,
  getStreak,
  exportData,
  requestPermission,
  currentDay,
  weatherData
}) => {
  const [view, setView] = useState<'calendar' | 'dashboard'>('calendar');
  const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === 'granted');

  const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Get current week dates
  const currentWeekDates = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    const monday = new Date(now.setDate(diff));
    
    return days.map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split('T')[0];
    });
  }, []);

  const handleRequestNotifications = async () => {
    const granted = await requestPermission();
    if (granted) {
      setNotificationsEnabled(true);
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
            {view === 'calendar' ? 'Calendario de ' : 'Análisis de '}
            <br/><span className="italic font-light opacity-80">Renovación</span>
          </h2>
          <p className="text-on-surface-variant max-w-md text-sm leading-relaxed font-light">
            {view === 'calendar' 
              ? 'Siga su ritual diario diseñado para la luminosidad del Atlántico.'
              : 'Visualice sus tendencias y la correlación con el clima de Cádiz.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleRequestNotifications}
            className={cn(
              "p-2 rounded-full transition-all",
              notificationsEnabled ? "bg-primary/20 text-primary" : "bg-primary/5 text-primary/40 hover:bg-primary/10"
            )}
            title={notificationsEnabled ? "Notificaciones activadas" : "Activar notificaciones"}
          >
            {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
          
          <div className="flex p-1 bg-primary/5 rounded-full">
            <button
              onClick={() => setView('calendar')}
              className={cn(
                "p-2 rounded-full transition-all",
                view === 'calendar' ? "bg-white dark:bg-stone-800 shadow-sm text-primary" : "text-primary/40"
              )}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={cn(
                "p-2 rounded-full transition-all",
                view === 'dashboard' ? "bg-white dark:bg-stone-800 shadow-sm text-primary" : "text-primary/40"
              )}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ProgressDashboard 
              trackingData={trackingData} 
              getStreak={getStreak} 
              exportData={exportData} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4"
          >
            {currentWeekDates.map((dateStr, index) => {
              const dayName = days[index];
              const routine = WEEKLY_ROUTINE[dayName];
              const isToday = dateStr === new Date().toISOString().split('T')[0];
              const isSpecial = dayName === 'Jueves' || dayName === 'Domingo';
              const dayTracking = trackingData[dateStr] || { morning: false, night: false };
              const dayWeather = weatherData?.dailyForecast.find(f => f.day === dayName);

              return (
                <GlassCard 
                  key={dateStr} 
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
                            {dayName}
                          </h3>
                          {isToday && (
                            <span className="text-[7px] font-mono bg-primary text-white px-1.5 py-0.5 rounded-full uppercase tracking-widest">Hoy</span>
                          )}
                          <span className="text-[9px] font-mono opacity-30">{dateStr.split('-').reverse().join('/')}</span>
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
                            onClick={() => setFeeling(dateStr, emoji)}
                            className={cn(
                              "w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all",
                              dayTracking.feeling === emoji ? "bg-white dark:bg-stone-800 shadow-sm scale-110" : "opacity-30 hover:opacity-100"
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
                            onClick={() => toggleCompletion(dateStr, 'morning', { 
                              uv: weatherData.uvIndex, 
                              humidity: weatherData.humidity, 
                              temp: weatherData.temp 
                            })}
                            className={cn(
                              "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all",
                              dayTracking.morning 
                                ? "bg-primary/10 border-primary/20 text-primary" 
                                : "border-stone-200 dark:border-white/10 text-stone-400 hover:border-primary/30"
                            )}
                          >
                            <CheckCircle2 className={cn("w-3 h-3", dayTracking.morning ? "opacity-100" : "opacity-30")} />
                            <span className="text-[8px] font-mono uppercase tracking-wider">
                              {dayTracking.morning ? 'Completado' : 'Marcar'}
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
                            onClick={() => toggleCompletion(dateStr, 'night', { 
                              uv: weatherData.uvIndex, 
                              humidity: weatherData.humidity, 
                              temp: weatherData.temp 
                            })}
                            className={cn(
                              "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all",
                              dayTracking.night 
                                ? "bg-primary/10 border-primary/20 text-primary" 
                                : "border-stone-200 dark:border-white/10 text-stone-400 hover:border-primary/30"
                            )}
                          >
                            <CheckCircle2 className={cn("w-3 h-3", dayTracking.night ? "opacity-100" : "opacity-30")} />
                            <span className="text-[8px] font-mono uppercase tracking-wider">
                              {dayTracking.night ? 'Completado' : 'Marcar'}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

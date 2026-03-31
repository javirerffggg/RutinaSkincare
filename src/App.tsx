import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { WEEKLY_ROUTINE, GOLDEN_REMINDERS, DayOfWeek, GoldenTip } from './constants';
import { RoutineStep, BottomNav, GlassCard, SkeletonCard, cn } from './components/RitualComponents';
import { Sparkles, Sun, Moon, Snowflake, Info, CheckCircle2, Wind, Droplets, Waves, Timer, Navigation, ShieldAlert, CloudFog } from 'lucide-react';
import * as d3 from 'd3';

export default function App() {
  const [activeTab, setActiveTab] = useState('ritual');
  const [isWinter, setIsWinter] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'night'>('morning');
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Lunes');
  
  // Tracking State
  const [completedRoutines, setCompletedRoutines] = useState<Record<string, { morning: boolean; night: boolean }>>(() => {
    const saved = localStorage.getItem('luz_cadiz_completions');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [dailyFeelings, setDailyFeelings] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('luz_cadiz_feelings');
    return saved ? JSON.parse(saved) : {};
  });

  const [tipHistory, setTipHistory] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('luz_cadiz_tip_history');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('luz_cadiz_completions', JSON.stringify(completedRoutines));
  }, [completedRoutines]);

  useEffect(() => {
    localStorage.setItem('luz_cadiz_feelings', JSON.stringify(dailyFeelings));
  }, [dailyFeelings]);

  const [weatherData, setWeatherData] = useState<{
    uvIndex: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    locationName: string;
    loading: boolean;
    aqi: number;
    sunset: string;
    pollen: number;
    uvForecast: number[];
    dailyForecast: { uv: number; humidity: number; day: string }[];
  }>({
    uvIndex: 0,
    humidity: 0,
    windSpeed: 0,
    windDirection: 0,
    locationName: 'Puerto Real',
    loading: true,
    aqi: 0,
    sunset: '',
    pollen: 0,
    uvForecast: [],
    dailyForecast: [],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic background speed based on wind
  const windSpeedSpring = useSpring(0, { stiffness: 100, damping: 30 });
  useEffect(() => {
    windSpeedSpring.set(weatherData.windSpeed);
  }, [weatherData.windSpeed]);

  const grainSpeed = useTransform(windSpeedSpring, [0, 50], [1, 5]);

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

    // Weather & Geolocation Logic
    const fetchWeather = async (lat: number, lon: number, name: string = 'Su ubicación') => {
      try {
        // Main Weather API
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=uv_index&daily=uv_index_max,relative_humidity_2m_max,sunset&timezone=auto&forecast_days=7`
        );
        const weatherData = await weatherRes.json();

        // Air Quality API
        const aqiRes = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pollen_grass&timezone=auto`
        );
        const aqiData = await aqiRes.json();
        
        const currentHour = new Date().getHours();
        const uvIndex = weatherData.hourly?.uv_index?.[currentHour] || 0;
        const uvForecast = weatherData.hourly?.uv_index?.slice(currentHour, currentHour + 5) || [];
        const humidity = weatherData.current?.relative_humidity_2m || 0;
        const windSpeed = weatherData.current?.wind_speed_10m || 0;
        const windDirection = weatherData.current?.wind_direction_10m || 0;
        const sunset = weatherData.daily?.sunset?.[0] || '';
        const aqi = aqiData.current?.european_aqi || 0;
        const pollen = aqiData.current?.pollen_grass || 0;

        const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const dailyForecast = weatherData.daily.time.map((time: string, i: number) => ({
          day: daysMap[new Date(time).getDay()],
          uv: weatherData.daily.uv_index_max[i],
          humidity: weatherData.daily.relative_humidity_2m_max[i]
        }));

        setWeatherData({
          uvIndex,
          humidity,
          windSpeed,
          windDirection,
          locationName: name,
          loading: false,
          aqi,
          sunset,
          pollen,
          uvForecast,
          dailyForecast,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherData(prev => ({ ...prev, loading: false }));
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to Puerto Real if permission denied
          fetchWeather(36.5282, -6.1901, 'Puerto Real');
        }
      );
    } else {
      fetchWeather(36.5282, -6.1901, 'Puerto Real');
    }
  }, []);

  const currentRoutine = useMemo(() => {
    return WEEKLY_ROUTINE[currentDay][timeOfDay];
  }, [currentDay, timeOfDay]);

  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const selectedGoldenTips = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    const scoredTips = GOLDEN_REMINDERS.map(tip => {
      // 1. Rd: Deterministic Randomness (0-100)
      const rd = (hashString(todayStr + tip.id) % 101);
      
      // 2. Cp: Context Score
      let cp = 0;
      const text = tip.text.toLowerCase();
      
      // Wind Factor (Levante)
      const isLevante = weatherData.windDirection >= 45 && weatherData.windDirection <= 135;
      if (isLevante && (text.includes('viento') || text.includes('deshidratación') || text.includes('barrera') || text.includes('levante'))) {
        cp += 50;
      }
      
      // Olay Days (Wed/Sat)
      const isOlayDay = currentDay === 'Miércoles' || currentDay === 'Sábado';
      if (isOlayDay && timeOfDay === 'night' && (text.includes('olay') || text.includes('niacinamida') || text.includes('aha'))) {
        cp += 70;
      }
      
      // UV Radiation
      if (weatherData.uvIndex > 5 && (text.includes('uv') || text.includes('garnier') || text.includes('protección') || text.includes('orejas') || text.includes('cuello'))) {
        cp += 60;
      }
      
      // Circadian Ritual
      if (timeOfDay === 'night' && (text.includes('noche') || text.includes('regeneración') || text.includes('almohada') || text.includes('reparación'))) {
        cp += 40;
      }
      if (timeOfDay === 'morning' && (text.includes('mañana') || text.includes('energía') || text.includes('frescura') || text.includes('despertar'))) {
        cp += 40;
      }
      
      // 3. Hp: History Penalty
      let hp = 0;
      const lastDate = tipHistory[tip.id];
      if (lastDate) {
        const daysDiff = Math.floor((new Date(todayStr).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24));
        hp = 100 / (Math.max(0, daysDiff) + 1);
      }
      
      return { ...tip, score: rd + cp - hp };
    });
    
    return scoredTips
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
      .slice(0, 6);
  }, [weatherData, currentDay, timeOfDay, tipHistory]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    let changed = false;
    const newHistory = { ...tipHistory };
    
    selectedGoldenTips.forEach(tip => {
      if (newHistory[tip.id] !== todayStr) {
        newHistory[tip.id] = todayStr;
        changed = true;
      }
    });
    
    if (changed) {
      setTipHistory(newHistory);
      localStorage.setItem('luz_cadiz_tip_history', JSON.stringify(newHistory));
    }
  }, [selectedGoldenTips]);

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
            uvIndex={step.category === 'Protección' ? weatherData.uvIndex : undefined}
          />
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    const toggleCompletion = (day: string, type: 'morning' | 'night') => {
      setCompletedRoutines(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [type]: !prev[day]?.[type]
        }
      }));
    };

    const setFeeling = (day: string, feeling: string) => {
      setDailyFeelings(prev => ({
        ...prev,
        [day]: feeling
      }));
    };

    const totalRoutines: number = days.length * 2;
    const completedCount: number = Object.values(completedRoutines).reduce<number>((acc, curr: any) => {
      return acc + (curr.morning ? 1 : 0) + (curr.night ? 1 : 0);
    }, 0);
    const progress: number = (completedCount / totalRoutines) * 100;

    // Product Depletion Logic (Sunscreen)
    const sunscreenMorningCompletions = Object.values(completedRoutines).filter((d: any) => d.morning).length;
    const sunscreenCapacity = 30; // 30 applications per bottle
    const sunscreenRemaining = Math.max(0, 100 - (sunscreenMorningCompletions / sunscreenCapacity) * 100);

    // Renewal Cycle Counter (Consecutive Wed/Sat completions)
    // This is a simplified version based on the current state. 
    // In a real app, we would need historical data beyond the current week.
    const specialDays = ['Miércoles', 'Sábado'];
    let consecutiveCycles = 0;
    for (const day of days) {
      if (specialDays.includes(day)) {
        if (completedRoutines[day]?.night) {
          consecutiveCycles++;
        } else {
          // If we missed one, we could reset, but for this demo 
          // let's just count total completions in the current view
        }
      }
    }

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
            {/* Progress Bar */}
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

            {/* Product Depletion */}
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

            {/* Renewal Cycles */}
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

                    {/* Feeling Selector */}
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
                    {/* Morning Block */}
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

                    {/* Night Block */}
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

  const renderTips = () => {
    interface Tip {
      title?: string;
      text: string;
      type?: 'warning';
      icon: React.ReactNode;
      isStatic?: boolean;
    }

    const smartTips: Tip[] = [];

    // 1. Olay Day Warning (High Priority)
    const isOlayDay = currentDay === 'Miércoles' || currentDay === 'Sábado';
    if (isOlayDay && timeOfDay === 'night') {
      smartTips.push({
        title: "Día de Olay",
        text: "¡Hoy es Noche de Renovación! No use Niacinamida esta noche. El AHA y la Vitamina C de Olay ya hacen todo el trabajo.",
        type: 'warning',
        icon: <ShieldAlert className="w-5 h-5 text-amber-500" />
      });
    }

    // 2. Time of Day
    if (timeOfDay === 'morning') {
      smartTips.push({
        title: "Consejo del Momento",
        text: "El protector solar Garnier es su escudo esencial. Aplíquelo 15 minutos antes de salir para una protección óptima contra el sol de la Bahía.",
        icon: <Sun className="w-5 h-5 text-primary" />
      });
    } else {
      smartTips.push({
        title: "Consejo del Momento",
        text: "La noche es el momento de la reparación celular. Asegúrese de que su piel esté limpia antes de aplicar su tratamiento nocturno.",
        icon: <Moon className="w-5 h-5 text-primary" />
      });
    }

    // 3. Climate
    if (weatherData.humidity < 40 && !weatherData.loading) {
      smartTips.push({
        title: "Consejo por Clima",
        text: "Ambiente seco detectado. Refuerce su barrera cutánea con Niacinamida para evitar la pérdida de hidratación por el viento.",
        icon: <Droplets className="w-5 h-5 text-primary" />
      });
    }

    if (weatherData.uvIndex > 5 && !weatherData.loading) {
      smartTips.push({
        title: "Consejo de Reaplicación",
        text: `Índice UV alto (${weatherData.uvIndex.toFixed(1)}). Reaplique su fluido Garnier cada 2 horas si va a estar expuesto al exterior.`,
        icon: <ShieldAlert className="w-5 h-5 text-primary" />
      });
    }

    // 4. Seasonality
    if (isWinter) {
      smartTips.push({
        title: "Tip de Estacionalidad",
        text: "En invierno, la crema Akytania es fundamental para combatir la sequedad causada por el frío y el viento de Cádiz.",
        icon: <Snowflake className="w-5 h-5 text-primary" />
      });
    } else {
      smartTips.push({
        title: "Tip de Estacionalidad",
        text: "En verano, priorice texturas ligeras como el Gel de L'Oréal para mantener la hidratación sin sensación de pesadez.",
        icon: <Sun className="w-5 h-5 text-primary" />
      });
    }

    // Combine with static reminders
    const allTips: Tip[] = [
      ...smartTips,
      ...selectedGoldenTips.map(tip => ({ 
        text: tip.text, 
        isStatic: true, 
        icon: <Info className="w-5 h-5 text-primary" /> 
      }))
    ];

    return (
      <div className="space-y-6">
        <header className="mb-6 space-y-1">
          <h2 className="font-display text-3xl md:text-4xl text-on-surface leading-none tracking-[-0.02em] font-bold">
            Consejos de <br/><span className="italic font-light opacity-80">Oro</span>
          </h2>
          <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed font-extralight">
            Descubra los pilares fundamentales del ritual. Principios dinámicos diseñados para preservar la luz natural de su piel según el entorno.
          </p>
        </header>

        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          {allTips.map((tip, index) => (
            <div key={index} className="break-inside-avoid">
              <GlassCard 
                delay={index * 0.05} 
                className={cn(
                  "flex flex-col justify-between p-5 transition-all duration-500",
                  tip.type === 'warning' && "bg-amber-500/[0.05] border-amber-500/20 ring-1 ring-amber-500/10"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    tip.type === 'warning' ? "bg-amber-500/10" : "bg-primary-container/20"
                  )}>
                    {tip.icon}
                  </div>
                  {tip.title && (
                    <span className={cn(
                      "text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full",
                      tip.type === 'warning' ? "bg-amber-500/20 text-amber-700" : "bg-primary/10 text-primary"
                    )}>
                      {tip.title}
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-on-surface-variant leading-relaxed text-sm font-extralight",
                  tip.isStatic && "italic opacity-80"
                )}>
                  {tip.isStatic ? `"${tip.text}"` : tip.text}
                </p>
                <div className="mt-6 flex justify-end">
                  <CheckCircle2 className={cn("w-4 h-4", tip.type === 'warning' ? "text-amber-500/20" : "text-primary/10")} strokeWidth={1.2} />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAtmosphere = () => {
    const getUVAdvice = (uv: number) => {
      if (uv > 6) return "Alerta de Luminosidad. Hoy el sol es implacable. No olvide cubrir cuello y orejas con su protector solar.";
      if (uv > 3) return "Intensidad moderada. Crucial para determinar la reaplicación de su Garnier Super UV SPF 50.";
      return "Intensidad baja. El astro rey descansa, pero la luz de Cádiz siempre está presente.";
    };

    const getHumidityAdvice = (h: number) => {
      if (h > 80) return "Ambiente saturado. Su piel conservará mejor la hidratación natural; puede optar por el Gel L'Oréal en lugar de cremas densas.";
      if (h < 40) return "Ambiente seco. Determine si su piel requiere la densidad de la crema Akytania o la ligereza del gel.";
      return "Humedad equilibrada. La bruma del Atlántico mantiene su piel jugosa.";
    };

    const getWindType = (deg: number) => {
      if (deg >= 45 && deg <= 135) return { name: 'Levante', type: 'dry' };
      if (deg >= 225 && deg <= 315) return { name: 'Poniente', type: 'humid' };
      return { name: 'Brisa', type: 'neutral' };
    };

    const getWindAdvice = (w: number, deg: number) => {
      const wind = getWindType(deg);
      if (wind.name === 'Levante') return "Viento de Levante detectado (seco y cálido). Refuerce la barrera cutánea con tres gotas generosas de Niacinamida esta noche.";
      if (wind.name === 'Poniente') return "Viento de Poniente (húmedo). La humedad del Atlántico acaricia su piel; hidratación ligera es suficiente.";
      if (w > 30) return "Viento fuerte detectado. Proteja su piel de la erosión ambiental.";
      return "Brisa suave. La frescura del Atlántico capturada en datos.";
    };

    const getSalinityIndex = (w: number, deg: number) => {
      const wind = getWindType(deg);
      let base = w * 0.5;
      if (wind.name === 'Poniente') base *= 1.5; // Poniente brings more sea spray
      return Math.min(Math.round(base), 100);
    };

    const getGoldenHourCountdown = () => {
      if (!weatherData.sunset) return null;
      try {
        const sunsetTime = new Date(weatherData.sunset).getTime();
        if (isNaN(sunsetTime)) return null;
        const now = new Date().getTime();
        const diff = sunsetTime - now;
        if (diff < 0) return "Mañana";
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      } catch (e) {
        console.error("Error calculating golden hour:", e);
        return null;
      }
    };

    const UVChart = ({ data }: { data: number[] }) => {
      const svgRef = React.useRef<SVGSVGElement>(null);

      useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 200;
        const height = 40;
        const margin = { top: 5, right: 5, bottom: 5, left: 5 };

        const x = d3.scaleLinear()
          .domain([0, data.length - 1])
          .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
          .domain([0, Math.max(...data, 10)])
          .range([height - margin.bottom, margin.top]);

        const line = d3.line<number>()
          .x((_, i) => x(i))
          .y(d => y(d))
          .curve(d3.curveBasis);

        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "currentColor")
          .attr("stroke-width", 1.5)
          .attr("d", line);

        // Gradient area
        const area = d3.area<number>()
          .x((_, i) => x(i))
          .y0(height - margin.bottom)
          .y1(d => y(d))
          .curve(d3.curveBasis);

        svg.append("path")
          .datum(data)
          .attr("fill", "url(#chart-gradient)")
          .attr("opacity", 0.1)
          .attr("d", area);

        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
          .attr("id", "chart-gradient")
          .attr("x1", "0%").attr("y1", "0%")
          .attr("x2", "0%").attr("y2", "100%");
        
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "currentColor");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "transparent");

      }, [data]);

      return (
        <div className="mt-4 text-primary/40">
          <svg ref={svgRef} width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none" />
          <div className="flex justify-between text-[6px] font-mono uppercase tracking-widest mt-1 opacity-50">
            <span>Ahora</span>
            <span>+4h</span>
          </div>
        </div>
      );
    };

    const MoonPhase = () => {
      const date = new Date();
      const lp = 2551443;
      const new_moon = new Date(1970, 0, 7, 20, 35, 0);
      const phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
      const normalized = phase / lp;

      const getPhaseData = (n: number) => {
        if (n < 0.0625 || n >= 0.9375) return { name: 'Nueva', d: "M 10 10 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0" };
        if (n < 0.1875) return { name: 'Creciente', d: "M 10 2 A 8 8 0 1 1 10 18 A 6 8 0 1 0 10 2" };
        if (n < 0.3125) return { name: 'Cuarto Crec.', d: "M 10 2 A 8 8 0 1 1 10 18 L 10 2" };
        if (n < 0.4375) return { name: 'Gibosa Crec.', d: "M 10 2 A 8 8 0 1 1 10 18 A 6 8 0 1 1 10 2" };
        if (n < 0.5625) return { name: 'Llena', d: "M 10 10 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0" };
        if (n < 0.6875) return { name: 'Gibosa Meng.', d: "M 10 2 A 8 8 0 1 0 10 18 A 6 8 0 1 0 10 2" };
        if (n < 0.8125) return { name: 'Cuarto Meng.', d: "M 10 2 A 8 8 0 1 0 10 18 L 10 2" };
        return { name: 'Menguante', d: "M 10 2 A 8 8 0 1 0 10 18 A 6 8 0 1 1 10 2" };
      };

      const phaseInfo = getPhaseData(normalized);
      const isFull = normalized >= 0.4375 && normalized < 0.5625;

      return (
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-primary">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <path d={phaseInfo.d} fill="currentColor" opacity={isFull ? 0.8 : 0.4} />
          </svg>
          <div className="flex flex-col">
            <span className="text-[7px] font-mono uppercase tracking-widest opacity-40">Fase Lunar</span>
            <span className="text-[10px] font-display italic">{phaseInfo.name}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-8">
        <header className="mb-8 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-between items-start">
              <h2 className="font-display text-4xl md:text-5xl text-on-surface font-light leading-tight">
                Atmósfera <br />
                <span className="italic">del Entorno</span>
              </h2>
              <MoonPhase />
            </div>
            <p className="text-on-surface-variant max-w-md text-sm leading-relaxed font-extralight mt-4">
              Sincronice su piel con los elementos. El ritual se adapta a la luz, el viento y la humedad de <span className="font-medium text-primary">{weatherData.locationName}</span>.
            </p>
          </motion.div>
        </header>

        {weatherData.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard delay={0.1} />
            <SkeletonCard delay={0.2} />
            <SkeletonCard delay={0.3} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta de Índice UV */}
            <GlassCard className="p-6 relative overflow-hidden group">
              {weatherData.uvIndex > 6 && (
                <motion.div 
                  className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full"
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
              <Sun className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Índice UV</p>
              <h3 className="text-3xl font-display font-bold relative z-10">
                {weatherData.uvIndex.toFixed(1)} — {weatherData.uvIndex > 6 ? 'Alto' : weatherData.uvIndex > 3 ? 'Moderado' : 'Bajo'}
              </h3>
              <UVChart data={weatherData.uvForecast} />
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                "{getUVAdvice(weatherData.uvIndex)}"
              </p>
            </GlassCard>

            {/* Tarjeta de Humedad */}
            <GlassCard className="p-6 relative overflow-hidden group">
              {weatherData.humidity > 80 && (
                <motion.div 
                  className="absolute inset-0 backdrop-blur-md bg-sky-500/5"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              )}
              <Droplets className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Humedad Relativa</p>
              <h3 className="text-3xl font-display font-bold relative z-10">{weatherData.humidity}%</h3>
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                "{getHumidityAdvice(weatherData.humidity)}"
              </p>
            </GlassCard>

            {/* Tarjeta de Viento (Levante/Poniente) */}
            <GlassCard className="p-6 relative overflow-hidden group">
              <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-primary/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: '-10%',
                      width: `${20 + Math.random() * 30}%`,
                    }}
                    animate={{ 
                      x: ['0%', '120%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3, 
                      repeat: Infinity, 
                      delay: Math.random() * 5,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <Wind className="text-primary" strokeWidth={1.2} />
                <Navigation 
                  className="text-primary/30 w-4 h-4" 
                  style={{ transform: `rotate(${weatherData.windDirection}deg)` }} 
                />
              </div>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">
                Viento de {getWindType(weatherData.windDirection).name}
              </p>
              <h3 className="text-3xl font-display font-bold relative z-10">{weatherData.windSpeed} km/h</h3>
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                "{getWindAdvice(weatherData.windSpeed, weatherData.windDirection)}"
              </p>
            </GlassCard>

            {/* Tarjeta de Calidad del Aire (AQI) */}
            <GlassCard className="p-6 relative overflow-hidden group">
              <ShieldAlert className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Calidad del Aire (AQI)</p>
              <h3 className="text-3xl font-display font-bold relative z-10">
                {weatherData.aqi} — {weatherData.aqi < 50 ? 'Excelente' : 'Moderado'}
              </h3>
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                {weatherData.aqi > 50 
                  ? "Partículas detectadas. Refuerce la limpieza de noche para eliminar impurezas."
                  : "Aire puro del Atlántico. Su piel respira con total libertad."}
              </p>
            </GlassCard>

            {/* Tarjeta de Aerosol Marino / Salinidad */}
            <GlassCard className="p-6 relative overflow-hidden group">
              <Waves className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Aerosol Marino</p>
              <h3 className="text-3xl font-display font-bold relative z-10">
                {getSalinityIndex(weatherData.windSpeed, weatherData.windDirection)}% <span className="text-sm font-light opacity-50">Salinidad</span>
              </h3>
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                "La salinidad ambiental sugiere una limpieza profunda con CeraVe para restaurar el pH."
              </p>
            </GlassCard>

            {/* Tarjeta de Golden Hour Countdown */}
            <GlassCard className="p-6 relative overflow-hidden group">
              <Timer className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Próxima Golden Hour</p>
              <h3 className="text-3xl font-display font-bold relative z-10">{getGoldenHourCountdown()}</h3>
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                "Prepare su ritual de noche. La luz más bella de Cádiz está por llegar."
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    );
  };

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
              {activeTab === 'ritual' && renderRitual()}
              {activeTab === 'atmosphere' && renderAtmosphere()}
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

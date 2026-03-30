import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { WEEKLY_ROUTINE, GOLDEN_REMINDERS, DayOfWeek } from './constants';
import { RoutineStep, BottomNav, GlassCard } from './components/RitualComponents';
import { Sparkles, Sun, Moon, Snowflake, Info, CheckCircle2, Wind, Droplets } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('ritual');
  const [isWinter, setIsWinter] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'night'>('morning');
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Lunes');
  const [weatherData, setWeatherData] = useState<{
    uvIndex: number;
    humidity: number;
    windSpeed: number;
    locationName: string;
    loading: boolean;
  }>({
    uvIndex: 0,
    humidity: 0,
    windSpeed: 0,
    locationName: 'Puerto Real',
    loading: true,
  });

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

    // Weather & Geolocation Logic
    const fetchWeather = async (lat: number, lon: number, name: string = 'Su ubicación') => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relative_humidity_2m,wind_speed_10m&hourly=uv_index&timezone=auto&forecast_days=1`
        );
        const data = await response.json();
        
        const currentHour = new Date().getHours();
        const uvIndex = data.hourly.uv_index[currentHour] || 0;
        const humidity = data.current.relative_humidity_2m;
        const windSpeed = data.current.wind_speed_10m;

        setWeatherData({
          uvIndex,
          humidity,
          windSpeed,
          locationName: name,
          loading: false,
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

    const getWindAdvice = (w: number) => {
      if (w > 30) return "Viento seco detectado. Refuerce la barrera cutánea con tres gotas generosas de Niacinamida esta noche.";
      return "Brisa suave. La frescura del Atlántico capturada en datos.";
    };

    return (
      <div className="space-y-8">
        <header className="mb-8 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-on-surface font-light leading-tight">
              Atmósfera <br />
              <span className="italic">del Entorno</span>
            </h2>
            <p className="text-on-surface-variant max-w-md text-sm leading-relaxed font-extralight mt-4">
              Sincronice su piel con los elementos. El ritual se adapta a la luz, el viento y la humedad de <span className="font-medium text-primary">{weatherData.locationName}</span>.
            </p>
          </motion.div>
        </header>

        {weatherData.loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full"
            />
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

            {/* Tarjeta de Viento */}
            <GlassCard className="p-6 col-span-1 md:col-span-2 relative overflow-hidden group">
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
              <Wind className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Viento</p>
              <h3 className="text-3xl font-display font-bold relative z-10">{weatherData.windSpeed} km/h</h3>
              <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
                "{getWindAdvice(weatherData.windSpeed)}"
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    );
  };

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

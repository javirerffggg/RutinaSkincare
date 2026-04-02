import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Droplets, Wind, Navigation, ShieldAlert, Waves, Timer, Thermometer } from 'lucide-react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { line, area, curveBasis } from 'd3-shape';
import { GlassCard, SkeletonCard } from './RitualComponents';
import { WeatherData } from '../hooks/useWeather';
import { 
  getUVAdvice, 
  getHumidityAdvice, 
  getWindType, 
  getWindAdvice, 
  getSalinityIndex, 
  getGoldenHourCountdown 
} from '../utils/weatherUtils';

interface AtmosphereTabProps {
  weatherData: WeatherData;
}

const UVChart = ({ data }: { data: number[] }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 200;
    const height = 40;
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };

    const x = scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain([0, Math.max(...data, 10)])
      .range([height - margin.bottom, margin.top]);

    const lineGenerator = line<number>()
      .x((_, i) => x(i))
      .y(d => y(d))
      .curve(curveBasis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator);

    const areaGenerator = area<number>()
      .x((_, i) => x(i))
      .y0(height - margin.bottom)
      .y1(d => y(d))
      .curve(curveBasis);

    svg.append("path")
      .datum(data)
      .attr("fill", "url(#chart-gradient)")
      .attr("opacity", 0.1)
      .attr("d", areaGenerator);

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

const getAQILabel = (aqi: number) => {
  if (aqi <= 50) return { label: 'Excelente', color: 'text-emerald-500' };
  if (aqi <= 100) return { label: 'Moderado', color: 'text-amber-500' };
  if (aqi <= 150) return { label: 'No Saludable (S)', color: 'text-orange-500' };
  if (aqi <= 200) return { label: 'No Saludable', color: 'text-red-500' };
  if (aqi <= 300) return { label: 'Muy No Saludable', color: 'text-purple-500' };
  return { label: 'Peligroso', color: 'text-rose-900' };
};

export const AtmosphereTab: React.FC<AtmosphereTabProps> = ({ weatherData }) => {
  const windParticles = React.useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      width: `${20 + Math.random() * 30}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5
    }));
  }, []);

  const aqiInfo = getAQILabel(weatherData.aqi);

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

          <GlassCard className="p-6 relative overflow-hidden group">
            <Thermometer className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Temperatura Actual</p>
            <h3 className="text-3xl font-display font-bold relative z-10">{weatherData.temperature}°C</h3>
            <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
              {weatherData.temperature > 25 
                ? "Calor intenso. Priorice texturas en gel y protección solar fluida."
                : weatherData.temperature < 15
                ? "Frío cortante. Use cremas más ricas (Akytania) para proteger la barrera."
                : "Clima templado. Su rutina estándar funcionará a la perfección."}
            </p>
          </GlassCard>

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

          <GlassCard className="p-6 relative overflow-hidden group">
            <div className="absolute inset-0 pointer-events-none opacity-20">
              {windParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute h-px bg-primary/30"
                  style={{
                    top: particle.top,
                    left: '-10%',
                    width: particle.width,
                  }}
                  animate={{ 
                    x: ['0%', '120%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: particle.duration, 
                    repeat: Infinity, 
                    delay: particle.delay,
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

          <GlassCard className="p-6 relative overflow-hidden group">
            <ShieldAlert className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Calidad del Aire (AQI)</p>
            <h3 className="text-3xl font-display font-bold relative z-10">
              {weatherData.aqi} — <span className={aqiInfo.color}>{aqiInfo.label}</span>
            </h3>
            <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
              {weatherData.aqi > 50 
                ? "Partículas detectadas. Use el limpiador de carbón (Solimo) esta noche para eliminar impurezas."
                : "Aire puro del Atlántico. Su piel respira con total libertad."}
            </p>
          </GlassCard>

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

          <GlassCard className="p-6 relative overflow-hidden group">
            <Timer className="text-primary mb-4 relative z-10" strokeWidth={1.2} />
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-50 relative z-10">Próxima Golden Hour</p>
            <h3 className="text-3xl font-display font-bold relative z-10">{getGoldenHourCountdown(weatherData.sunset)}</h3>
            <p className="text-xs font-extralight mt-4 italic opacity-80 relative z-10 leading-relaxed">
              "Prepare su ritual de noche. La luz más bella de Cádiz está por llegar."
            </p>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

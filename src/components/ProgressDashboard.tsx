import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Cell,
  Area,
  ComposedChart
} from 'recharts';
import { TrackingData, DayTracking } from '../hooks/useRoutineTracking';
import { GlassCard, cn } from './RitualComponents';
import { Download, Flame, CloudSun, Droplets } from 'lucide-react';

interface ProgressDashboardProps {
  trackingData: TrackingData;
  getStreak: () => number;
  exportData: () => void;
}

const FEELING_MAP: Record<string, number> = {
  '✨': 4,
  '💧': 3,
  '☁️': 2,
  '🌙': 1
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ trackingData, getStreak, exportData }) => {
  const streak = getStreak();

  const chartData = useMemo(() => {
    const dates = Object.keys(trackingData).sort();
    return dates.slice(-14).map(date => ({
      date: date.split('-').slice(1).join('/'),
      feeling: trackingData[date].feeling ? FEELING_MAP[trackingData[date].feeling!] : null,
      completed: (trackingData[date].morning ? 1 : 0) + (trackingData[date].night ? 1 : 0),
      uv: trackingData[date].weather?.uv || 0,
      humidity: trackingData[date].weather?.humidity || 0
    }));
  }, [trackingData]);

  // Heatmap data (last 28 days)
  const heatmapData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayData = trackingData[dateStr];
      const level = dayData ? (dayData.morning ? 1 : 0) + (dayData.night ? 1 : 0) : 0;
      data.push({ date: dateStr, level });
    }
    return data;
  }, [trackingData]);

  const weatherInsights = useMemo(() => {
    const entries = (Object.values(trackingData) as DayTracking[]).filter(d => d.feeling && d.weather);
    if (entries.length < 3) return null;

    const highUVFeelings = entries.filter(e => e.weather!.uv > 6).map(e => FEELING_MAP[e.feeling!] || 0);
    const lowUVFeelings = entries.filter(e => e.weather!.uv <= 6).map(e => FEELING_MAP[e.feeling!] || 0);
    
    const avgHigh = highUVFeelings.length ? highUVFeelings.reduce((a, b) => a + b, 0) / highUVFeelings.length : null;
    const avgLow = lowUVFeelings.length ? lowUVFeelings.reduce((a, b) => a + b, 0) / lowUVFeelings.length : null;

    if (avgHigh !== null && avgLow !== null) {
      if (avgHigh < avgLow - 0.5) {
        return "Tu piel parece resentirse con índices UV altos. Refuerza la protección y la calma post-solar.";
      }
    }

    const highHumFeelings = entries.filter(e => e.weather!.humidity > 70).map(e => FEELING_MAP[e.feeling!] || 0);
    const avgHum = highHumFeelings.length ? highHumFeelings.reduce((a, b) => a + b, 0) / highHumFeelings.length : null;

    if (avgHum !== null && avgHum < 2.5) {
      return "La alta humedad de Cádiz parece afectar tu sensación de confort. Prioriza texturas ligeras.";
    }

    return "Tu rutina está equilibrada con el clima actual. ¡Sigue así!";
  }, [trackingData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[8px] font-mono uppercase tracking-widest opacity-50">Racha Actual</p>
            <h4 className="text-3xl font-display font-bold flex items-center gap-2">
              {streak} <span className="text-sm font-light opacity-50">días</span>
              {streak > 0 && <Flame className="w-6 h-6 text-orange-500 animate-pulse" />}
            </h4>
          </div>
          <button 
            onClick={exportData}
            className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            title="Exportar Datos"
          >
            <Download className="w-5 h-5" />
          </button>
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between md:col-span-2">
          <div className="space-y-1">
            <p className="text-[8px] font-mono uppercase tracking-widest opacity-50">Análisis de Correlación</p>
            <p className="text-sm font-light text-on-surface-variant italic leading-relaxed">
              {weatherInsights || "Recopilando más datos para análisis climático..."}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
            <CloudSun className="w-6 h-6 text-primary/40" />
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <p className="text-[8px] font-mono uppercase tracking-widest opacity-50 mb-4">Actividad (28 días)</p>
          <div className="grid grid-cols-7 gap-1.5">
            {heatmapData.map((day, i) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={cn(
                  "aspect-square rounded-sm transition-all",
                  day.level === 2 ? 'bg-primary' : 
                  day.level === 1 ? 'bg-primary/40' : 
                  'bg-primary/5'
                )}
                title={`${day.date}: ${day.level} rituales`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-[8px] font-mono text-stone-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary/5 rounded-sm" /> 0 Ritual
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary/40 rounded-sm" /> 1 Ritual
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-sm" /> 2 Rituales
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-[8px] font-mono uppercase tracking-widest opacity-50 mb-6">Estado de la Piel vs UV</p>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 8, fill: 'rgba(0,0,0,0.4)' }} 
                />
                <YAxis yAxisId="left" hide domain={[0, 5]} />
                <YAxis yAxisId="right" hide domain={[0, 12]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '12px', 
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    fontSize: '10px'
                  }}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="uv" 
                  fill="rgba(var(--color-primary-rgb), 0.05)" 
                  stroke="rgba(var(--color-primary-rgb), 0.2)" 
                  name="Índice UV"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="feeling" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: 'var(--color-primary)' }}
                  activeDot={{ r: 5 }}
                  connectNulls
                  name="Estado Piel"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[8px] font-mono uppercase tracking-widest opacity-50">Consistencia y Humedad</p>
            <div className="flex items-center gap-4 text-[8px] font-mono opacity-40">
              <div className="flex items-center gap-1">
                <div className="w-2 h-0.5 bg-primary" /> Rituales
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary/10 rounded-sm" /> Humedad %
              </div>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 8, fill: 'rgba(0,0,0,0.4)' }} 
                />
                <YAxis yAxisId="left" hide domain={[0, 2.5]} />
                <YAxis yAxisId="right" hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '12px', 
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    fontSize: '10px'
                  }}
                />
                <Bar yAxisId="right" dataKey="humidity" fill="rgba(var(--color-primary-rgb), 0.1)" radius={[4, 4, 0, 0]} name="Humedad %" />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="completed" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2} 
                  dot={{ r: 2, fill: 'var(--color-primary)' }}
                  name="Rituales"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

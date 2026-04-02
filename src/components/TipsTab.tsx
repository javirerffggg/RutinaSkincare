import React from 'react';
import { Sun, Moon, Droplets, Snowflake, ShieldAlert, Info, CheckCircle2 } from 'lucide-react';
import { GlassCard, cn } from './RitualComponents';
import { DayOfWeek, GoldenTip } from '../constants';
import { WeatherData } from '../hooks/useWeather';

interface TipsTabProps {
  currentDay: DayOfWeek;
  timeOfDay: 'morning' | 'night';
  weatherData: WeatherData;
  isWinter: boolean;
  selectedGoldenTips: GoldenTip[];
}

export const TipsTab: React.FC<TipsTabProps> = ({
  currentDay,
  timeOfDay,
  weatherData,
  isWinter,
  selectedGoldenTips
}) => {
  interface Tip {
    title?: string;
    text: string;
    type?: 'warning';
    icon: React.ReactNode;
    isStatic?: boolean;
  }

  const smartTips: Tip[] = [];

  const isOlayDay = currentDay === 'Miércoles' || currentDay === 'Sábado';
  if (isOlayDay && timeOfDay === 'night') {
    smartTips.push({
      title: "Día de Olay",
      text: "¡Hoy es Noche de Renovación! No use Niacinamida esta noche. El AHA y la Vitamina C de Olay ya hacen todo el trabajo.",
      type: 'warning',
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />
    });
  }

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

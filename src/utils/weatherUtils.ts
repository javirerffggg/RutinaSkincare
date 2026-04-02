import { DayOfWeek } from '../constants';

export const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const getUVAdvice = (uv: number) => {
  if (uv > 6) return "Alerta de Luminosidad. Hoy el sol es implacable. No olvide cubrir cuello y orejas con su protector solar.";
  if (uv > 3) return "Intensidad moderada. Crucial para determinar la reaplicación de su Garnier Super UV SPF 50.";
  return "Intensidad baja. El astro rey descansa, pero la luz de Cádiz siempre está presente.";
};

export const getHumidityAdvice = (h: number) => {
  if (h > 80) return "Ambiente saturado. Su piel conservará mejor la hidratación natural; puede optar por el Gel L'Oréal en lugar de cremas densas.";
  if (h < 40) return "Ambiente seco. Determine si su piel requiere la densidad de la crema Akytania o la ligereza del gel.";
  return "Humedad equilibrada. La bruma del Atlántico mantiene su piel jugosa.";
};

export const getWindType = (deg: number) => {
  if (deg >= 45 && deg <= 135) return { name: 'Levante', type: 'dry' };
  if (deg >= 225 && deg <= 315) return { name: 'Poniente', type: 'humid' };
  return { name: 'Brisa', type: 'neutral' };
};

export const getWindAdvice = (w: number, deg: number) => {
  const wind = getWindType(deg);
  if (wind.name === 'Levante') return "Viento de Levante detectado (seco y cálido). Refuerce la barrera cutánea con tres gotas generosas de Niacinamida esta noche.";
  if (wind.name === 'Poniente') return "Viento de Poniente (húmedo). La humedad del Atlántico acaricia su piel; hidratación ligera es suficiente.";
  if (w > 30) return "Viento fuerte detectado. Proteja su piel de la erosión ambiental.";
  return "Brisa suave. La frescura del Atlántico capturada en datos.";
};

export const getSalinityIndex = (w: number, deg: number) => {
  const wind = getWindType(deg);
  let base = w * 0.5;
  if (wind.name === 'Poniente') base *= 1.5; // Poniente brings more sea spray
  return Math.min(Math.round(base), 100);
};

export const getGoldenHourCountdown = (sunset: string | null) => {
  if (!sunset) return null;
  try {
    const sunsetTime = new Date(sunset).getTime();
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

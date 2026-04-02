import { useEffect, useCallback } from 'react';
import { WeatherData } from './useWeather';
import { TrackingData } from './useRoutineTracking';

export const useNotifications = (weatherData: WeatherData, trackingData: TrackingData) => {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }, []);

  // UV Alert
  useEffect(() => {
    if (weatherData.uvIndex > 6) {
      const lastAlert = localStorage.getItem('luz_cadiz_uv_alert_last');
      const today = new Date().toISOString().split('T')[0];
      
      if (lastAlert !== today) {
        sendNotification("Alerta UV Alta", {
          body: `El índice UV es de ${weatherData.uvIndex.toFixed(1)}. No olvides el SPF 50 y reaplicar cada 2 horas.`,
          tag: 'uv-alert'
        });
        localStorage.setItem('luz_cadiz_uv_alert_last', today);
      }
    }
  }, [weatherData.uvIndex, sendNotification]);

  // Sunscreen Alert
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const morningCompletions = Object.values(trackingData).filter(d => d.morning).length;
    const sunscreenCapacity = 30;
    const remaining = Math.max(0, 100 - (morningCompletions / sunscreenCapacity) * 100);

    if (remaining < 20) {
      const lastAlert = localStorage.getItem('luz_cadiz_sunscreen_alert_last');
      if (lastAlert !== todayStr) {
        sendNotification("Reposición de Protector Solar", {
          body: `Te queda menos del 20% de tu protector solar. ¡Es hora de reponer!`,
          tag: 'sunscreen-alert'
        });
        localStorage.setItem('luz_cadiz_sunscreen_alert_last', todayStr);
      }
    }
  }, [trackingData, sendNotification]);

  // Routine Reminders (Simulated based on time of day)
  useEffect(() => {
    const checkRoutine = () => {
      const now = new Date();
      const hours = now.getHours();
      const todayStr = now.toISOString().split('T')[0];
      const dayTracking = trackingData[todayStr];

      // Morning reminder (8:00 - 9:00)
      if (hours === 8 && (!dayTracking || !dayTracking.morning)) {
        const lastReminder = localStorage.getItem('luz_cadiz_morning_rem_last');
        if (lastReminder !== todayStr) {
          sendNotification("Ritual de Mañana", {
            body: "Es hora de despertar tu piel con la luz de Cádiz. ¡No olvides tu rutina!",
            tag: 'routine-morning'
          });
          localStorage.setItem('luz_cadiz_morning_rem_last', todayStr);
        }
      }

      // Night reminder (21:00 - 22:00)
      if (hours === 21 && (!dayTracking || !dayTracking.night)) {
        const lastReminder = localStorage.getItem('luz_cadiz_night_rem_last');
        if (lastReminder !== todayStr) {
          sendNotification("Ritual de Noche", {
            body: "El día termina. Repara y regenera tu piel antes de descansar.",
            tag: 'routine-night'
          });
          localStorage.setItem('luz_cadiz_night_rem_last', todayStr);
        }
      }
    };

    const interval = setInterval(checkRoutine, 1000 * 60 * 15); // Check every 15 mins
    checkRoutine(); // Initial check

    return () => clearInterval(interval);
  }, [trackingData, sendNotification]);

  return { requestPermission };
};

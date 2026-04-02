import { useState, useEffect, useCallback } from 'react';
import { safeStorage } from '../utils/storage';

export interface DayTracking {
  morning: boolean;
  night: boolean;
  feeling?: string;
  weather?: {
    uv: number;
    humidity: number;
    temp: number;
  };
}

export type TrackingData = Record<string, DayTracking>;

export const useRoutineTracking = () => {
  const [trackingData, setTrackingData] = useState<TrackingData>(() => {
    const saved = safeStorage.getItem('luz_cadiz_tracking_v2');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    safeStorage.setItem('luz_cadiz_tracking_v2', JSON.stringify(trackingData));
  }, [trackingData]);

  const toggleCompletion = useCallback((dateStr: string, type: 'morning' | 'night', weather?: { uv: number; humidity: number; temp: number }) => {
    setTrackingData(prev => {
      const current = prev[dateStr] || { morning: false, night: false };
      return {
        ...prev,
        [dateStr]: {
          ...current,
          [type]: !current[type],
          weather: weather || current.weather
        }
      };
    });
  }, []);

  const setFeeling = useCallback((dateStr: string, feeling: string) => {
    setTrackingData(prev => {
      const current = prev[dateStr] || { morning: false, night: false };
      return {
        ...prev,
        [dateStr]: {
          ...current,
          feeling
        }
      };
    });
  }, []);

  const getStreak = useCallback(() => {
    const dates = Object.keys(trackingData).sort((a, b) => b.localeCompare(a));
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if streak is still alive (today or yesterday completed)
    const lastCompleted = dates.find(d => trackingData[d].morning || trackingData[d].night);
    if (!lastCompleted || (lastCompleted !== today && lastCompleted !== yesterday)) {
      return 0;
    }

    // Count backwards
    let checkDate = new Date(lastCompleted);
    while (true) {
      const checkStr = checkDate.toISOString().split('T')[0];
      if (trackingData[checkStr] && (trackingData[checkStr].morning || trackingData[checkStr].night)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [trackingData]);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(trackingData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `luz-de-cadiz-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [trackingData]);

  return { trackingData, toggleCompletion, setFeeling, getStreak, exportData };
};

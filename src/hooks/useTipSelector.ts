import { useState, useEffect, useMemo, useRef } from 'react';
import { GOLDEN_REMINDERS, DayOfWeek, GoldenTip } from '../constants';
import { hashString } from '../utils/weatherUtils';
import { WeatherData } from './useWeather';
import { safeStorage } from '../utils/storage';

export const useTipSelector = (weatherData: WeatherData, currentDay: DayOfWeek, timeOfDay: 'morning' | 'night') => {
  const tipHistoryRef = useRef<Record<string, string>>(
    (() => {
      const saved = safeStorage.getItem('luz_cadiz_tip_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return {};
        }
      }
      return {};
    })()
  );

  const selectedGoldenTips = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const tipHistory = tipHistoryRef.current;
    
    const scoredTips = GOLDEN_REMINDERS.map(tip => {
      const rd = (hashString(todayStr + tip.id) % 101);
      let cp = 0;
      const text = tip.text.toLowerCase();
      
      const isLevante = weatherData.windDirection >= 45 && weatherData.windDirection <= 135;
      if (isLevante && (text.includes('viento') || text.includes('deshidratación') || text.includes('barrera') || text.includes('levante'))) {
        cp += 50;
      }
      
      const isOlayDay = currentDay === 'Miércoles' || currentDay === 'Sábado';
      if (isOlayDay && timeOfDay === 'night' && (text.includes('olay') || text.includes('niacinamida') || text.includes('aha'))) {
        cp += 70;
      }
      
      if (weatherData.uvIndex > 5 && (text.includes('uv') || text.includes('garnier') || text.includes('protección') || text.includes('orejas') || text.includes('cuello'))) {
        cp += 60;
      }
      
      if (timeOfDay === 'night' && (text.includes('noche') || text.includes('regeneración') || text.includes('almohada') || text.includes('reparación'))) {
        cp += 40;
      }
      if (timeOfDay === 'morning' && (text.includes('mañana') || text.includes('energía') || text.includes('frescura') || text.includes('despertar'))) {
        cp += 40;
      }
      
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
  }, [weatherData, currentDay, timeOfDay]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    let changed = false;
    
    selectedGoldenTips.forEach(tip => {
      if (tipHistoryRef.current[tip.id] !== todayStr) {
        tipHistoryRef.current[tip.id] = todayStr;
        changed = true;
      }
    });
    
    if (changed) {
      safeStorage.setItem('luz_cadiz_tip_history', JSON.stringify(tipHistoryRef.current));
    }
  }, [selectedGoldenTips]);

  return selectedGoldenTips;
};

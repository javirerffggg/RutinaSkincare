import { useState, useEffect, useCallback } from 'react';
import { safeStorage } from '../utils/storage';

export const useRoutineTracking = () => {
  const [completedRoutines, setCompletedRoutines] = useState<Record<string, { morning: boolean; night: boolean }>>(() => {
    const saved = safeStorage.getItem('luz_cadiz_completions');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [dailyFeelings, setDailyFeelings] = useState<Record<string, string>>(() => {
    const saved = safeStorage.getItem('luz_cadiz_feelings');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    safeStorage.setItem('luz_cadiz_completions', JSON.stringify(completedRoutines));
  }, [completedRoutines]);

  useEffect(() => {
    safeStorage.setItem('luz_cadiz_feelings', JSON.stringify(dailyFeelings));
  }, [dailyFeelings]);

  const toggleCompletion = useCallback((day: string, type: 'morning' | 'night') => {
    setCompletedRoutines(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: !prev[day]?.[type]
      }
    }));
  }, []);

  const setFeeling = useCallback((day: string, feeling: string) => {
    setDailyFeelings(prev => ({
      ...prev,
      [day]: feeling
    }));
  }, []);

  return { completedRoutines, dailyFeelings, toggleCompletion, setFeeling };
};

import React from 'react';
import { motion } from 'motion/react';
import { RoutineStep } from './RitualComponents';
import { DayOfWeek } from '../constants';

interface RitualTabProps {
  currentRoutine: any[];
  currentDay: DayOfWeek;
  timeOfDay: 'morning' | 'night';
  uvIndex: number;
}

export const RitualTab: React.FC<RitualTabProps> = ({ currentRoutine, currentDay, timeOfDay, uvIndex }) => {
  return (
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
            uvIndex={step.category === 'Protección' ? uvIndex : undefined}
          />
        ))}
      </div>
    </div>
  );
};

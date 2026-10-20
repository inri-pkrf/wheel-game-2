import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScoreBurst({ trigger, points = 10 }) {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    if (trigger > 0) {
      const id = trigger;
      setBursts((prev) => [...prev, { id, points }]);
      const timer = setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger, points]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '48%' }}
          >
            <motion.div
              className={`text-5xl font-black font-display ${burst.points > 0 ? 'text-[#FF8C42]' : 'text-red-400'}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
              animate={{
                x: '-38vw',
                y: '-42vh',
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1.3, 1, 0.8],
              }}
              transition={{
                duration: 1.4,
                ease: 'easeOut',
                times: [0, 0.15, 0.7, 1],
              }}
              style={{ textShadow: '0 0 20px rgba(255,107,0,0.6)' }}
            >
              {burst.points > 0 ? `+${burst.points}` : burst.points}
            </motion.div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
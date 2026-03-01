import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HeartButtonProps {
  index: number;
  isCorrect: boolean;
  onAttempt: (isCorrect: boolean) => void;
  disabled: boolean;
}

export const HeartButton = ({ index, isCorrect, onAttempt, disabled }: HeartButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    onAttempt(isCorrect);
  };

  return (
    <motion.button
      className="relative group w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      disabled={disabled}
    >
      {/* Glow Effect behind */}
      <motion.div
        className="absolute inset-0 rounded-full bg-rose-600/20 blur-xl"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.6 : 0.2,
        }}
      />

      {/* The Heart SVG */}
      <div className="relative w-full h-full p-2 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`heartGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" /> {/* Rose 600 */}
              <stop offset="50%" stopColor="#be123c" /> {/* Rose 700 */}
              <stop offset="100%" stopColor="#881337" /> {/* Rose 900 */}
            </linearGradient>
            <filter id={`glass-${index}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
            </filter>
          </defs>
          
          {/* Glassy Background Heart */}
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={`url(#heartGradient-${index})`}
            fillOpacity="0.4"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
            className="backdrop-blur-sm"
          />

          {/* Animated Outline */}
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0.5 
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Inner Shine */}
          <motion.path
            d="M7.5 4C5.5 4 4 5.5 4 7.5c0 2.5 2 5 5 8"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            className="opacity-50"
          />
        </svg>
      </div>

      {/* Particle sparkles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 60,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

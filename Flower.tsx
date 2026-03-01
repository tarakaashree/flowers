import { motion } from 'framer-motion';

// Robust Rose Petal Paths (Designed for ~24x24 viewport originally)
const REALISTIC_PETALS = [
  "M12 21.5c-3.5 0-6.5-2-8-5 .5-3 3-5.5 6-6 1.5-2 4.5-2 6 0 3 .5 5.5 3 6 6-1.5 3-4.5 5-8 5z", // Bottom wide
  "M2.5 12c0-3.5 2-6.5 5-8 3 .5 5.5 3 6 6 2 1.5 2 4.5 0 6-.5 3-3 5.5-6 6-3-1.5-5-4.5-5-8z", // Left
  "M21.5 12c0 3.5-2 6.5-5 8-3-.5-5.5-3-6-6-2-1.5-2-4.5 0-6 .5-3 3-5.5 6-6 3 1.5 5 4.5 5 8z", // Right
  "M12 2.5c3.5 0 6.5 2 8 5-.5 3-3 5.5-6 6-1.5 2-4.5 2-6 0-3-.5-5.5-3-6-6 1.5-3 4.5-5 8-5z", // Top
];

const COLORS = [
  "#e11d48", // Rose 600
  "#be123c", // Rose 700
  "#fb7185", // Rose 400
  "#f43f5e", // Rose 500
  "#fda4af", // Rose 300
  "#9f1239", // Rose 800
];

interface FlowerProps {
  index: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

export const Flower = ({ index, x, y, rotation, scale, delay }: FlowerProps) => {
  const colorIndex = index % COLORS.length;
  const baseColor = COLORS[colorIndex];
  
  return (
    <motion.div
      className="absolute"
      style={{
        // Ensure z-index is always positive and layered correctly
        zIndex: 100 + Math.floor(y), 
        left: `calc(50% + ${x}px)`,
        top: `calc(45% + ${y}px)`, // Adjusted vertical center
        marginLeft: -scale / 2,
        marginTop: -scale / 2,
        width: scale,
        height: scale,
      }}
      initial={{ y: 200, opacity: 0, scale: 0, rotate: rotation - 90 }}
      animate={{ 
        y: 0, // Animate to 0 relative to the top position set in style
        opacity: 1, 
        scale: 1, // Animate to full scale (1 * width/height)
        rotate: rotation 
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        type: "spring",
        damping: 15,
        stiffness: 50,
      }}
    >
      {/* Stem */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-1 bg-green-900/60 origin-top -z-10 rounded-full blur-[0.5px]"
        style={{ 
          height: 150,
          transform: `translateX(-50%) rotate(${-rotation * 0.3}deg)`,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: delay + 0.2 }}
      />
      
      {/* Detailed Flower Head */}
      <div className="relative w-full h-full drop-shadow-2xl filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <filter id={`glow-${index}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Group centered in 100x100 viewBox. 
              Original paths are ~24x24 centered at 12,12.
              We translate to center (50,50), scale up (3.5x), and offset original center (-12,-12).
          */}
          <g transform="translate(50, 50) scale(3.5) translate(-12, -12)">
            
            {/* Layer 1: Outer Petals (Darker, larger) */}
            <g>
              {REALISTIC_PETALS.map((d, i) => (
                <path 
                  key={`outer-${i}`} 
                  d={d}
                  fill={baseColor} 
                  fillOpacity="0.9"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth="0.5"
                  transform="scale(1.1) translate(-1.2, -1.2)" // Slight expansion for outer layer
                />
              ))}
            </g>

            {/* Layer 2: Inner Petals (Rotated, Lighter) */}
            <g transform="rotate(45 12 12)">
               {REALISTIC_PETALS.map((d, i) => (
                <path 
                  key={`inner-${i}`} 
                  d={d}
                  fill={baseColor} 
                  fillOpacity="1"
                  filter={`url(#glow-${index})`}
                  transform="scale(0.7) translate(5, 5)" // Shrink for inner layer
                />
              ))}
            </g>

            {/* Center Stamen */}
            <circle cx="12" cy="12" r="2.5" fill="#fcd34d" opacity="0.9" />
            <circle cx="12" cy="12" r="1.2" fill="#fbbf24" opacity="1" />
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

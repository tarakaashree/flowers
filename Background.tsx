import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Main Background Image - Spider-Man / City Night Vibe */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: `url('https://img.sanishtech.com/u/cc5728f6b6a0d980c7032fd97e5a001a.jpeg')`, // Spider-Man movie poster vibe (dark, red, cinematic)
          filter: 'blur(8px) brightness(0.4)',
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-wine-900/40 to-black/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Floating Particles */}
      <Particles />

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-screen"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
      />
    </div>
  );
};

const Particles = () => {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-rose-300/40 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

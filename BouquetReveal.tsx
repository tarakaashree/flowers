import { motion } from 'framer-motion';
import { Flower } from './Flower';
import { useEffect, useState, useRef } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';

export const BouquetReveal = () => {
  const [showContent, setShowContent] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
    }
  };

  // Phyllotaxis Arrangement (Sunflower pattern)
  const flowers = Array.from({ length: 25 }).map((_, i) => {
    const angle = i * 137.5; // Golden angle
    const radius = 25 * Math.sqrt(i); // Spread factor
    const x = radius * Math.cos(angle * (Math.PI / 180));
    const y = radius * Math.sin(angle * (Math.PI / 180)) + (i * 2); // Slight vertical tilt
    
    return {
      index: i,
      x,
      y,
      rotation: (Math.random() - 0.5) * 60,
      scale: 60 + Math.random() * 40, // Random size between 60 and 100
      delay: i * 0.1,
    };
  });

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center z-20">
      {/* Radial Glow Background for Bouquet */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,164,175,0.15)_0%,transparent_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* The Bouquet Container - Centered */}
      <div className="relative w-full h-[400px] flex items-center justify-center mt-10">
        {flowers.map((f) => (
          <Flower 
            key={f.index} 
            index={f.index}
            x={f.x}
            y={f.y}
            rotation={f.rotation}
            scale={f.scale}
            delay={f.delay}
          />
        ))}
      </div>

      {/* Final Content Reveal */}
      {showContent && (
        <motion.div
          className="absolute bottom-10 sm:bottom-20 w-full max-w-md px-6 flex flex-col items-center text-center z-30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Image/Video Placeholder */}
          <div 
            className="relative w-full aspect-video bg-black/40 backdrop-blur-md border border-rose-500/30 rounded-xl mb-6 flex flex-col items-center justify-center group cursor-pointer hover:bg-black/50 transition-all shadow-2xl shadow-rose-900/20 overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={handleImageUpload}
            />
            
            {customImage ? (
              <motion.img 
                src={customImage} 
                alt="Memory" 
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <ImageIcon className="w-12 h-12 text-rose-300/50 mb-2 group-hover:text-rose-300 group-hover:scale-110 transition-all duration-300" />
                <span className="text-rose-200/50 text-sm font-sans tracking-widest uppercase group-hover:text-rose-200 transition-colors flex items-center gap-2">
                  <Upload size={14} /> Our Memory
                </span>
              </>
            )}
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-rose-100 mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Every bloom is for you, Eric 🌸💖
          </h2>
          <motion.p 
            className="font-sans text-lg md:text-xl text-rose-300 tracking-[0.2em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            I love you, Eric ❤️
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

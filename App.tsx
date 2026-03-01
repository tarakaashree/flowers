import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { HeartButton } from './components/HeartButton';
import { BouquetReveal } from './components/BouquetReveal';
import { Volume2, VolumeX } from 'lucide-react';

// Randomly select the winning heart index (0-15)
const WINNING_INDEX = Math.floor(Math.random() * 16);

export default function App() {
  const [gameState, setGameState] = useState<'playing' | 'won'>('playing');
  const [wrongAttempt, setWrongAttempt] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/02/07/audio_1822e427af.mp3?filename=romantic-piano-11075.mp3'); // Royalty free romantic piano
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioEnabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setAudioEnabled(!audioEnabled);
  };

  const handleAttempt = (isCorrect: boolean) => {
    if (isCorrect) {
      setGameState('won');
      if (audioRef.current && !audioEnabled) {
        // Auto play audio on win if not already playing? 
        // Better to respect user choice, but maybe fade it in if they haven't muted.
        // Let's just stick to the toggle for now to avoid autoplay policy issues.
        // Actually, user requested "Start after correct click"
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
        setAudioEnabled(true);
      }
    } else {
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <Background />

      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        
        {/* Header - Only show when playing */}
        <AnimatePresence>
          {gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center mb-8 sm:mb-12 relative"
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 drop-shadow-[0_0_15px_rgba(225,29,72,0.6)] bg-[length:200%_auto] animate-shimmer">
                Made With Love for My Cupcake..
              </h1>
              <motion.div 
                className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full blur-[1px]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 128, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Grid */}
        <AnimatePresence mode="wait">
          {gameState === 'playing' ? (
            <motion.div
              key="grid"
              className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <HeartButton
                  key={i}
                  index={i}
                  isCorrect={i === WINNING_INDEX}
                  onAttempt={handleAttempt}
                  disabled={wrongAttempt}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="bouquet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BouquetReveal />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wrong Attempt Modal */}
        <AnimatePresence>
          {wrongAttempt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            >
              <div className="bg-black/60 backdrop-blur-xl border border-rose-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(225,29,72,0.3)] text-center max-w-sm mx-auto">
                <p className="font-serif text-2xl text-rose-200 mb-2">Oops… wrong way 🌸</p>
                <p className="font-sans text-sm text-rose-100/80 mb-4">All the best for your next attempt…</p>
                <p className="font-display text-lg text-rose-400 font-bold">but still I love you babyyy 💖</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FloatingBalloons({ onComplete }) {
  const [show, setShow] = useState(true);

  // Rows spelling out in exact order
  const row1 = ["H", "A", "P", "P", "Y"];
  const row2 = ["B", "I", "R", "T", "H", "D", "A", "Y"];
  const row3 = ["G", "O", "P", "I", "K", "A"];

  const balloonColors = [
    { main: "#FF1493", gloss: "#FF69B4", shadow: "#8B0046" }, // Neon Pink
    { main: "#FF007F", gloss: "#FF75A0", shadow: "#800040" }, // Deep Rose
    { main: "#9370DB", gloss: "#BA55D3", shadow: "#4B0082" }, // Medium Purple
    { main: "#FFD700", gloss: "#FFE44D", shadow: "#B8860B" }, // Warm Gold
    { main: "#00CED1", gloss: "#7FFFD4", shadow: "#008B8B" }, // Cyan
  ];

  useEffect(() => {
    // Unmount after one-time 16-second rise animation finishes
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 16000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Row 1: HAPPY */}
      <div className="absolute w-full flex justify-center gap-3 sm:gap-6 md:gap-8">
        {row1.map((char, index) => {
          const color = balloonColors[index % balloonColors.length];
          return (
            <motion.div
              key={`r1-${index}`}
              initial={{ y: "115vh", opacity: 0.95 }}
              animate={{ y: "-35vh" }}
              transition={{
                duration: 14,
                ease: "linear",
                delay: 0.2,
                repeat: 0, // ONE TIME ONLY on login
              }}
              className="flex flex-col items-center"
            >
              <div className="relative w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(255,20,147,0.6)]">
                <svg viewBox="0 0 100 120" className="w-full h-full">
                  <defs>
                    <radialGradient id={`bg-r1-${index}`} cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="30%" stopColor={color.gloss} stopOpacity="0.95" />
                      <stop offset="75%" stopColor={color.main} stopOpacity="1" />
                      <stop offset="100%" stopColor={color.shadow} stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <path d="M 50,5 C 20,5 5,30 5,60 C 5,90 35,108 50,112 C 65,108 95,90 95,60 C 95,30 80,5 50,5 Z" fill={`url(#bg-r1-${index})`} />
                  <polygon points="44,112 56,112 50,118" fill={color.shadow} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight font-sans">
                  {char}
                </span>
              </div>
              <div className="w-[1.5px] h-14 md:h-18 bg-white/40 shadow-sm"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Row 2: BIRTHDAY (Follows directly below Row 1 in clean formation) */}
      <div className="absolute w-full flex justify-center gap-2 sm:gap-4 md:gap-6">
        {row2.map((char, index) => {
          const color = balloonColors[(index + 1) % balloonColors.length];
          return (
            <motion.div
              key={`r2-${index}`}
              initial={{ y: "135vh", opacity: 0.95 }}
              animate={{ y: "-15vh" }}
              transition={{
                duration: 14,
                ease: "linear",
                delay: 0.2,
                repeat: 0, // ONE TIME ONLY on login
              }}
              className="flex flex-col items-center"
            >
              <div className="relative w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(255,20,147,0.6)]">
                <svg viewBox="0 0 100 120" className="w-full h-full">
                  <defs>
                    <radialGradient id={`bg-r2-${index}`} cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="30%" stopColor={color.gloss} stopOpacity="0.95" />
                      <stop offset="75%" stopColor={color.main} stopOpacity="1" />
                      <stop offset="100%" stopColor={color.shadow} stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <path d="M 50,5 C 20,5 5,30 5,60 C 5,90 35,108 50,112 C 65,108 95,90 95,60 C 95,30 80,5 50,5 Z" fill={`url(#bg-r2-${index})`} />
                  <polygon points="44,112 56,112 50,118" fill={color.shadow} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight font-sans">
                  {char}
                </span>
              </div>
              <div className="w-[1.5px] h-14 md:h-18 bg-white/40 shadow-sm"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Row 3: GOPIKA (Follows directly below Row 2 in clean formation) */}
      <div className="absolute w-full flex justify-center gap-3 sm:gap-6 md:gap-8">
        {row3.map((char, index) => {
          const color = balloonColors[(index + 2) % balloonColors.length];
          return (
            <motion.div
              key={`r3-${index}`}
              initial={{ y: "155vh", opacity: 0.95 }}
              animate={{ y: "5vh" }}
              transition={{
                duration: 14,
                ease: "linear",
                delay: 0.2,
                repeat: 0, // ONE TIME ONLY on login
              }}
              className="flex flex-col items-center"
            >
              <div className="relative w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(255,20,147,0.6)]">
                <svg viewBox="0 0 100 120" className="w-full h-full">
                  <defs>
                    <radialGradient id={`bg-r3-${index}`} cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="30%" stopColor={color.gloss} stopOpacity="0.95" />
                      <stop offset="75%" stopColor={color.main} stopOpacity="1" />
                      <stop offset="100%" stopColor={color.shadow} stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <path d="M 50,5 C 20,5 5,30 5,60 C 5,90 35,108 50,112 C 65,108 95,90 95,60 C 95,30 80,5 50,5 Z" fill={`url(#bg-r3-${index})`} />
                  <polygon points="44,112 56,112 50,118" fill={color.shadow} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight font-sans">
                  {char}
                </span>
              </div>
              <div className="w-[1.5px] h-14 md:h-18 bg-white/40 shadow-sm"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

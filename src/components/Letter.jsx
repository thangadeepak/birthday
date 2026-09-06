import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Letter({ config }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#06b6d4", "#ff1493", "#ff69b4", "#ffffff"]
      });
    } catch (e) {
      console.warn("Confetti error:", e);
    }
    setIsOpen(true);
  };

  return (
    <section id="letter-section" className="section">
      {/* Header Section */}
      <div className="section-header">
        <h2 className="font-headline-md text-2xl sm:text-4xl md:text-5xl text-white flex items-center justify-center gap-2 glow-text font-bold">
          <span className="material-symbols-outlined text-primary text-xl sm:text-2xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          {config.sender ? `A Letter From ${config.sender}` : "A Special Letter"}
          <span className="material-symbols-outlined text-primary text-xl sm:text-2xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </h2>
        <p className="text-pink-300 text-xs sm:text-sm md:text-base mt-2.5 font-light tracking-wider">
          Written with all my heart
        </p>
      </div>

      <div className="section-content max-w-3xl">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ================= SEALED 3D ENVELOPE STAGE ================= */
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpenLetter}
              className="group cursor-pointer flex flex-col items-center z-20 max-w-md w-full px-4"
            >
              {/* Glowing 3D Envelope Wrapper */}
              <div className="relative w-64 h-52 sm:w-80 sm:h-64 flex items-center justify-center my-4">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl group-hover:bg-blue-500/50 transition-all duration-500"></div>
                
                {/* 3D Envelope Image */}
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  src="/images/envelope.png"
                  alt="3D Sealed Birthday Envelope"
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(59,130,246,0.6)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Click to Unseal Action Button */}
              <div className="mt-4 sm:mt-6 z-10">
                <button className="gradient-btn px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-base sm:text-lg flex items-center gap-2.5 sm:gap-3 shadow-[0_0_30px_rgba(255,20,147,0.8)] group-hover:scale-108 transition-all cursor-pointer">
                  <span>Tap to Open Letter ✉️</span>
                  <span className="material-symbols-outlined text-lg sm:text-xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>drafts</span>
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-pink-300/80 mt-3 sm:mt-4 tracking-widest uppercase font-light">
                ✨ Click the envelope to unseal & read ✨
              </p>
            </motion.div>
          ) : (
            /* ================= OPENED HANDWRITTEN LETTER STAGE ================= */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, scale: 0.85, rotateX: -45, y: 50 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="glass-card rounded-2xl w-full relative p-3 sm:p-6 md:p-8 mx-auto z-20 border border-pink-500/30 shadow-[0_0_35px_rgba(255,20,147,0.45)]"
            >
              {/* Re-fold Letter Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-6 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[11px] sm:text-xs font-semibold hover:bg-pink-500/40 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-xs sm:text-sm">mark_email_unread</span>
                <span>Re-fold Letter ✉️</span>
              </button>

              {/* Inner decorative border */}
              <div className="glass-card-inner rounded-xl w-full h-full pt-12 sm:pt-16 pb-8 px-5 sm:px-10 md:px-12 relative flex flex-col items-center text-center">
              {/* Floating decorative hearts inside card */}
              <span className="material-symbols-outlined text-pink-400/50 absolute top-3 sm:top-6 left-3 sm:left-6 text-xl sm:text-2xl rotate-[-15deg]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="material-symbols-outlined text-pink-400/50 absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-2xl sm:text-3xl rotate-[20deg]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="material-symbols-outlined text-pink-400/40 absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-xl sm:text-2xl rotate-[-20deg]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>

              {/* Letter Content */}
              <div className="font-accent-script text-xl sm:text-2xl md:text-3xl text-pink-100 space-y-4 sm:space-y-6 leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-2 text-center flex flex-col items-center">
                {config.letter.salutation && (
                  <p className="font-serif italic text-lg sm:text-xl text-pink-200 text-center w-full">
                    {config.letter.salutation}
                  </p>
                )}
                
                {config.letter.recipient && (
                  <p className="text-pink-400 font-bold text-2xl sm:text-3xl md:text-4xl glow-text font-serif tracking-wide text-center w-full">
                    {config.letter.recipient}
                  </p>
                )}

                {config.letter.body && config.letter.body.map((p, idx) => (
                  <p key={idx} className="text-pink-100/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed whitespace-pre-line text-center w-full">
                    {p}
                  </p>
                ))}

                {config.letter.closing && (
                  <p className="text-pink-300 font-bold text-xl sm:text-2xl md:text-3xl glow-text pt-2 whitespace-pre-line text-center w-full">
                    {config.letter.closing}
                  </p>
                )}

                {config.letter.signature && (
                  <div className="pt-3 sm:pt-4 text-pink-300 font-semibold text-lg sm:text-xl md:text-2xl text-center w-full">
                    {config.letter.signature}
                    {config.sender && (
                      <>
                        <br/>
                        <span className="text-pink-400 font-bold text-xl sm:text-2xl md:text-3xl glow-text">
                          {config.sender}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Envelope Bottom Left SVG Illustration (Inside container) */}
            <div className="absolute -bottom-3 left-2 sm:left-4 w-12 h-12 sm:w-20 sm:h-20 opacity-80 drop-shadow-[0_0_15px_rgba(255,20,147,0.6)] rotate-[-12deg] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500 fill-current">
                <rect x="10" y="25" width="80" height="55" rx="8" fill="rgba(255, 20, 147, 0.15)" stroke="#FF1493" strokeWidth="2.5"/>
                <polygon points="10,25 50,55 90,25" fill="rgba(255, 105, 180, 0.25)" stroke="#FF1493" strokeWidth="2"/>
                <circle cx="50" cy="55" r="8" fill="#FF1493"/>
                <path d="M50 50 L48 53 L52 53 Z" fill="white"/>
              </svg>
            </div>

            {/* Quill Feather Bottom Right SVG Illustration (Inside container) */}
            <div className="absolute -bottom-3 right-2 sm:right-4 w-12 h-12 sm:w-20 sm:h-20 opacity-80 drop-shadow-[0_0_15px_rgba(255,20,147,0.6)] rotate-[18deg] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400">
                <path d="M80 10 Q 50 40 20 85 Q 35 70 50 65 Q 65 45 80 10 Z" fill="rgba(255, 105, 180, 0.3)" stroke="#FF69B4" strokeWidth="2.5"/>
                <path d="M20 85 L15 95 L25 88 Z" fill="#FF1493"/>
                <line x1="80" y1="10" x2="18" y2="90" stroke="#FF1493" strokeWidth="2"/>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}

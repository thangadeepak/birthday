import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Reasons({ config }) {
  const [openCardId, setOpenCardId] = useState(null);

  const handleCardClick = (id, e) => {
    e.stopPropagation();
    if (openCardId === id) {
      setOpenCardId(null);
    } else {
      setOpenCardId(id);
      // Trigger tiny celebratory confetti burst on opening a gift
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FF1493", "#FF69B4", "#FFD700", "#ffffff"],
        zIndex: 99999
      });
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpenCardId(null);
  };

  return (
    <section id="reasons-section" className="section relative overflow-hidden" onClick={handleClose}>
      <div className="section-header">
        <h2 className="font-headline-md text-2xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide glow-text flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
          Unwrap Your Special Surprises
          <span className="material-symbols-outlined text-primary text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
        </h2>
        <p className="text-pink-300 text-xs sm:text-sm md:text-base mt-2.5 font-light tracking-wider">
          Tap a gift box to open and reveal why you mean the world to me ✨
        </p>
      </div>

      <div className="section-content max-w-6xl">
        {/* Responsive Grid for Gift Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10 w-full">
          {config.reasons.map((reason, index) => {
            const isOpen = openCardId === reason.id;
            const isOtherOpen = openCardId !== null && !isOpen;

            return (
              <div 
                key={reason.id} 
                className={`relative transition-all duration-500 min-h-[190px] flex items-center justify-center ${
                  isOtherOpen ? "opacity-30 blur-[2px] scale-95 pointer-events-none" : "opacity-100"
                }`}
              >
                {!isOpen ? (
                  /* CLOSED GIFT PRESENT CARD */
                  <motion.div
                    onClick={(e) => handleCardClick(reason.id, e)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateZ: index % 2 === 0 ? 1.5 : -1.5 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="cursor-pointer group relative w-full h-[200px] rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 p-0.5 shadow-[0_14px_35px_rgba(255,20,147,0.45)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Inner Present Surface */}
                    <div className="w-full h-full rounded-[23px] bg-gradient-to-br from-pink-500 via-rose-500 to-pink-700 relative overflow-hidden flex flex-col items-center justify-center p-5">
                      {/* Ambient Glow */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Vertical Ribbon */}
                      <div className="absolute top-0 bottom-0 w-9 bg-gradient-to-r from-pink-100 via-white to-pink-200 left-1/2 -translate-x-1/2 shadow-[0_0_12px_rgba(0,0,0,0.18)] z-0" />
                      
                      {/* Horizontal Ribbon */}
                      <div className="absolute left-0 right-0 h-9 bg-gradient-to-b from-pink-100 via-white to-pink-200 top-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(0,0,0,0.18)] z-0" />

                      {/* 3D Ribbon Bow Icon */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.3)] flex items-center justify-center border-2 border-pink-200 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-pink-600 text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                          featured_seasonal_and_gifts
                        </span>
                      </div>

                      {/* Present Label */}
                      <div className="relative z-10 mt-3 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                        <span>Gift #{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-[10px]">✨</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* OPENED GIFT STATE WITH EXPANDED REVEALED CALENDAR PANEL */
                  <div className="relative z-50 w-[108%] -mx-[4%] min-h-[340px] flex flex-col items-center justify-center">
                    {/* Top Separated Lid / Ribbon Animation */}
                    <motion.div
                      initial={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                      animate={{ y: -80, opacity: 0, scale: 1.1, rotate: index % 2 === 0 ? -12 : 12 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute top-0 w-44 h-11 rounded-t-2xl bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 shadow-lg z-30 pointer-events-none flex items-center justify-center border-b-2 border-white/50"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                        <span className="material-symbols-outlined text-pink-600 text-base">featured_seasonal_and_gifts</span>
                      </div>
                    </motion.div>

                    {/* Revealed Calendar Panel Card with Spacious Padding */}
                    <motion.div
                      initial={{ opacity: 0, y: 50, rotateX: -20, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1.05 }}
                      exit={{ opacity: 0, y: 30, scale: 0.9 }}
                      transition={{ type: "spring", damping: 18, stiffness: 140 }}
                      className="relative w-full rounded-3xl bg-gradient-to-br from-pink-950/95 via-purple-950/95 to-black/95 border-2 border-pink-400 p-7 sm:p-9 shadow-[0_20px_55px_rgba(255,20,147,0.75)] backdrop-blur-2xl z-40 overflow-hidden text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Background Index Decor (Subtle & offset to prevent overlap) */}
                      <div className="absolute top-4 right-16 text-pink-400/15 text-5xl font-serif font-bold pointer-events-none select-none">
                        #{String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Header Badge & Close Button */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-pink-400">calendar_month</span>
                          Special Reason #{index + 1}
                        </span>
                        <button
                          onClick={handleClose}
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/30 shadow-md"
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pink-200 mb-4 flex items-center gap-2 tracking-wide pr-4">
                        <span className="material-symbols-outlined text-pink-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        {reason.title}
                      </h3>

                      {/* Description with Comfortable Line Height */}
                      <p className="text-pink-100/95 text-sm sm:text-base leading-relaxed font-light mb-6 pr-2">
                        {reason.description}
                      </p>

                      {/* Footer Badge */}
                      <div className="pt-4 border-t border-pink-500/20 flex items-center justify-between">
                        <span className="text-pink-300/70 text-xs italic">Tap anywhere outside to close</span>
                        <span className="material-symbols-outlined text-pink-400 text-lg animate-bounce">auto_awesome</span>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


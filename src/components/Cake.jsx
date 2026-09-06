import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Cake() {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const fireConfettiExplosion = () => {
    // 1. Center main burst of colorful papers
    confetti({
      particleCount: 220,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#FF1493", "#FF69B4", "#FFD700", "#00CED1", "#BA55D3", "#ffffff"],
      zIndex: 99999
    });

    // 2. Left cannon blast
    setTimeout(() => {
      confetti({
        particleCount: 140,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.65 },
        colors: ["#FF1493", "#FF69B4", "#FFD700", "#FFAAF3"],
        zIndex: 99999
      });
    }, 200);

    // 3. Right cannon blast
    setTimeout(() => {
      confetti({
        particleCount: 140,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.65 },
        colors: ["#FF1493", "#FF69B4", "#FFD700", "#FFAAF3"],
        zIndex: 99999
      });
    }, 400);

    // 4. Secondary celebration spray
    setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 120,
        origin: { y: 0.5 },
        colors: ["#FF1493", "#FF69B4", "#FFD700", "#ffffff"],
        zIndex: 99999
      });
    }, 650);
  };

  const handleBlowCandle = () => {
    if (!isBlownOut) {
      setIsBlownOut(true);
      setShowSmoke(true);
      fireConfettiExplosion();

      setTimeout(() => {
        setShowSmoke(false);
      }, 3000);
    } else {
      // Re-trigger confetti & toggle state if clicked again
      fireConfettiExplosion();
    }
  };

  const handleRelight = (e) => {
    e.stopPropagation();
    setIsBlownOut(false);
    setShowSmoke(false);
  };

  return (
    <section id="cake-section" className="section">
      <div className="section-header">
        <h2 className="font-headline-md text-2xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide glow-text flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
          Blow Out The Candles!
          <span className="material-symbols-outlined text-primary text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
        </h2>
        <p className="text-pink-300 text-xs sm:text-sm md:text-base mt-2.5 font-light tracking-wider">
          {isBlownOut 
            ? "✨ Wish Made! Tap the cake to blast color papers again ✨" 
            : "Make a special birthday wish and tap the flames to blow them out!"}
        </p>
      </div>

      <div className="section-content max-w-4xl">

        {/* 3D Cake Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", damping: 15 }}
          className="cake-main-container relative z-10 flex flex-col items-center"
        >
          {/* Cake Wrapper with Ambient Radial Glow */}
          <div 
            className="relative cursor-pointer group w-[280px] sm:w-[380px] md:w-[440px] aspect-square flex items-center justify-center select-none"
            onClick={handleBlowCandle}
          >
            {/* Background Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/25 via-purple-500/25 to-pink-500/25 rounded-full blur-3xl group-hover:scale-105 transition-transform duration-500"></div>

            {/* 3D Birthday Cake Image (Stationary) */}
            <img 
              src="/images/cake.png" 
              alt="Happy Birthday Gopika 3D Cake" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_45px_rgba(255,20,147,0.6)]"
            />

            {/* 2 Birthday Candles standing ON TOP of '2' and '0' digits */}
            {/* Left Candle (standing ON TOP of '2') */}
            <div className="absolute top-[1.8%] left-[42.2%] -translate-x-1/2 z-20 pointer-events-none scale-90 sm:scale-100 md:scale-110">
              <div className="candle-assembly">
                {!isBlownOut ? (
                  <>
                    {/* Ambient Flame Glow Aura */}
                    <div className="absolute -top-7 w-12 h-12 bg-amber-400/30 rounded-full blur-md animate-pulse pointer-events-none" />
                    {/* Glowing Flickering Flame */}
                    <div className="flame">
                      <div className="flame-core" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Smoldering Ember Glow on Wick after blow out */}
                    <div className="ember-glow" />
                  </>
                )}

                {/* Candle Wick */}
                <div className="candle-stick-wick" />

                {/* 3D Decorative Candle Stick */}
                <div className="candle-stick-3d" />

                {/* Wax Base standing on top of number '2' */}
                <div className="candle-base-wax" />
              </div>

              {/* Smoke Puff when blown out */}
              {showSmoke && <div className="smoke-puff" />}
            </div>

            {/* Right Candle (standing ON TOP of '0') */}
            <div className="absolute top-[1.8%] left-[58.2%] -translate-x-1/2 z-20 pointer-events-none scale-90 sm:scale-100 md:scale-110">
              <div className="candle-assembly">
                {!isBlownOut ? (
                  <>
                    {/* Ambient Flame Glow Aura */}
                    <div className="absolute -top-7 w-12 h-12 bg-amber-400/30 rounded-full blur-md animate-pulse pointer-events-none" />
                    {/* Glowing Flickering Flame */}
                    <div className="flame">
                      <div className="flame-core" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Smoldering Ember Glow on Wick after blow out */}
                    <div className="ember-glow" />
                  </>
                )}

                {/* Candle Wick */}
                <div className="candle-stick-wick" />

                {/* 3D Decorative Candle Stick */}
                <div className="candle-stick-3d" />

                {/* Wax Base standing on top of number '0' */}
                <div className="candle-base-wax" />
              </div>

              {/* Smoke Puff when blown out */}
              {showSmoke && <div className="smoke-puff" />}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 sm:mt-8">
            <motion.button 
              onClick={handleBlowCandle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(255,20,147,0.6)] transition-all cursor-pointer ${
                isBlownOut 
                  ? "bg-pink-600/30 border border-pink-500 text-pink-300 hover:bg-pink-600/50"
                  : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white hover:shadow-[0_0_35px_rgba(255,20,147,0.9)]"
              }`}
            >
              {isBlownOut 
                ? "🎉 Blast Confetti Again 🎉" 
                : "🕯️ Tap Flames to Blow Out Candles"}
            </motion.button>

            {isBlownOut && (
              <button
                onClick={handleRelight}
                className="px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-pink-200 text-xs sm:text-sm font-semibold hover:bg-white/20 hover:text-white transition-all cursor-pointer shadow-md"
              >
                🕯️ Relight Candles
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

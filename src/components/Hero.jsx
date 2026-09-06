import { motion } from "framer-motion";

export default function Hero({ config, onUnfold }) {
  const handleScrollDown = () => {
    if (onUnfold) {
      onUnfold();
    } else {
      const nextSection = document.getElementById("intro-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="section text-center min-h-[90vh] flex flex-col justify-center items-center">
      <div className="section-content max-w-3xl space-y-6 my-auto">
        
        {/* Top Heart Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-2"
        >
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
        </motion.div>

        {/* Typography Cluster */}
        <div className="space-y-1 sm:space-y-2 relative">
          {/* HAPPY */}
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-widest uppercase drop-shadow-md neon-glow"
          >
            Happy
          </motion.h2>

          {/* Birthday */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-accent-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-pink-400 leading-none neon-glow -rotate-2 transform my-1 sm:my-2"
          >
            Birthday
          </motion.h1>

          {/* Gopika inside Glowing Heart Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glowing-heart-container mt-1 sm:mt-4 inline-block relative"
          >
            <h2 className="font-display-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider drop-shadow-md relative z-10 neon-glow uppercase">
              {config.name}
            </h2>
          </motion.div>
        </div>

        {/* Date Cluster */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center space-x-2 sm:space-x-3 text-primary mt-4 sm:mt-6"
        >
          <span className="material-symbols-outlined text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="font-body-lg text-sm sm:text-base lg:text-lg text-pink-200 tracking-widest uppercase font-semibold">7 September</span>
          <span className="material-symbols-outlined text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </motion.div>

        {/* Love Message */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body-lg text-sm sm:text-base lg:text-lg text-pink-100/90 max-w-xs sm:max-w-md lg:max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed font-light whitespace-pre-line px-2"
        >
          {config.heroText || config.intro.text}
        </motion.p>

        {/* Action Button: Unfold Love (Heart-Shaped Button) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-[20px] flex flex-col items-center justify-center cursor-pointer group"
          onClick={handleScrollDown}
        >
          <div className="relative w-36 h-32 sm:w-40 sm:h-36 flex items-center justify-center filter drop-shadow-[0_10px_25px_rgba(255,20,147,0.8)]">
            {/* SVG Heart background with gradient & glowing stroke */}
            <svg 
              viewBox="0 0 100 90" 
              className="absolute inset-0 w-full h-full text-pink-500 fill-current group-hover:text-pink-600 transition-colors duration-300 pointer-events-none"
            >
              <defs>
                <linearGradient id="heroHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff1493" />
                  <stop offset="50%" stopColor="#ff69b4" />
                  <stop offset="100%" stopColor="#ff007f" />
                </linearGradient>
              </defs>
              <path 
                d="M50,85 C50,85 10,55 10,28 C10,13 22,5 35,5 C43,5 48,10 50,14 C52,10 57,5 65,5 C78,5 90,13 90,28 C90,55 50,85 50,85 Z" 
                fill="url(#heroHeartGradient)"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </svg>

            {/* Text & Icon content centered inside the heart */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white pt-1 select-none">
              <span className="font-bold text-sm sm:text-base tracking-wider drop-shadow-md">
                Unfold Love
              </span>
              <span className="material-symbols-outlined text-lg sm:text-xl mt-0.5 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 flex flex-col items-center opacity-60 text-xs text-pink-300 tracking-widest uppercase"
      >
        <span>Scroll to explore</span>
        <span className="material-symbols-outlined text-base mt-1">expand_more</span>
      </motion.div>
    </section>
  );
}

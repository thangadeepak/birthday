import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Gallery({ config }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const touchStartX = useRef(0);

  const galleryItems = config.gallery || [];
  
  // Track window resize for dynamic cover flow calculations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Extract unique categories from gallery items
  const categories = ["All", ...new Set(galleryItems.map((item) => item.category).filter(Boolean))];

  // Filter items based on active category
  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  // Reset activeIndex when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  const handleOpenGiftBox = () => {
    // Fire magical fireworks confetti burst
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ff69b4', '#ffb6c1', '#ffd700', '#ffffff']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff1493', '#ff69b4', '#ffd700']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff1493', '#ff69b4', '#ffd700']
        });
      }, 250);
    } catch (err) {
      console.warn("Confetti error:", err);
    }

    setIsOpened(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpened) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems.length, isOpened]);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section id="memories-section" className="section relative overflow-hidden select-none">
      <div className="section-content max-w-6xl">
        
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* ================= GIFT BOX UNBOXING SCREEN ================= */
            <motion.div
              key="giftbox-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center justify-center text-center z-20"
            >
              {/* Gift Box Header */}
              <div className="section-header">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-pink-400 font-semibold mb-3 inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 animate-pulse">
                  SPECIAL BIRTHDAY SURPRISE 🎁
                </span>
                <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight glow-text font-serif leading-tight sm:leading-snug">
                  {config.giftBoxTitle || "Unwrap Your Special Birthday Surprise! 🎁✨"}
                </h2>
                <p className="text-pink-200/90 text-sm sm:text-base md:text-lg mt-3 max-w-xl mx-auto font-light tracking-wide leading-relaxed">
                  {config.giftBoxSubtitle || "Tap the sparkling gift box below to unlock your visual diary filled with precious memories"}
                </p>
              </div>

              {/* Sparkling Interactive Gift Box Wrapper (Frameless Floating Gift) */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenGiftBox}
                className="relative group cursor-pointer flex flex-col items-center max-w-[340px] sm:max-w-md md:max-w-lg w-full mt-4 sm:mt-6 mb-6"
              >
                {/* Gift Box Image with Radiant Glow */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
                  <div className="absolute inset-0 bg-pink-500/35 rounded-full blur-3xl group-hover:bg-pink-500/60 transition-all duration-500"></div>
                  
                  <motion.img
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    src={config.giftBoxImage || "/images/gift-box.png"}
                    alt="Sparkling Birthday Gift Box"
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_45px_rgba(255,20,147,0.7)]"
                  />
                </div>

                {/* Tap to Open Action Prompt Button (+20px Height) */}
                <div className="mt-6 sm:mt-8 z-10">
                  <button className="gradient-btn px-8 sm:px-10 py-5 sm:py-6 rounded-full text-white font-bold text-base sm:text-lg flex items-center gap-2.5 sm:gap-3.5 shadow-[0_0_35px_rgba(255,20,147,0.85)] group-hover:scale-108 transition-all cursor-pointer">
                    <span>Tap to Open Gift 🎁</span>
                    <span className="material-symbols-outlined text-lg sm:text-xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </button>
                </div>

                <p className="text-[10px] sm:text-xs text-pink-300/80 mt-3 sm:mt-4 tracking-widest uppercase font-light">
                  ✨ Click anywhere on the box to reveal ✨
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* ================= VISUAL DIARY GALLERY SCREEN ================= */
            <motion.div
              key="gallery-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center z-20"
            >
              {/* Section Header */}
              <div className="section-header">
                {/* Re-wrap Gift Button */}
                <button
                  onClick={() => setIsOpened(false)}
                  className="mb-4 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[11px] sm:text-xs font-semibold hover:bg-pink-500/40 hover:text-white transition-all cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-xs sm:text-sm">card_giftcard</span>
                  <span>Re-wrap Gift 🎁</span>
                </button>

                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-pink-400 font-semibold mb-1 block">
                  GALLERY
                </span>
                <h2 className="font-headline-md text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight glow-text font-serif">
                  {config.galleryTitle || "My Visual Diary"}
                </h2>
                <p className="text-pink-200/80 text-xs sm:text-sm md:text-base mt-2.5 max-w-lg mx-auto font-light tracking-wide">
                  {config.gallerySubtitle || "See the world through our lens: adventures in photos and videos"}
                </p>
              </div>

              {/* Category Filter Pills Bar */}
              {categories.length > 1 && (
                <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto max-w-full pb-3 mb-4 no-scrollbar z-20 px-2">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-white text-gray-950 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                            : "bg-white/10 text-pink-100/80 border border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3D Cover Flow Carousel Container */}
              <div 
                className="relative w-full max-w-5xl h-[380px] sm:h-[460px] md:h-[520px] flex items-center justify-center my-2 sm:my-4 perspective-1000"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {filteredItems.map((item, index) => {
                    const offset = index - activeIndex;
                    const absOffset = Math.abs(offset);
                    const isMobile = windowWidth < 640;

                    // Calculate 3D transforms for Cover Flow effect dynamically
                    let scale = 1;
                    let translateX = "0px";
                    let rotateY = 0;
                    let zIndex = 30 - absOffset * 10;
                    let opacity = 1;

                    if (offset === 0) {
                      // Active Center Card
                      scale = 1;
                      translateX = "0px";
                      rotateY = 0;
                      opacity = 1;
                    } else if (offset === -1) {
                      // Immediate Left Card
                      scale = isMobile ? 0.82 : 0.84;
                      translateX = isMobile ? "-38%" : "-55%";
                      rotateY = isMobile ? 12 : 15;
                      opacity = 0.85;
                    } else if (offset === 1) {
                      // Immediate Right Card
                      scale = isMobile ? 0.82 : 0.84;
                      translateX = isMobile ? "38%" : "55%";
                      rotateY = isMobile ? -12 : -15;
                      opacity = 0.85;
                    } else if (offset === -2) {
                      // Far Left
                      scale = isMobile ? 0.62 : 0.68;
                      translateX = isMobile ? "-68%" : "-95%";
                      rotateY = isMobile ? 20 : 25;
                      opacity = isMobile ? 0.3 : 0.45;
                    } else if (offset === 2) {
                      // Far Right
                      scale = isMobile ? 0.62 : 0.68;
                      translateX = isMobile ? "68%" : "95%";
                      rotateY = isMobile ? -20 : -25;
                      opacity = isMobile ? 0.3 : 0.45;
                    } else {
                      // Outside view
                      scale = 0.5;
                      translateX = offset > 0 ? "130%" : "-130%";
                      opacity = 0;
                      zIndex = 0;
                    }

                    return (
                      <motion.div
                        key={item.id || index}
                        animate={{
                          scale,
                          x: translateX,
                          rotateY,
                          opacity,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 22,
                        }}
                        style={{ zIndex }}
                        onClick={() => {
                          if (offset === 0) {
                            setActiveMedia(item);
                          } else {
                            setActiveIndex(index);
                          }
                        }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] sm:w-[300px] md:w-[360px] h-[330px] sm:h-[410px] md:h-[470px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-white/20 backdrop-blur-sm group transition-shadow duration-300 ${
                          offset === 0 ? "ring-2 ring-pink-500/50 shadow-[0_20px_50px_rgba(255,20,147,0.35)]" : ""
                        }`}
                      >
                        {/* Card Background Image or Video Preview */}
                        <div className="w-full h-full relative bg-slate-900 overflow-hidden">
                          {item.isVideo && item.videoUrl ? (
                            <video
                              src={item.videoUrl}
                              poster={item.url}
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <img
                              src={item.url}
                              alt={item.caption || item.title || "Gallery memory"}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                          {/* Video Indicator Icon (Play Button) */}
                          {item.isVideo && (
                            <div className="absolute bottom-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                              <span className="material-symbols-outlined text-xl pl-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                                play_arrow
                              </span>
                            </div>
                          )}

                          {/* Caption Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-left">
                            {item.title && (
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-300 block mb-1">
                                {item.title}
                              </span>
                            )}
                            <p className="text-white font-medium text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-md">
                              {item.caption}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Navigation Controls (Left & Right Buttons) */}
              <div className="flex items-center justify-center gap-4 mt-6 z-20">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-12 h-12 rounded-full border border-white/30 bg-black/40 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-12 h-12 rounded-full border border-white/30 bg-black/40 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setActiveMedia(null)}
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative max-w-4xl w-full bg-slate-900/95 border border-white/20 p-4 sm:p-6 rounded-3xl shadow-[0_0_50px_rgba(255,20,147,0.5)] overflow-hidden flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full p-2.5 shadow-lg transition-colors cursor-pointer"
                  onClick={() => setActiveMedia(null)}
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>

                {/* Media Content */}
                <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
                  {activeMedia.isVideo && activeMedia.videoUrl ? (
                    <video
                      src={activeMedia.videoUrl}
                      controls
                      autoPlay
                      className="w-full max-h-[70vh] object-contain rounded-2xl"
                    />
                  ) : (
                    <img
                      src={activeMedia.url}
                      alt={activeMedia.caption || "Gallery media"}
                      className="w-full max-h-[70vh] object-contain rounded-2xl"
                    />
                  )}
                </div>

                {/* Caption */}
                <div className="text-center mt-4 px-4">
                  {activeMedia.title && (
                    <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold block mb-1">
                      {activeMedia.title}
                    </span>
                  )}
                  <p className="font-accent-script text-2xl sm:text-3xl text-pink-100 font-bold glow-text">
                    {activeMedia.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

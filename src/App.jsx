import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import confetti from "canvas-confetti";
import { birthdayConfig } from "./birthdayConfig";
import AccessScreen from "./components/AccessScreen";
import Navigation from "./components/Navigation";
import ParallaxBackground from "./components/ParallaxBackground";
import CustomCursor from "./components/CustomCursor";
import FloatingBalloons from "./components/FloatingBalloons";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Letter from "./components/Letter";
import Gallery from "./components/Gallery";
import Reasons from "./components/Reasons";
import Cake from "./components/Cake";
import FinalScreen from "./components/FinalScreen";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [theme, setTheme] = useState(birthdayConfig.theme || "pastel");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const audioRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!isUnlocked) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isUnlocked]);

  // Sync theme with body class
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Sync audio play state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio play error:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setIsPlaying(true); // Auto-play ambient music on unlock gesture

    // 1. Color papers confetti explosion
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#FF1493", "#FF69B4", "#FFD700", "#00CED1", "#BA55D3", "#ffffff"]
    });

    // 2. Left and Right side confetti cannon blasts
    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ["#FF1493", "#FF69B4", "#FFD700", "#FFAAF3"]
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ["#FF1493", "#FF69B4", "#FFD700", "#FFAAF3"]
      });
    }, 300);
  };

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Background Audio */}
      <audio ref={audioRef} src={birthdayConfig.musicUrl} loop />

      {/* Global Glowing Heart Custom Cursor (Active on Lock Screen & Main Site) */}
      <CustomCursor />

      {/* Lock Screen Passcode */}
      {!isUnlocked ? (
        <AccessScreen onUnlock={handleUnlock} />
      ) : (
        <div className="relative min-h-screen pb-24">
          {/* Floating Balloons with HAPPY BIRTHDAY GOPIKA text rising slowly */}
          <FloatingBalloons />

          {/* Floating Parallax Background Elements */}
          <ParallaxBackground theme={theme} />

          {/* Navigation Bar */}
          <Navigation 
            isPlaying={isPlaying} 
            onToggleMusic={toggleMusic}
            theme={theme}
            onToggleTheme={() => setTheme((prev) => (prev === "pastel" ? "dark" : "pastel"))}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content Sections */}
          <main className="relative z-10">
            {/* 1. Hero / Birthday Welcome Screen */}
            <div id="hero-section">
              <Hero 
                config={birthdayConfig} 
                onUnfold={() => {
                  setActiveTab("intro");
                  const introEl = document.getElementById("intro-section");
                  if (introEl) introEl.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>

            {/* 2. Intro Section: Our Story */}
            <Intro config={birthdayConfig} />

            {/* 3. Personal Handwritten Letter */}
            <Letter config={birthdayConfig} />

            {/* 5. Photo Gallery: Our Precious Memories */}
            <Gallery config={birthdayConfig} />

            {/* 6. Reasons Why She Is Special */}
            <Reasons config={birthdayConfig} />

            {/* 7. Interactive Birthday Cake Candle Blowing */}
            <Cake />

            {/* 8. Final Birthday Screen & Live Countdown */}
            <FinalScreen config={birthdayConfig} />
          </main>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";

export default function ParallaxBackground({ theme }) {
  const [scrollY, setScrollY] = useState(0);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Generate random background elements once on mount
    const generated = [];
    const heartColors = theme === "pastel" 
      ? ["#ff2e93", "#ff007f", "#ff75a0", "#ffc2e0", "#e84393"]
      : ["#b026ff", "#8a2be2", "#da70d6", "#c7ceea", "#a29bfe"];

    // 1. Glossy Heart Balloons & Neon outlines (36 items total for high density)
    for (let i = 0; i < 36; i++) {
      const isBalloon = i % 3 !== 0; // 2/3 are balloons, 1/3 are neon outlines
      const depth = 0.45 + Math.random() * 0.45; // speed multiplier when scrolling (0.45 to 0.90)
      const size = isBalloon 
        ? 24 + Math.random() * 26  // 24px to 50px
        : 12 + Math.random() * 14; // 12px to 26px

      // 3D Depth Blur calculation
      let blurVal = 0;
      if (depth < 0.55) {
        blurVal = Math.max(0.5, (0.55 - depth) * 6); // background items get slight blur
      } else if (depth > 0.8) {
        blurVal = Math.max(0.5, (depth - 0.8) * 8); // foreground items get slight blur
      }

      generated.push({
        id: `heart-${i}`,
        type: isBalloon ? "heart-balloon" : "neon-heart",
        color: heartColors[i % heartColors.length],
        left: `${1 + Math.random() * 98}%`,
        initialTop: 10 + Math.random() * 170, // start spread out (10vh to 180vh)
        size: size,
        depth: depth,
        rotation: -25 + Math.random() * 50,
        blur: Number(blurVal.toFixed(1)),
      });
    }

    // 2. Large ambient bokeh lights (12 items)
    const bokehColors = theme === "pastel"
      ? ["rgba(255,46,147,0.18)", "rgba(255,0,127,0.12)", "rgba(255,182,193,0.06)"]
      : ["rgba(176,38,255,0.18)", "rgba(138,43,226,0.12)", "rgba(199,206,234,0.06)"];

    for (let i = 0; i < 12; i++) {
      generated.push({
        id: `bokeh-${i}`,
        type: "bokeh",
        color: bokehColors[i % bokehColors.length],
        left: `${Math.random() * 100}%`,
        initialTop: Math.random() * 180,
        size: 70 + Math.random() * 90,
        depth: 0.15 + Math.random() * 0.2,
      });
    }

    // 3. Ambient star sparkles (24 items)
    const starColors = theme === "pastel"
      ? ["#ff2e93", "#ffd700", "#ffffff", "#ff8da1"]
      : ["#b026ff", "#00ffff", "#ffffff", "#a29bfe"];

    for (let i = 0; i < 24; i++) {
      generated.push({
        id: `star-${i}`,
        type: "star",
        left: `${Math.random() * 100}%`,
        initialTop: Math.random() * 180,
        size: 5 + Math.random() * 8,
        depth: 0.3 + Math.random() * 0.4,
        color: starColors[i % starColors.length],
        rotateSpeed: 0.15 + Math.random() * 0.35,
        pulseDelay: `${Math.random() * 3}s`,
      });
    }

    setElements(generated);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <div className="parallax-container">
      {elements.map((el) => {
        // Convert scrollY from pixels to viewport height unit (vh)
        const scrollY_vh = (scrollY / viewportHeight) * 100;

        // Compute current Y position (in vh)
        // Starts at initialTop, and floats upward rapidly with scroll (- scrollY_vh * depth)
        // No time-based offsets, so they stay static when scroll is idle
        let topV = (el.initialTop - (scrollY_vh * el.depth)) % 180;

        // Wrap around: if floats above -30vh, reset to bottom (150vh)
        if (topV < -30) {
          topV += 180;
        }

        const currentRotation = el.rotation;

        if (el.type === "heart-balloon") {
          return (
            <div
              key={el.id}
              className="floating-element"
              style={{
                left: el.left,
                top: `${topV}vh`,
                transform: `rotate(${currentRotation}deg)`,
                width: `${el.size}px`,
                height: `${el.size * 1.6}px`,
                filter: `drop-shadow(0 0 12px ${el.color}) ${el.blur > 0 ? `blur(${el.blur}px)` : ""}`,
                opacity: el.depth < 0.6 ? 0.55 : 0.85,
                willChange: "transform, top",
              }}
            >
              {/* Glossy 3D Heart SVG */}
              <svg viewBox="0 0 24 24" width="100%" height="65%">
                <defs>
                  <radialGradient id={`glossy-heart-${el.id}`} cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
                    <stop offset="25%" stopColor="#ff7dbb" stopOpacity="0.95"/>
                    <stop offset="65%" stopColor={el.color} stopOpacity="0.95"/>
                    <stop offset="100%" stopColor={theme === "pastel" ? "#50001a" : "#1a0035"} stopOpacity="0.98"/>
                  </radialGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={`url(#glossy-heart-${el.id})`}/>
              </svg>
              {/* Balloon String */}
              <div 
                className="balloon-string" 
                style={{ 
                  height: `${el.size * 0.9}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  position: "absolute",
                  bottom: 0,
                  width: "1px",
                  background: theme === "pastel" ? "rgba(255, 46, 147, 0.35)" : "rgba(176, 38, 255, 0.35)"
                }} 
              />
            </div>
          );
        }

        if (el.type === "neon-heart") {
          return (
            <div
              key={el.id}
              className="floating-element"
              style={{
                left: el.left,
                top: `${topV}vh`,
                transform: `rotate(${currentRotation}deg)`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                filter: el.blur > 0 ? `blur(${el.blur}px)` : "",
                opacity: el.depth < 0.6 ? 0.45 : 0.75,
                willChange: "transform, top",
              }}
            >
              {/* Outline Neon SVG Heart */}
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke={el.color} strokeWidth="2" style={{ filter: `drop-shadow(0 0 10px ${el.color})` }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          );
        }

        if (el.type === "bokeh") {
          return (
            <div
              key={el.id}
              className="floating-element bokeh"
              style={{
                left: el.left,
                top: `${topV}vh`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                backgroundColor: el.color,
                filter: "blur(6px)",
                opacity: 0.5,
                willChange: "top",
              }}
            />
          );
        }

        if (el.type === "star") {
          return (
            <div
              key={el.id}
              className="floating-element"
              style={{
                left: el.left,
                top: `${topV}vh`,
                transform: `rotate(${scrollY * el.rotateSpeed}deg)`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                opacity: 0.7,
                animation: `pulse-light 2s infinite ease-in-out`,
                animationDelay: el.pulseDelay,
                willChange: "transform, top",
              }}
            >
              {/* Sparkle Star SVG */}
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill={el.color} style={{ filter: `drop-shadow(0 0 4px ${el.color})` }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

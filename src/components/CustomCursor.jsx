import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const lastPos = useRef({ x: 0, y: 0 });
  const particleIdCounter = useRef(0);
  const animFrameId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
      if (!isVisible) setIsVisible(true);

      // Distance check to spawn trailing small hearts when moving
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 12) {
        lastPos.current = { x, y };

        // Spawn 1-2 small trailing heart particles
        const newParticles = [];
        const count = Math.random() > 0.5 ? 2 : 1;
        const colors = ["#FF1493", "#FF69B4", "#ffb0ca", "#ffaaf3", "#ff479c"];

        for (let i = 0; i < count; i++) {
          particleIdCounter.current += 1;
          newParticles.push({
            id: particleIdCounter.current,
            x: x + (Math.random() * 14 - 7),
            y: y + (Math.random() * 14 - 7),
            size: Math.random() * 12 + 10, // 10px to 22px small hearts
            opacity: 0.9,
            scale: 1,
            rotation: Math.random() * 40 - 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -1 - Math.random() * 1.5, // float upward
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }

        setParticles((prev) => [...prev.slice(-30), ...newParticles]); // keep max 30 active
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("input") ||
        target.closest(".polaroid-card") || 
        target.closest(".reason-card") || 
        target.closest(".candle") || 
        target.closest(".action-btn");
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = (e) => {
      // Click burst of small hearts
      const { clientX: x, clientY: y } = e;
      const clickParticles = [];
      const colors = ["#FF1493", "#FF69B4", "#ffffff", "#ffd700"];

      for (let i = 0; i < 6; i++) {
        particleIdCounter.current += 1;
        const angle = (Math.PI * 2 * i) / 6;
        const speed = Math.random() * 3 + 2;
        clickParticles.push({
          id: particleIdCounter.current,
          x: x,
          y: y,
          size: Math.random() * 14 + 12,
          opacity: 1,
          scale: 1.2,
          rotation: Math.random() * 60 - 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setParticles((prev) => [...prev.slice(-30), ...clickParticles]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isVisible]);

  // Particle update animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateParticles = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setParticles((prevParticles) => {
        if (prevParticles.length === 0) return prevParticles;

        return prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - dt * 1.8, // fade out over ~0.6s
            scale: Math.max(0.2, p.scale - dt * 0.8),
          }))
          .filter((p) => p.opacity > 0);
      });

      animFrameId.current = requestAnimationFrame(updateParticles);
    };

    animFrameId.current = requestAnimationFrame(updateParticles);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing Small Floating Hearts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-[9998] transition-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: Math.max(0, p.opacity),
            transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.rotation}deg)`,
            color: p.color,
            filter: `drop-shadow(0 0 6px ${p.color})`,
          }}
        >
          <svg viewBox="0 0 24 24" width={p.size} height={p.size} fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}

      {/* Main Glowing Heart Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.4 : 1.0})`,
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Main SVG Heart Icon */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 text-pink-500 drop-shadow-[0_0_12px_rgba(255,20,147,0.9)] animate-pulse"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
    </>
  );
}

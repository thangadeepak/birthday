import { useState } from "react";
import { motion } from "framer-motion";

export default function AccessScreen({ onUnlock }) {
  const [username, setUsername] = useState("Gopika");
  const [password, setPassword] = useState("07-09-2006");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim().length > 0) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen min-h-screen z-50 liquid-glass-bg text-white flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Dynamic Animated Liquid Glass Orbs & Fluid Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
        {/* Morphing Liquid Blob 1 (Hot Pink Glow) */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-pink-500/40 rounded-full blur-[80px] liquid-blob-anim-1 pointer-events-none" />

        {/* Morphing Liquid Blob 2 (Electric Purple Glow) */}
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/45 rounded-full blur-[90px] liquid-blob-anim-2 pointer-events-none" />

        {/* Morphing Liquid Blob 3 (Cyan/Magenta Accent) */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-fuchsia-400/30 rounded-full blur-[70px] liquid-blob-anim-1 pointer-events-none" />

        {/* Floating Heart Particles */}
        <div className="absolute top-1/6 left-1/5 text-pink-300/40 blur-[1px] animate-bounce duration-1000">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
        <div className="absolute bottom-1/4 right-1/6 text-pink-300/35 blur-[2px] animate-pulse">
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
        <div className="absolute top-2/3 left-1/10 text-purple-300/30 blur-[1px]">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
      </div>

      {/* Main Liquid Glassmorphism Container */}
      <motion.main
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[360px] sm:max-w-[410px] px-4 sm:px-6 z-10 flex flex-col items-center gap-5 my-auto"
      >
        {/* Liquid Glass Modal Card */}
        <div className="liquid-glass-card w-full p-6 sm:p-8 flex flex-col gap-6 relative">
          {/* Top-Right Glass Close Badge */}
          <div className="absolute top-4 right-4 z-20">
            <button
              type="button"
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center text-xs font-bold backdrop-blur-lg transition-all focus:outline-none cursor-pointer shadow-md active:scale-95"
              title="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Header Section inside Card */}
          <div className="flex flex-col items-center text-center gap-1.5 pt-2 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center mb-1 shadow-inner backdrop-blur-md">
              <span className="material-symbols-outlined text-pink-300 text-2xl drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
              Access Our World
            </h1>
            <p className="text-xs sm:text-sm text-pink-200/90 font-medium flex items-center justify-center gap-1.5 mt-0.5">
              A special place, just for you
              <span className="material-symbols-outlined text-xs text-pink-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1 relative z-10">
            {/* Username Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-pink-200/80 ml-1 uppercase tracking-wider">Name</label>
              <div className="liquid-glass-input px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-pink-300 text-xl pointer-events-none select-none">
                  person
                </span>
                <input
                  className="bg-transparent border-none outline-none text-white font-semibold text-sm sm:text-base w-full placeholder-pink-200/40 tracking-wide"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-pink-200/80 ml-1 uppercase tracking-wider">Password</label>
              <div className="liquid-glass-input px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-pink-300 text-xl pointer-events-none select-none">
                  lock
                </span>
                <input
                  className="bg-transparent border-none outline-none text-white font-semibold text-sm sm:text-base w-full placeholder-pink-200/40 tracking-widest"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-pink-300/80 hover:text-white transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-300 font-semibold text-xs text-center mt-1 bg-red-500/20 py-2 px-3 rounded-xl border border-red-400/40 backdrop-blur-md">
                Please enter password to unlock
              </p>
            )}

            {/* Subtext Checkbox Indicator */}
            <div className="flex items-center gap-2 text-xs text-pink-200/90 font-medium ml-1 mt-1">
              <input
                type="checkbox"
                checked
                readOnly
                className="w-4 h-4 accent-pink-500 rounded cursor-pointer border-white/40"
              />
              <span>I Agree to the Terms & Conditions</span>
            </div>

            {/* Perfect 3D Liquid Glass Heart Submit Button */}
            <div className="flex justify-center w-full mt-1">
              <button
                type="submit"
                className="relative w-[170px] h-[145px] flex items-center justify-center group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
              >
                {/* Perfect Heart SVG Background */}
                <svg
                  viewBox="0 0 200 170"
                  className="absolute inset-0 w-full h-full drop-shadow-[0_12px_28px_rgba(236,72,153,0.7)] filter transition-all duration-300 group-hover:drop-shadow-[0_18px_36px_rgba(244,114,182,0.9)]"
                >
                  <defs>
                    <linearGradient id="perfectHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="40%" stopColor="#db2777" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                    <linearGradient id="redFillGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#88001b" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#ff2456" />
                    </linearGradient>
                    <linearGradient id="perfectHeartGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Perfect Plump Heart Shape Base Body */}
                  <path
                    d="M100,162 C100,162 10,105 10,52 C10,22 32,7 58,7 C78,7 92,18 100,32 C108,18 122,7 142,7 C168,7 190,22 190,52 C190,105 100,162 100,162 Z"
                    fill="url(#perfectHeartGrad)"
                    stroke="rgba(255, 255, 255, 0.85)"
                    strokeWidth="3"
                  />

                  {/* 2-Second Liquid Red Fill (Rises from bottom to top on hover) */}
                  <path
                    d="M100,162 C100,162 10,105 10,52 C10,22 32,7 58,7 C78,7 92,18 100,32 C108,18 122,7 142,7 C168,7 190,22 190,52 C190,105 100,162 100,162 Z"
                    fill="url(#redFillGrad)"
                    className="liquid-red-fill"
                  />

                  {/* Top Reflection Glass Sheen */}
                  <path
                    d="M100,32 C108,18 122,7 142,7 C168,7 190,22 190,52 C190,72 160,105 100,132 C50,105 18,72 18,52 C18,44 22,25 42,14 C54,8 74,14 100,32 Z"
                    fill="url(#perfectHeartGloss)"
                    opacity="0.6"
                    className="pointer-events-none"
                  />
                </svg>

                {/* Compact Text & Heart Icon strictly centered inside Perfect Heart */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white font-extrabold tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] pt-3 pb-2 px-3">
                  <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs uppercase">
                    <span>Unlock</span>
                    <span
                      className="material-symbols-outlined text-pink-200 text-xs sm:text-sm group-hover:scale-125 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-pink-100 uppercase tracking-widest font-black mt-0.5">
                    Surprise
                  </span>
                </div>
              </button>
            </div>
          </form>

          {/* Subtext under action inside card */}
          <div className="text-center text-xs text-pink-200/70 font-medium relative z-10">
            Already have an account? <span className="font-bold text-white hover:underline cursor-pointer">Login</span>
          </div>
        </div>

        {/* Footer outside Card */}
        <div className="flex items-center justify-center gap-2 text-pink-200/90 font-medium text-xs sm:text-sm tracking-wider drop-shadow-md pb-2">
          <span className="material-symbols-outlined text-xs text-pink-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
          Made with Love for Gopika
          <span className="material-symbols-outlined text-xs text-pink-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
        </div>
      </motion.main>
    </div>
  );
}

import { useState } from "react";

export default function Navigation({ isPlaying, onToggleMusic, theme, onToggleTheme, activeTab, setActiveTab }) {
  const navItems = [
    { id: "hero", label: "Welcome", icon: "favorite" },
    { id: "intro", label: "Our Story", icon: "auto_awesome" },
    { id: "letter", label: "A Letter", icon: "mail" },
    { id: "memories", label: "Memories", icon: "photo_library" },
    { id: "reasons", label: "Why You", icon: "volunteer_activism" },
    { id: "cake", label: "Make Wish", icon: "cake" }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById(`${id}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top App Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-pink-500/20 shadow-md py-3 sm:py-4">
        <div className="app-header-container max-w-[1100px] mx-auto w-full flex justify-between items-center" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
          <div className="font-accent-script text-xl sm:text-2xl md:text-3xl text-pink-300 font-bold drop-shadow-[0_0_10px_rgba(255,176,202,0.6)] cursor-pointer tracking-wide" onClick={() => handleNavClick("hero")}>
            Gopika's World
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label="Toggle Theme"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-500/40 transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(176,38,255,0.4)]"
                title="Switch Theme"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  {theme === "pastel" ? "dark_mode" : "light_mode"}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                  {theme === "pastel" ? "Neon Dark" : "Pastel Pink"}
                </span>
              </button>
            )}

            {/* Music Control Button */}
            <button 
              onClick={onToggleMusic}
              aria-label="Toggle Music" 
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:text-white hover:bg-pink-500/40 transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(255,20,147,0.4)]"
            >
              <span className={`material-symbols-outlined text-base sm:text-lg ${isPlaying ? "animate-spin" : ""}`}>
                {isPlaying ? "music_note" : "music_off"}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                {isPlaying ? "Music On" : "Music Off"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Floating Dock Navigation */}
      <nav className="fixed bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-xl border border-pink-500/30 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-[0_5px_25px_rgba(255,20,147,0.35)] flex items-center gap-0.5 sm:gap-2 md:gap-3 max-w-[96vw] sm:max-w-max overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center shrink-0 px-1 sm:px-3 py-1 rounded-full transition-all duration-300 ${
                isActive 
                  ? "text-pink-300 bg-pink-500/30 scale-105 shadow-[0_0_12px_rgba(255,20,147,0.6)]" 
                  : "text-pink-100/60 hover:text-pink-300 hover:scale-105"
              }`}
            >
              <span 
                className="material-symbols-outlined text-base sm:text-xl" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[7.5px] sm:text-[10px] font-label-caps tracking-wider uppercase mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

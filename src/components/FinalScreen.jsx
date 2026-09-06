import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FinalScreen({ config }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    // Parse MM-DD birthday config (08-22 = August 22)
    const [monthStr, dayStr] = (config.birthDate || "08-22").split("-");
    const birthMonth = parseInt(monthStr, 10) - 1; // 0-indexed month
    const birthDay = parseInt(dayStr, 10);

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      let targetDate = new Date(currentYear, birthMonth, birthDay, 0, 0, 0);
      
      const todayIsBirthday = now.getMonth() === birthMonth && now.getDate() === birthDay;
      setIsBirthday(todayIsBirthday);

      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, birthMonth, birthDay, 0, 0, 0);
      }

      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [config.birthDate]);

  return (
    <section id="final-section" className="section">
      <div className="section-header">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="sparkle-text font-serif font-black text-2xl sm:text-4xl lg:text-6xl text-white mb-3 uppercase tracking-wider glow-text"
        >
          Happy Birthday, {config.name}!
        </motion.h1>
      </div>

      <div className="section-content max-w-4xl">

        {/* Special Birthday Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400 shadow-[0_0_20px_rgba(255,20,147,0.5)] my-3 sm:my-4 max-w-[95%] sm:max-w-full mx-auto"
        >
          <span className="text-xs sm:text-base md:text-lg font-semibold text-pink-200 flex items-center justify-center gap-1.5 sm:gap-2 text-center">
            <span className="material-symbols-outlined text-sm sm:text-base text-pink-400" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            Today & always, you mean the world to me
            <span className="material-symbols-outlined text-sm sm:text-base text-pink-400" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </span>
        </motion.div>

        {/* Countdown Box */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 w-full flex flex-col items-center justify-center text-center">
          <p className="text-pink-300 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mb-3 sm:mb-4 px-2 text-center w-full">
            Countdown to your next celebration (7 September)
          </p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="countdown-box flex flex-row items-center justify-center gap-2 sm:gap-4 max-w-md mx-auto px-2 w-full text-center"
          >
            <div className="glass-panel countdown-item p-2.5 sm:p-4 rounded-xl border border-pink-500/30 flex-1 min-w-[65px] bg-black/40 flex flex-col items-center justify-center text-center">
              <span className="countdown-value text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400">{timeLeft.days}</span>
              <span className="countdown-label text-[9px] sm:text-[10px] uppercase tracking-wider text-pink-200 mt-0.5 sm:mt-1 block">Days</span>
            </div>
            <div className="glass-panel countdown-item p-2.5 sm:p-4 rounded-xl border border-pink-500/30 flex-1 min-w-[65px] bg-black/40 flex flex-col items-center justify-center text-center">
              <span className="countdown-value text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="countdown-label text-[9px] sm:text-[10px] uppercase tracking-wider text-pink-200 mt-0.5 sm:mt-1 block">Hours</span>
            </div>
            <div className="glass-panel countdown-item p-2.5 sm:p-4 rounded-xl border border-pink-500/30 flex-1 min-w-[65px] bg-black/40 flex flex-col items-center justify-center text-center">
              <span className="countdown-value text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="countdown-label text-[9px] sm:text-[10px] uppercase tracking-wider text-pink-200 mt-0.5 sm:mt-1 block">Mins</span>
            </div>
            <div className="glass-panel countdown-item p-2.5 sm:p-4 rounded-xl border border-pink-500/30 flex-1 min-w-[65px] bg-black/40 flex flex-col items-center justify-center text-center">
              <span className="countdown-value text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="countdown-label text-[9px] sm:text-[10px] uppercase tracking-wider text-pink-200 mt-0.5 sm:mt-1 block">Secs</span>
            </div>
          </motion.div>
        </div>

        {/* Love Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-serif italic text-base sm:text-lg md:text-xl text-pink-200/90 max-w-xl mx-auto leading-relaxed font-light px-2 text-center w-full"
        >
          "May your days be filled with happiness, your heart with peace, and our path with beautiful moments together. Thank you for being you."
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 sm:mt-8 font-accent-script text-2xl sm:text-3xl md:text-4xl text-pink-400 font-bold glow-text text-center w-full"
        >
          With all my love{config.sender ? `, ${config.sender}` : ""} ❤️
        </motion.div>
      </div>
    </section>
  );
}

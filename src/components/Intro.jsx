import { motion } from "framer-motion";

export default function Intro({ config }) {
  return (
    <section id="intro-section" className="section">
      <div className="section-content max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-panel p-6 sm:p-10 lg:p-14 text-center rounded-3xl border border-pink-500/30 shadow-[0_0_30px_rgba(255,20,147,0.4)] relative overflow-hidden flex flex-col items-center justify-center w-full mx-auto"
        >
          {/* Subtle background glow circle */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Greeting */}
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-headline-md text-2xl sm:text-3xl lg:text-4xl text-pink-300 mb-6 font-bold glow-text text-center w-full mx-auto"
          >
            {config.intro.greeting}
          </motion.h3>

          {/* Intro Body text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif italic text-base sm:text-xl lg:text-2xl text-pink-100/90 leading-relaxed font-light max-w-2xl mx-auto whitespace-pre-line text-center w-full block"
          >
            "{config.intro.text}"
          </motion.p>

          <div className="mt-8 flex justify-center items-center gap-2 text-pink-400 text-center w-full mx-auto">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

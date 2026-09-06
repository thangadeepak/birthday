import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SongPlayer({ config }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const synthRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const lineObjIndex = useRef(0);
  const isPlayingRef = useRef(false);

  const [availableVoices, setAvailableVoices] = useState([]);

  const songData = config.song;
  const allLines = useRef([]);

  useEffect(() => {
    const lines = [];
    songData.sections.forEach((sec, sIdx) => {
      sec.lines.forEach((line, lIdx) => {
        lines.push({
          sectionTag: sec.tag,
          sectionIndex: sIdx,
          lineIndex: lIdx,
          text: line,
          phonetic: sec.phonetics ? sec.phonetics[lIdx] : line,
        });
      });
    });
    allLines.current = lines;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        if (window.speechSynthesis) {
          const vList = window.speechSynthesis.getVoices();
          if (vList && vList.length > 0) {
            setAvailableVoices(vList);
          }
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    // Initialize HTML5 Audio element for Happy Birthday song track
    audioRef.current = new Audio(config.musicUrl || "/gopika-birthday-song.wav");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [config.song, config.musicUrl]);

  const playLineSequence = (index) => {
    if (!isPlayingRef.current) return;

    if (index >= allLines.current.length) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (audioRef.current) audioRef.current.pause();
      if (synthRef.current) synthRef.current.cancel();
      return;
    }

    lineObjIndex.current = index;
    const currentLine = allLines.current[index];
    setCurrentSectionIndex(currentLine.sectionIndex);
    setCurrentLineIndex(currentLine.lineIndex);

    // Vocal Singing via speech synthesis engine
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
        
        const voices = availableVoices.length > 0 ? availableVoices : synthRef.current.getVoices();
        const taVoice = voices.find(v => 
          v.lang.toLowerCase().includes("ta") || 
          v.name.toLowerCase().includes("tamil")
        );

        let utterance;
        if (taVoice) {
          // Native Tamil TTS voice present
          const cleanText = currentLine.text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
          utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.voice = taVoice;
          utterance.lang = "ta-IN";
        } else {
          // Fallback to Tanglish phonetic text so Windows/Chrome without installed Tamil TTS will vocalize out loud!
          const phoneticText = currentLine.phonetic || currentLine.text;
          const cleanText = phoneticText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
          utterance = new SpeechSynthesisUtterance(cleanText);

          const inVoice = voices.find(v => 
            v.lang.toLowerCase().includes("en-in") || 
            v.name.toLowerCase().includes("india") || 
            v.name.toLowerCase().includes("zira") || 
            v.name.toLowerCase().includes("google")
          );
          if (inVoice) {
            utterance.voice = inVoice;
          }
          utterance.lang = "en-IN";
        }

        // Vocal singing melody modulation
        utterance.rate = 0.88;
        utterance.pitch = 1.25;

        utterance.onend = () => {
          if (isPlayingRef.current) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              playLineSequence(index + 1);
            }, 250);
          }
        };

        utterance.onerror = (err) => {
          console.warn("Vocal utterance error:", err);
          if (isPlayingRef.current) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              playLineSequence(index + 1);
            }, 2600);
          }
        };

        // Balance background music track volume while vocal singing
        if (audioRef.current) {
          audioRef.current.volume = 0.22;
        }

        synthRef.current.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis vocal error:", err);
      }
    }

    // Fail-safe automatic timer (3.5s per line) so karaoke advances seamlessly
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        playLineSequence(index + 1);
      }
    }, 3600);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (audioRef.current) audioRef.current.pause();
      if (synthRef.current) synthRef.current.cancel();
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;

      // Play background audio song track
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.warn("Audio play error:", err));
      }

      playLineSequence(lineObjIndex.current);
    }
  };

  const handleReplay = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    lineObjIndex.current = 0;
    setCurrentSectionIndex(0);
    setCurrentLineIndex(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.warn("Audio play error:", err));
    }

    playLineSequence(0);
  };

  return (
    <section id="song-section" className="section py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-headline-md text-3xl md:text-5xl text-white font-bold tracking-wide glow-text flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-pink-400 text-3xl animate-bounce">music_note</span>
            Gopika's 20th Birthday Song
            <span className="material-symbols-outlined text-pink-400 text-3xl animate-bounce">music_note</span>
          </h2>
          <p className="text-pink-300 text-sm md:text-base mt-2 font-light tracking-wider">
            Special custom song created with love for your 20th Birthday! 🎂
          </p>
        </div>

        {/* Music Player & Karaoke Card */}
        <div className="glass-card rounded-3xl p-6 md:p-10 border border-pink-500/40 shadow-[0_0_35px_rgba(255,20,147,0.4)] relative overflow-hidden bg-black/70 backdrop-blur-xl">
          
          {/* Animated Background Equalizer Wave Effects */}
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none flex items-end gap-1.5 h-32">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying ? ["20%", "95%", "30%"] : "20%" }}
                transition={{ repeat: Infinity, duration: 0.5 + (i % 4) * 0.2, repeatType: "mirror" }}
                className="w-2 bg-pink-400 rounded-full"
              />
            ))}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-pink-500/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center shadow-[0_0_20px_rgba(255,20,147,0.6)]">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  graphic_eq
                </span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white tracking-wide">
                  {songData.title}
                </h3>
                <p className="text-xs text-pink-300 tracking-wider uppercase mt-1">
                  Music Track + Vocals • Dedicated to Gopika
                </p>
              </div>
            </div>

            {/* Play/Pause & Replay Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                className="gradient-btn px-7 py-3.5 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(255,20,147,0.7)] hover:scale-105 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  {isPlaying ? "pause_circle" : "play_circle"}
                </span>
                <span>{isPlaying ? "Pause Song" : "Play Song 🎵"}</span>
              </button>

              <button
                onClick={handleReplay}
                className="p-3.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:text-white hover:bg-pink-500/40 transition-all cursor-pointer"
                title="Restart Song"
              >
                <span className="material-symbols-outlined text-xl">replay</span>
              </button>
            </div>
          </div>

          {/* Karaoke Lyrics Display */}
          <div className="mt-8 space-y-8 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {songData.sections.map((section, sIdx) => {
              const isCurrentSection = currentSectionIndex === sIdx && isPlaying;

              return (
                <div 
                  key={sIdx}
                  className={`p-5 rounded-2xl transition-all duration-300 border ${
                    isCurrentSection 
                      ? "bg-pink-500/15 border-pink-400/50 shadow-[0_0_20px_rgba(255,20,147,0.3)]" 
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-pink-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-widest">
                      [{section.tag}]
                    </span>
                  </div>

                  <div className="space-y-2">
                    {section.lines.map((line, lIdx) => {
                      const isCurrentLine = isCurrentSection && currentLineIndex === lIdx;

                      return (
                        <p
                          key={lIdx}
                          onClick={() => {
                            const foundIdx = allLines.current.findIndex(
                              (item) => item.sectionIndex === sIdx && item.lineIndex === lIdx
                            );
                            if (foundIdx !== -1) {
                              if (!isPlaying) {
                                setIsPlaying(true);
                                isPlayingRef.current = true;
                                if (audioRef.current) {
                                  audioRef.current.play().catch(err => console.warn(err));
                                }
                              }
                              playLineSequence(foundIdx);
                            }
                          }}
                          className={`cursor-pointer transition-all duration-300 rounded-lg px-3 py-1.5 text-base md:text-lg ${
                            isCurrentLine
                              ? "text-pink-300 font-bold text-xl md:text-2xl glow-text bg-pink-500/25 translate-x-2"
                              : "text-pink-100/80 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom helper tip */}
          <div className="mt-6 text-center text-xs text-pink-300/70 tracking-wider">
            💡 Click "Play Song 🎵" or tap any lyric line to start playback!
          </div>
        </div>

      </div>
    </section>
  );
}

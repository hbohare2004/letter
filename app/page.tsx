"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, RotateCcw, Mail, Music2, Pause, Play } from "lucide-react";

const hearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  delay: (i % 7) * 1.1,
  duration: 9 + (i % 5) * 2,
  size: 10 + (i % 4) * 5,
  drift: ((i % 3) - 1) * 38,
}));

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicMessage, setMusicMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.15;

    const handlePlaying = () => {
      setIsMusicPlaying(true);
      setMusicMessage("");
    };
    const handlePause = () => setIsMusicPlaying(false);
    const handleError = () => {
      setIsMusicPlaying(false);
      setMusicMessage("Tap the music icon to play your song ♡");
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, []);

  const playMusic = () => {
    const audio = audioRef.current;
    if (!audio) {
      setMusicMessage("Tap the music icon to play your song ♡");
      return;
    }

    if (!audio.paused) return;
    audio.loop = true;
    audio.volume = 0.15;
    setMusicMessage("");
    void audio.play().catch(() => {
      setIsMusicPlaying(false);
      setMusicMessage("Tap the music icon to play your song ♡");
    });
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) {
      setMusicMessage("Tap the music icon to play your song ♡");
      return;
    }
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
    }
  };

  const openLetter = () => {
    if (opening || opened) return;
    playMusic();
    if (reduceMotion) {
      setOpened(true);
      return;
    }
    setOpening(true);
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, 900);
  };
  const resetLetter = () => {
    setOpened(false);
    setOpening(false);
  };

  return (
    <main className="love-page">
      <audio ref={audioRef} src="/khat.mp3" loop preload="none" hidden aria-hidden="true" />

      <div className="music-player">
        <button
          type="button"
          className="music-toggle"
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
          aria-pressed={isMusicPlaying}
          title={isMusicPlaying ? "Pause background music" : "Play background music"}
        >
          <Music2 size={16} aria-hidden="true" />
          {isMusicPlaying ? (
            <Pause size={14} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={14} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        {musicMessage && (
          <p className="music-message" role="status" aria-live="polite">
            {musicMessage}
          </p>
        )}
      </div>

      <div className="ambient-glow glow-one" aria-hidden="true" />
      <div className="ambient-glow glow-two" aria-hidden="true" />

      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="floating-heart"
            style={{ left: heart.left, fontSize: heart.size }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: reduceMotion ? ["0vh", "0vh"] : ["0vh", "-125vh"],
              x: reduceMotion ? 0 : [0, heart.drift, -heart.drift / 2, 0],
              opacity: reduceMotion ? 0.16 : [0, 0.42, 0.34, 0],
              rotate: reduceMotion ? 0 : [0, 12, -10, 0],
            }}
            transition={{
              duration: reduceMotion ? 1 : heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {heart.id % 3 === 0 ? "♡" : "♥"}
          </motion.span>
        ))}
      </div>

      {/* <header className="top-note">
        <span className="tiny-heart">♥</span>
        <span>made with a little extra love</span>
        <span className="tiny-heart">♥</span>
      </header> */}

      <section className="main-content" aria-live="polite">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="intro"
              className="intro-panel"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.55 }}
            >
              <div className="eyebrow">
                <Sparkles size={14} strokeWidth={1.6} />
                <span>FOR MY MADAM JI</span>
              </div>

              <h1>
                Hey, Bhumika<span className="pink-dot">.</span>
                <br />
                <em>This is for you.</em>
              </h1>

              <p className="intro-copy">
                A tiny letter, filled with all the things
                <br className="desktop-break" /> I don&apos;t always know how to say.
              </p>

              <div className="envelope-stage">
                <motion.button
                  type="button"
                  className="envelope-button"
                  onClick={openLetter}
                  aria-label="Open your love letter"
                  whileHover={reduceMotion || opening ? undefined : { y: -7, rotate: -1 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={opening}
                >
                  <motion.div
                    className="envelope"
                    animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="envelope-back" />
                    <motion.div
                      className="letter-peek"
                      animate={opening ? { y: -42, opacity: 1 } : { y: 0, opacity: 1 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>To my favourite person</span>
                      <Heart size={17} fill="currentColor" />
                    </motion.div>
                    <div className="envelope-front-left" />
                    <div className="envelope-front-right" />
                    <div className="envelope-front-bottom" />
                    <motion.div
                      className="envelope-flap"
                      style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                      animate={opening ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 4 }}
                      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                      className="wax-seal"
                      animate={opening ? { opacity: 0, scale: 0.7, y: -12 } : { opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <Heart size={24} fill="currentColor" strokeWidth={1.4} />
                    </motion.div>
                  </motion.div>
                </motion.button>
                <motion.div
                  className="envelope-shadow"
                  animate={reduceMotion ? undefined : { scaleX: [1, 0.9, 1], opacity: [0.2, 0.12, 0.2] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <motion.button
                type="button"
                className="open-prompt"
                onClick={openLetter}
                disabled={opening}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{opening ? "Opening your little letter…" : "Open your little surprise ♡"}</span>
                <span className="prompt-arrow">{opening ? "♡" : "↗"}</span>
              </motion.button>

              <p className="little-note">
                <Heart size={12} fill="currentColor" />
                no rush, take your time
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="letter-scene"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="letter-topline">
                <span><Mail size={13} /> A LETTER FOR YOU</span>
                <span className="letter-date  pr-17">with love, always</span>
              </div>

              <motion.article
                className="letter-paper"
                initial={{ rotate: 1.2, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.65 }}
              >
                <div className="paper-decoration decoration-top">✳</div>
                <div className="paper-decoration decoration-bottom">♡</div>
                <div className="letter-content">
                  <motion.p
                    className="letter-salutation"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    My dearest <b>Bhumika</b>,
                  </motion.p>

                  <motion.div
                    className="letter-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.58, duration: 0.9 }}
                  >
                    <p>
                      If I could give you one thing in this world, it would be
                      the ability to see yourself through my eyes. Then you
                      would understand just how special you are to me.
                    </p>
                    <p>
                      I hope you always remember that you don&apos;t have to be
                      perfect, or have everything figured out, to be loved.
                      On your happiest days, I want to celebrate with you. On
                      your difficult days, I want to be the person who reminds
                      you that you don&apos;t have to face everything alone.
                    </p>
                    <p>
                      I want to care about the little things — how your day
                      went, what made you smile, what&apos;s been on your mind,
                      and the things you find hard to say out loud. Your
                      happiness matters to me, and so does your peace.
                    </p>
                    <p>
                      No matter how busy life gets, I hope I can keep giving
                      you reasons to smile and making you feel appreciated,
                      safe, and cared for. You deserve a love that feels gentle,
                      honest, and real.
                    </p>
                    <p className="last-line">
                      And if you ever forget how much you mean to me, come
                      back to this little letter. I&apos;ll leave these words
                      here for you, whenever you need them. ♡
                    </p>
                  </motion.div>

                  <motion.div
                    className="letter-signoff"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05 }}
                  >
                    <span>With all my care,</span>
                    <strong>Someone who adores you</strong>
                    <span className="signature-heart">HARSH♥</span>
                  </motion.div>
                </div>
              </motion.article>

              <motion.p
                className="after-letter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
              >
                A little reminder, just for you: you are cherished. <span>♡</span>
              </motion.p>

              <button type="button" className="reopen-button" onClick={resetLetter}>
                <RotateCcw size={14} />
                Fold it back up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="page-footer">
        <span>♡</span> a little corner of my Laptop, just for you <span>♡</span>
      </footer>
    </main>
  );
}

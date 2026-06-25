// src/components/BackgroundMusic.jsx
import React, { useRef, useEffect, useState } from "react";

const BackgroundMusic = ({ src = "" }) => {
  const audioRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const maxLoops = 10;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial audio properties
    audio.volume = 0.3;
    audio.preload = "auto";

    // Handle when audio ends
    const handleEnded = () => {
      setPlayCount((prev) => {
        const newCount = prev + 1;
        if (newCount < maxLoops) {
          // Play again if we haven't reached max loops
          audio.currentTime = 0;
          audio.play().catch((err) => {
            console.log("Audio autoplay prevented:", err);
          });
          return newCount;
        } else {
          // Stop after 10 loops
          setIsPlaying(false);
          return newCount;
        }
      });
    };

    // Handle play/pause events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Auto-start music (may be blocked by browser)
    const startMusic = () => {
      if (playCount < maxLoops) {
        audio.play().catch((err) => {
          console.log(
            "Audio autoplay prevented. User interaction required:",
            err
          );
        });
      }
    };

    // Listen for any user interaction to start music
    const handleUserInteraction = () => {
      if (!isPlaying && playCount < maxLoops) {
        console.log("User interaction detected, starting music...");
        startMusic();
      }
    };

    // Listen for candle interactions specifically - this should trigger on hover
    const handleCandleInteraction = (event) => {
      console.log("Candle interaction detected:", event.type);
      if (!isPlaying && playCount < maxLoops) {
        console.log("Starting music from candle interaction...");
        startMusic();
      }
    };

    // Add event listeners for user interactions (one-time triggers)
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, { once: true });
    document.addEventListener("keydown", handleUserInteraction, { once: true });

    // Listen for custom candle events (can trigger multiple times)
    window.addEventListener("candleHover", handleCandleInteraction);
    window.addEventListener("candleClick", handleCandleInteraction);

    // Try to start immediately (will fail if autoplay is blocked)
    startMusic();

    // Cleanup
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);

      window.removeEventListener("candleHover", handleCandleInteraction);
      window.removeEventListener("candleClick", handleCandleInteraction);
    };
  }, [playCount, isPlaying]);

  // Manual play/pause controls (in case autoplay is blocked)
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playCount >= maxLoops) {
      // Reset if we've finished all loops
      setPlayCount(0);
      audio.currentTime = 0;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.log("Audio play failed:", err);
      });
    }
  };

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />

      {/* Music control button - Always visible */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-[9999] bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 border-2 border-white"
        title={
          isPlaying
            ? "Pause Music"
            : playCount >= maxLoops
            ? "Restart Music"
            : "Play Music"
        }
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
        style={{ minWidth: "56px", minHeight: "56px" }}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : playCount >= maxLoops ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;

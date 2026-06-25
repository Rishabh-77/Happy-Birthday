// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from "react";
import birthdayAudio from "../assets/hbd.mp3";

const BackgroundMusic = ({ playOn = false, src = birthdayAudio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(playOn);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((error) => {
      console.info("Music is ready; use the music button to start it.", error);
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleAllCandlesBlown = () => {
      setIsUnlocked(true);
      startMusic();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    window.addEventListener("allCandlesBlown", handleAllCandlesBlown);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("allCandlesBlown", handleAllCandlesBlown);
    };
  }, []);

  useEffect(() => {
    if (playOn) {
      setIsUnlocked(true);
      startMusic();
    }
  }, [playOn]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || !isUnlocked) return;

    if (isPlaying) {
      audio.pause();
    } else {
      startMusic();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" loop />
      <button
        type="button"
        onClick={toggleMusic}
        disabled={!isUnlocked}
        className="fixed top-4 left-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full border-4 border-black bg-white text-black shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-45"
        title={
          isUnlocked
            ? isPlaying
              ? "Pause music"
              : "Play music"
            : "Blow out all candles to unlock music"
        }
        aria-label={
          isUnlocked
            ? isPlaying
              ? "Pause background music"
              : "Play background music"
            : "Background music unlocks after all candles are blown out"
        }
      >
        {isPlaying ? (
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-5 w-1.5 rounded-sm bg-black" />
            <span className="h-5 w-1.5 rounded-sm bg-black" />
          </span>
        ) : (
          <span
            className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-black"
            aria-hidden="true"
          />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;

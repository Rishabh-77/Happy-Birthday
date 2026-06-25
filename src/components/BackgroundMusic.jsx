// src/components/BackgroundMusic.jsx
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import birthdayAudio from "../assets/hbd.mp3";

const BackgroundMusic = forwardRef(function BackgroundMusic(
  { playOn = false, src = birthdayAudio },
  ref,
) {
  const audioRef = useRef(null);
  const primedRef = useRef(false);
  const shouldPlayRef = useRef(playOn);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(playOn);

  const startCelebrationMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    shouldPlayRef.current = true;
    setIsUnlocked(true);
    audio.currentTime = 0;
    audio.muted = false;
    audio.volume = 0.3;

    try {
      await audio.play();
    } catch (error) {
      console.info(
        "The browser blocked audible autoplay. The music button is enabled.",
        error,
      );
    }
  }, []);

  const primeMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || primedRef.current || shouldPlayRef.current) return;

    audio.muted = true;
    audio.volume = 0;

    try {
      await audio.play();
      primedRef.current = true;
    } catch {
      // A later pointer/touch/keyboard action will retry.
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(!audio.muted);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsPlaying(!audio.paused && !audio.muted);
    const handleUserActivation = () => {
      void primeMusic();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("volumechange", handleVolumeChange);
    document.addEventListener("pointerdown", handleUserActivation, {
      capture: true,
    });
    document.addEventListener("touchstart", handleUserActivation, {
      capture: true,
      passive: true,
    });
    document.addEventListener("keydown", handleUserActivation, {
      capture: true,
    });

    // Muted autoplay is allowed by modern browsers and gives hover-only users
    // the best chance of seamless playback after the final candle.
    void primeMusic();

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("volumechange", handleVolumeChange);
      document.removeEventListener("pointerdown", handleUserActivation, {
        capture: true,
      });
      document.removeEventListener("touchstart", handleUserActivation, {
        capture: true,
      });
      document.removeEventListener("keydown", handleUserActivation, {
        capture: true,
      });
    };
  }, [primeMusic, startCelebrationMusic]);

  useEffect(() => {
    if (playOn && !shouldPlayRef.current) {
      void startCelebrationMusic();
    }
  }, [playOn, startCelebrationMusic]);

  useImperativeHandle(
    ref,
    () => ({
      playFromUserGesture: startCelebrationMusic,
    }),
    [startCelebrationMusic],
  );

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || !isUnlocked) return;

    if (audio.paused) {
      shouldPlayRef.current = true;
      audio.muted = false;
      audio.volume = 0.3;
      void audio.play();
    } else {
      shouldPlayRef.current = false;
      audio.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" loop playsInline />
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
});

export default BackgroundMusic;

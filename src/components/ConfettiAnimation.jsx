import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiAnimation = ({ onCandleBlow = false }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  const [showFullCelebration, setShowFullCelebration] = useState(false);
  const [fullCelebrationOpacity, setFullCelebrationOpacity] = useState(1);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle window resize for responsive confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger confetti on component mount (page load)
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const startTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 800);

    // Start fading out after 8 seconds for much longer celebration
    const fadeTimer = setTimeout(() => {
      setConfettiOpacity(0);
    }, 8000);

    // Completely stop confetti after fade completes
    const stopTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000); // Much longer total duration

    return () => {
      clearTimeout(startTimer);
      clearTimeout(fadeTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  // Listen for all candles blown event only
  useEffect(() => {
    const handleAllCandlesBlown = () => {
      console.log("All candles blown out - triggering full celebration!");
      setShowFullCelebration(true);
      setFullCelebrationOpacity(1);

      // Start fading out after 8 seconds (same as initial load)
      setTimeout(() => {
        setFullCelebrationOpacity(0);
      }, 8000);

      // Completely stop confetti after fade completes
      setTimeout(() => {
        setShowFullCelebration(false);
      }, 10000);
    };

    if (onCandleBlow) {
      window.addEventListener("allCandlesBlown", handleAllCandlesBlown);
      return () => {
        window.removeEventListener("allCandlesBlown", handleAllCandlesBlown);
      };
    }
  }, [onCandleBlow]);

  // Pink/white color scheme matching the design
  const confettiColors = [
    "#ec4899", // pink-500 - primary pink
    "#f472b6", // pink-400 - lighter pink
    "#fdf2f8", // pink-50 - very light pink
    "#ffffff", // white
    "#fbcfe8", // pink-200 - soft pink
    "#f9a8d4", // pink-300 - medium pink
  ];

  // Get cake position for candle confetti positioning
  

  return (
    <>
      {/* Initial page load confetti - Main burst */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={500} // Much more particles for spectacular celebration
          recycle={false} // Don't recycle particles - one-time celebration
          gravity={0.12} // Even slower gravity for longer celebration
          wind={0.015} // Gentle wind effect
          friction={0.995} // Very low friction for maximum particle life
          colors={confettiColors}
          confettiSource={{
            x: 0,
            y: 0,
            w: windowDimensions.width,
            h: 0, // Start from top of screen
          }}
          initialVelocityX={12} // Better horizontal spread
          initialVelocityY={18} // Better downward velocity
          tweenDuration={8000} // Much longer tween duration for smoother animation
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000, // Ensure confetti appears above all content
            pointerEvents: "none", // Don't interfere with page interactions
            opacity: confettiOpacity,
            transition: "opacity 2s ease-out", // Longer fade-out transition
          }}
        />
      )}

      {/* Additional confetti burst from left side */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
          wind={0.02}
          friction={0.996}
          colors={confettiColors}
          confettiSource={{
            x: 0,
            y: windowDimensions.height * 0.3,
            w: 100,
            h: 50,
          }}
          initialVelocityX={20} // Strong rightward velocity
          initialVelocityY={-15} // Upward burst
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: confettiOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      {/* Additional confetti burst from right side */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
          wind={-0.02}
          friction={0.996}
          colors={confettiColors}
          confettiSource={{
            x: windowDimensions.width - 100,
            y: windowDimensions.height * 0.3,
            w: 100,
            h: 50,
          }}
          initialVelocityX={-20} // Strong leftward velocity
          initialVelocityY={-15} // Upward burst
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: confettiOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      {/* Center cannon burst */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.08}
          wind={0.01}
          friction={0.997}
          colors={confettiColors}
          confettiSource={{
            x: windowDimensions.width * 0.5 - 50,
            y: windowDimensions.height * 0.8,
            w: 100,
            h: 20,
          }}
          initialVelocityX={25} // Strong horizontal spread
          initialVelocityY={-30} // Strong upward cannon blast
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: confettiOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      {/* FULL CELEBRATION - Same as initial load when all candles are blown */}
      {/* Full celebration - Main burst */}
      {showFullCelebration && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={500} // Same spectacular amount
          recycle={false}
          gravity={0.12}
          wind={0.015}
          friction={0.995}
          colors={confettiColors}
          confettiSource={{
            x: 0,
            y: 0,
            w: windowDimensions.width,
            h: 0,
          }}
          initialVelocityX={12}
          initialVelocityY={18}
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            pointerEvents: "none",
            opacity: fullCelebrationOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      {/* Full celebration - Left side burst */}
      {showFullCelebration && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
          wind={0.02}
          friction={0.996}
          colors={confettiColors}
          confettiSource={{
            x: 0,
            y: windowDimensions.height * 0.3,
            w: 100,
            h: 50,
          }}
          initialVelocityX={20}
          initialVelocityY={-15}
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: fullCelebrationOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      {/* Full celebration - Right side burst */}
      {showFullCelebration && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
          wind={-0.02}
          friction={0.996}
          colors={confettiColors}
          confettiSource={{
            x: windowDimensions.width - 100,
            y: windowDimensions.height * 0.3,
            w: 100,
            h: 50,
          }}
          initialVelocityX={-20}
          initialVelocityY={-15}
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: fullCelebrationOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      {/* Full celebration - Center cannon burst */}
      {showFullCelebration && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.08}
          wind={0.01}
          friction={0.997}
          colors={confettiColors}
          confettiSource={{
            x: windowDimensions.width * 0.5 - 50,
            y: windowDimensions.height * 0.8,
            w: 100,
            h: 20,
          }}
          initialVelocityX={25}
          initialVelocityY={-30}
          tweenDuration={8000}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: fullCelebrationOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}
    </>
  );
};

export default ConfettiAnimation;

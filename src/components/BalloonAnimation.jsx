import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const BalloonAnimation = ({ trigger = true, balloonCount = 6 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Start balloons after 1 second delay to coordinate with confetti
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);

      // Stop animation after 12 seconds
      const stopTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 13000);

      return () => {
        clearTimeout(timer);
        clearTimeout(stopTimer);
      };
    }
  }, [trigger]);

  // Balloon colors matching the birthday theme
  const balloonColors = [
    "#ec4899", // pink-500
    "#f472b6", // pink-400
    "#fb7185", // rose-400
    "#fbbf24", // amber-400
    "#a78bfa", // violet-400
    "#60a5fa", // blue-400
  ];

  // Generate balloon configurations optimized for 16:10/16:9 screens
  const generateBalloonConfig = (index) => {
    const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1920;
    const spacing = screenWidth / (balloonCount + 1);

    return {
      id: index,
      color: balloonColors[index % balloonColors.length],
      startX: spacing * (index + 1) - 40, // Center the balloon
      endX: spacing * (index + 1) - 40 + Math.sin(index) * 60, // Slight drift
      delay: index * 0.5, // Staggered by 0.5s
      duration: 8 + Math.sin(index) * 2, // 6-10 seconds
      rotation: Math.sin(index) * 10, // Gentle rotation
    };
  };

  // SVG Balloon Component
  const BalloonSVG = ({ color, size = 60 }) => (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 60 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Balloon body */}
      <ellipse
        cx={30}
        cy={25}
        rx={25}
        ry={30}
        fill={color}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />

      {/* Balloon highlight */}
      <ellipse cx={22} cy={18} rx={8} ry={12} fill="rgba(255,255,255,0.4)" />

      {/* Balloon knot */}
      <path d="M30 55 L28 58 L32 58 Z" fill={color} opacity={0.8} />

      {/* Balloon string */}
      <path
        d="M30 58 Q28 65 30 72 Q32 79 30 84"
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        opacity={0.7}
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {isAnimating &&
          Array.from({ length: balloonCount }, (_, index) => {
            const config = generateBalloonConfig(index);

            return (
              <motion.div
                key={`balloon-${config.id}`}
                className="absolute"
                style={{
                  left: config.startX,
                  bottom: -100,
                  willChange: "transform, opacity",
                }}
                initial={{
                  y: 0,
                  opacity: 0,
                  scale: 0.8,
                  rotate: 0,
                }}
                animate={{
                  y: -window.innerHeight - 200,
                  x: config.endX - config.startX,
                  opacity: [0, 1, 1, 0.8],
                  scale: [0.8, 1, 1.05, 1],
                  rotate: [0, config.rotation, -config.rotation, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.6,
                }}
                transition={{
                  duration: config.duration,
                  delay: config.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.1, 0.8, 1],
                }}
              >
                <BalloonSVG
                  color={config.color}
                  size={50 + (index % 3) * 10} // Size variation
                />
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default BalloonAnimation;

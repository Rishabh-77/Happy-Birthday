import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const InteractiveCake = () => {
  const [candles, setCandles] = useState([false, false, false, false, false]); // Track blown out candles
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCandleHover = (index) => {
    if (!candles[index]) {
      const newCandles = [...candles];
      newCandles[index] = true;
      setCandles(newCandles);

      // Check if all candles are blown out
      if (newCandles.every((candle) => candle)) {
        setShowCelebration(true);
        // Reset after 5 seconds
        setTimeout(() => {
          setCandles([false, false, false, false, false]);
          setShowCelebration(false);
        }, 5000);
      }
    }
  };

  const flameVariants = {
    lit: {
      scale: [1, 1.1, 0.9, 1.05, 1],
      opacity: [0.9, 1, 0.8, 1, 0.9],
      y: [0, -2, 1, -1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    blowOut: {
      scale: [1, 0.5, 0],
      opacity: [1, 0.5, 0],
      x: [0, 10, 20],
      y: [0, -5, -10],
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const celebrationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3 },
    },
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0, y: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -30, -60],
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Interactive Cake */}
      <motion.div
        className="relative cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        whileHover={{ scale: 1.03 }}
      >
        {/* Cake Base */}
        <div className="relative">
          {/* Bottom Layer */}
          <div className="w-48 h-20 md:w-56 md:h-24 lg:w-64 lg:h-28 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg shadow-lg border-4 border-amber-800">
            {/* Cake Decoration */}
            <div className="absolute inset-x-4 top-3 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute inset-x-6 top-8 h-1 bg-pink-500 rounded-full"></div>
            <div className="absolute inset-x-5 bottom-5 h-1 bg-pink-500 rounded-full"></div>
            {/* Decorative dots */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-yellow-300"
                style={{ left: `${15 + i * 10}%`, top: "50%" }}
              ></div>
            ))}
          </div>

          {/* Middle Layer */}
          <div className="absolute -top-5 left-4 right-4 h-16 bg-gradient-to-b from-pink-300 to-pink-500 rounded-lg shadow-md border-3 border-pink-400">
            <div className="absolute inset-x-3 top-2 h-1 bg-white rounded-full opacity-60"></div>
            <div className="absolute inset-x-4 top-6 h-1 bg-white rounded-full opacity-40"></div>
            {/* Decorative hearts */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute text-red-400"
                style={{ left: `${15 + i * 18}%`, top: "40%" }}
              >
                ❤️
              </div>
            ))}
          </div>

          {/* Top Layer */}
          <div className="absolute -top-10 left-8 right-8 h-12 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-md border-2 border-amber-300">
            <div className="absolute inset-x-2 top-1 h-1 bg-white rounded-full opacity-60"></div>
            {/* Decorative flowers */}
            <div className="absolute left-1/4 top-3 text-pink-300">🌸</div>
            <div className="absolute right-1/4 top-3 text-pink-300">🌸</div>
          </div>

          {/* Candles */}
          <div className="absolute -top-16 left-0 right-0 flex justify-center space-x-4 md:space-x-6">
            {candles.map((blownOut, index) => (
              <div key={index} className="relative">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm shadow-sm"></div>
                {/* Candle Flame */}
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
                  onMouseEnter={() => handleCandleHover(index)}
                >
                  <AnimatePresence>
                    {!blownOut && (
                      <motion.div
                        className="relative"
                        variants={flameVariants}
                        animate="lit"
                        exit="blowOut"
                      >
                        {/* Flame */}
                        <div className="w-4 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full opacity-90 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-transparent rounded-full opacity-60"></div>
                        </div>
                        {/* Flame Glow */}
                        <div className="absolute inset-0 w-7 h-7 -top-1 -left-1.5 bg-yellow-300 rounded-full opacity-30 blur-sm"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Smoke after blow out */}
                  <AnimatePresence>
                    {blownOut && (
                      <motion.div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.6, 0],
                          y: [0, -30, -60],
                          x: [0, 8, 15],
                          scale: [0.5, 1, 1.5],
                        }}
                        transition={{ duration: 2 }}
                      >
                        <div className="text-gray-400 text-xs">💨</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hover instruction */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p className="text-pink-600 text-sm font-medium">
            Hover over each candle to blow it out! 🎂
          </p>
        </motion.div>
      </motion.div>

      {/* Celebration Effects */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={celebrationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Sparkles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${5 + (i % 10) * 10}%`,
                  top: `${10 + Math.floor(i / 10) * 30}%`,
                }}
                variants={sparkleVariants}
              ></motion.div>
            ))}

            {/* Celebration Text */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-pink-500 text-center">
                🎉 Make a wish! Happy Birthday! 🎉
              </div>
            </motion.div>

            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: [
                    "#FF69B4",
                    "#FFD700",
                    "#00CED1",
                    "#FF6347",
                    "#98FB98",
                  ][Math.floor(Math.random() * 5)],
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 100, 200],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveCake;

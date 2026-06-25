import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const InteractiveCakeWithImage = ({
  candlesBlown,
  setCandlesBlown,
  onAllCandlesBlown,
}) => {
  // Convert array to Set for easier checking
  const blownOutFlames = new Set(
    candlesBlown
      .map((blown, index) => (blown ? index + 1 : null))
      .filter(Boolean)
  );

  const handleFlamePress = (flameId) => {
    if (blownOutFlames.has(flameId)) return;

    const newCandlesBlown = [...candlesBlown];
    newCandlesBlown[flameId - 1] = true;
    setCandlesBlown(newCandlesBlown);

    if (newCandlesBlown.every((candle) => candle)) {
      onAllCandlesBlown?.();
      window.dispatchEvent(new CustomEvent("allCandlesBlown"));
    }
  };

  const Flame = ({ candleId, isBlownOut }) => {
    return (
      <AnimatePresence>
        {!isBlownOut && (
          <motion.div
            className="absolute cursor-pointer"
            style={{
              bottom: "100%",
              left: "50%",
              marginLeft: "-10px",
              width: "20px",
              height: "25px",
              background:
                "radial-gradient(ellipse at bottom, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              zIndex: 10,
              boxShadow: "0 0 15px #FF9800, 0 0 30px #FF5722",
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.3 },
            }}
            onPointerDown={() => handleFlamePress(candleId)}
          >
            {/* Inner flame core */}
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "50%",
                marginLeft: "-5px",
                width: "10px",
                height: "15px",
                background:
                  "radial-gradient(ellipse at bottom, #FFFFFF 0%, #FFEB3B 100%)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              }}
            />
          </motion.div>
        )}
        {isBlownOut && (
          <motion.div
            className="absolute"
            style={{
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "30px",
              height: "30px",
              background:
                "radial-gradient(circle, rgba(200,200,200,0.8) 0%, transparent 70%)",
              borderRadius: "50%",
              opacity: 0,
            }}
            initial={{ opacity: 0.6, scale: 0.5, y: 0 }}
            animate={{
              opacity: 0,
              scale: 2,
              y: -50,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    );
  };

  const Candle = ({ candleId }) => {
    return (
      <div className="relative">
        {/* Candle body */}
        <div
          className="relative shadow-md"
          style={{
            width: "15px",
            height: "50px",
            background: "linear-gradient(180deg, #FFF8DC 0%, #FFE4B5 100%)",
            borderRadius: "3px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {/* Candle top */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-sm"
            style={{
              width: "17px",
              height: "10px",
              background: "#FFD700",
              borderRadius: "50%",
            }}
          />
          {/* Wax drips */}
          <div
            className="absolute top-2 left-1 w-2 h-4"
            style={{
              background: "linear-gradient(to bottom, #FFE4B5, #FFD700)",
              borderRadius: "0 0 50% 50%",
            }}
          />
          <div
            className="absolute top-8 right-1 w-1.5 h-3"
            style={{
              background: "linear-gradient(to bottom, #FFE4B5, #FFD700)",
              borderRadius: "0 0 50% 50%",
            }}
          />
        </div>
        {/* Flame */}
        <Flame candleId={candleId} isBlownOut={blownOutFlames.has(candleId)} />
      </div>
    );
  };

  // Flower component for decorations
  const Flower = ({ size, top, left, color }) => {
    return (
      <div
        className="absolute"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: `${size}px`,
          height: `${size}px`,
          zIndex: 5,
        }}
      >
        {/* Flower petals */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size * 0.4}px`,
              height: `${size * 0.4}px`,
              background: `radial-gradient(circle, ${color}, ${color}dd)`,
              top: `${size * 0.3}px`,
              left: `${size * 0.3}px`,
              transform: `rotate(${i * 72}deg) translateX(${size * 0.3}px)`,
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          />
        ))}
        {/* Flower center */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${size * 0.3}px`,
            height: `${size * 0.3}px`,
            background: "radial-gradient(circle, #FFD700, #FFA500)",
            top: `${size * 0.35}px`,
            left: `${size * 0.35}px`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    );
  };

  // Leaf component
  const Leaf = ({ top, left, rotation }) => {
    return (
      <div
        className="absolute"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: "15px",
          height: "8px",
          background: "linear-gradient(135deg, #228B22, #32CD32)",
          borderRadius: "0 100% 0 100%",
          transform: `rotate(${rotation}deg)`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          zIndex: 4,
        }}
      />
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Cake Container */}
      <motion.div
        className="relative"
        style={{ width: "400px", height: "280px" }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Bottom Layer - White with pink accents */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 shadow-xl"
          style={{
            bottom: "0",
            width: "350px",
            height: "100px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%)",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        >
          {/* Icing */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -top-5 w-full"
            style={{
              height: "30px",
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFC0CB 100%)",
              borderRadius: "50%",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          >
            {/* Icing drips */}
            {[20, 70, 120, 170, 220, 270, 320].map((left) => (
              <div
                key={left}
                className="absolute"
                style={{
                  width: "15px",
                  height: "15px",
                  top: "15px",
                  left: `${left}px`,
                  background: "linear-gradient(135deg, #FFFFFF, #FFC0CB)",
                  borderRadius: "0 0 50% 50%",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </div>

          {/* Flower decorations */}
          <Flower size={30} top={20} left={50} color="#FF69B4" />
          <Flower size={30} top={25} left={150} color="#FFB6C1" />
          <Flower size={30} top={20} left={250} color="#FF69B4" />

          {/* Leaves */}
          <Leaf top={40} left={40} rotation={-30} />
          <Leaf top={35} left={60} rotation={20} />
          <Leaf top={45} left={140} rotation={45} />
          <Leaf top={40} left={160} rotation={-20} />
          <Leaf top={40} left={240} rotation={-45} />
          <Leaf top={35} left={260} rotation={30} />

          {/* Pearl accents */}
          {[100, 200, 300].map((left, i) => (
            <div
              key={i}
              className="absolute rounded-full shadow-inner"
              style={{
                width: "10px",
                height: "10px",
                top: "15px",
                left: `${left}px`,
                background:
                  "radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          ))}
        </div>

        {/* Middle Layer - Pink with white accents */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 shadow-lg"
          style={{
            bottom: "90px",
            width: "280px",
            height: "80px",
            background: "linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 100%)",
            borderRadius: "8px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Icing */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-full"
            style={{
              height: "25px",
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFC0CB 100%)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {/* Icing drips */}
            {[30, 80, 130, 180, 230].map((left) => (
              <div
                key={left}
                className="absolute"
                style={{
                  width: "12px",
                  height: "12px",
                  top: "12px",
                  left: `${left}px`,
                  background: "linear-gradient(135deg, #FFFFFF, #FFC0CB)",
                  borderRadius: "0 0 50% 50%",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </div>

          {/* Flower decorations */}
          <Flower size={25} top={15} left={70} color="#FFFFFF" />
          <Flower size={25} top={20} left="50%" color="#FFFFFF" />
          <Flower size={25} top={15} left={190} color="#FFFFFF" />

          {/* Leaves */}
          <Leaf top={30} left={60} rotation={-45} />
          <Leaf top={25} left={80} rotation={30} />
          <Leaf top={35} left={130} rotation={60} />
          <Leaf top={30} left={150} rotation={-30} />
          <Leaf top={30} left={180} rotation={-60} />
          <Leaf top={25} left={200} rotation={45} />

          {/* Decorative piping */}
          <div
            className="absolute rounded-full"
            style={{
              width: "8px",
              height: "8px",
              top: "10px",
              left: "40px",
              background: "radial-gradient(circle, #FFFFFF, #F0F8FF)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "8px",
              height: "8px",
              top: "12px",
              left: "240px",
              background: "radial-gradient(circle, #FFFFFF, #F0F8FF)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Top Layer - White with pink flowers */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 shadow-md"
          style={{
            bottom: "160px",
            width: "200px",
            height: "60px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%)",
            borderRadius: "6px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          }}
        >
          {/* Icing */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-full"
            style={{
              height: "20px",
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFC0CB 100%)",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {/* Icing drips */}
            {[30, 80, 130, 180].map((left) => (
              <div
                key={left}
                className="absolute"
                style={{
                  width: "10px",
                  height: "10px",
                  top: "10px",
                  left: `${left}px`,
                  background: "linear-gradient(135deg, #FFFFFF, #FFC0CB)",
                  borderRadius: "0 0 50% 50%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </div>

          {/* Center flower decoration */}
          <Flower size={40} top={10} left="50%" color="#FF69B4" />

          {/* Small flowers */}
          <Flower size={20} top={15} left={30} color="#FFB6C1" />
          <Flower size={20} top={15} left={150} color="#FFB6C1" />

          {/* Leaves */}
          <Leaf top={25} left={25} rotation={-60} />
          <Leaf top={20} left={35} rotation={15} />
          <Leaf top={25} left={145} rotation={60} />
          <Leaf top={20} left={155} rotation={-15} />

          {/* Mini pearls */}
          {[60, 140].map((left, i) => (
            <div
              key={i}
              className="absolute rounded-full shadow-inner"
              style={{
                width: "8px",
                height: "8px",
                top: "10px",
                left: `${left}px`,
                background:
                  "radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            />
          ))}
        </div>

        {/* Candles with increased spacing */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex"
          style={{ bottom: "220px", gap: "14px" }}
        >
          {[1, 2, 3, 4, 5].map((candleId) => (
            <Candle key={candleId} candleId={candleId} />
          ))}
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="mt-8 text-center"
        style={{ color: "#FF69B4" }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-xl font-semibold">
          Click or tap each flame to blow out the candles.
        </p>
      </motion.div>

      {/* Progress indicator */}
      <div className="mt-4 flex space-x-2">
        {[1, 2, 3, 4, 5].map((candleId) => (
          <div
            key={candleId}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              blownOutFlames.has(candleId)
                ? "bg-gray-400"
                : "bg-yellow-400 animate-pulse"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-sm mt-2" style={{ color: "#FF69B4" }}>
        {blownOutFlames.size}/5 candles blown out
      </p>
    </div>
  );
};

export default InteractiveCakeWithImage;

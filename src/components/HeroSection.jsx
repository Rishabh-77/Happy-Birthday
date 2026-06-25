import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import InteractiveCakeWithImage from "./InteractiveCakeWithImage";

const HeroSection = ({
  recipientName = "[RECIPIENT NAME]",
  age = "[AGE]",
  heroImage = null,
  candlesBlown,
  setCandlesBlown,
}) => {

  // Animation variants for the text entrance effects
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth entrance
        staggerChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 1.5, // Delay to appear after text animation
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative hp-victus-hero flex flex-col items-center justify-start pt-16 md:pt-20 lg:pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Main Birthday Greeting */}
      <motion.div
        className="text-center mb-6 md:mb-8 lg:mb-10"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Happy Birthday Text with staggered animation */}
        <motion.div className="overflow-hidden">
          <motion.h1
            className="text-birthday-pink-500 font-bold leading-tight mb-4 md:mb-6 lg:mb-8 animate-optimized"
            variants={wordVariants}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 7rem)",
              textShadow: "0 4px 8px rgba(236, 72, 153, 0.3)",
            }}
          >
            Happy {age} Birthday, {recipientName}! 🎉
          </motion.h1>
        </motion.div>

      </motion.div>

      {/* Interactive Birthday Cake */}
      <div className="mb-8 md:mb-10 lg:mb-12">
        <InteractiveCakeWithImage 
          candlesBlown={candlesBlown}
          setCandlesBlown={setCandlesBlown}
        />
      </div>

      {/* Birthday Hero Image - Only show if heroImage is provided */}
      {heroImage && (
        <motion.div
          className="relative max-w-md md:max-w-lg lg:max-w-xl hp-victus:max-w-2xl"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Birthday celebration"
              className="w-full h-auto object-cover animate-optimized"
              style={{
                aspectRatio: "4/3",
                maxHeight: "400px",
              }}
              onError={(e) => {
                // Fallback for missing image
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}

          {/* Fallback placeholder when no image is provided or image fails to load */}
          <div
            className="w-full h-full bg-gradient-to-br from-birthday-pink-100 to-birthday-pink-200 flex flex-col items-center justify-center text-birthday-pink-600 text-xl md:text-2xl lg:text-3xl font-semibold rounded-2xl"
            style={{
              display: heroImage ? "none" : "flex",
              aspectRatio: "4/3",
              maxHeight: "400px",
              minHeight: "300px",
            }}
          >

          </div>
        </div>

        {/* Decorative elements around the image */}
        <motion.div
          className="absolute -top-4 -right-4 text-4xl md:text-5xl lg:text-6xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 text-4xl md:text-5xl lg:text-6xl"
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          
        </motion.div>

        <motion.div
          className="absolute -top-4 -left-4 text-3xl md:text-4xl lg:text-5xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -right-4 text-3xl md:text-4xl lg:text-5xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          
        </motion.div>
      </motion.div>
      )}


    </section>
  );
};

export default HeroSection;

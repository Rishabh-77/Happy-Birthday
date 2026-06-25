// src/components/MessageSection.jsx
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MessageSection = ({
  message = ["[WRITE YOUR BIRTHDAY MESSAGE HERE.]"],
  author = "[YOUR NAME]",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px", // Trigger animation when section is 100px from viewport
  });

  const messageLines = Array.isArray(message)
    ? message.filter((line) => line.trim() !== "")
    : message.split("\n").filter((line) => line.trim() !== "");

  // Photo cards data for left and right decorations
  const decorativePhotos = [
    {
      id: "left-1",
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template decorative photo placeholder",
      rotation: -8,
      position: "left",
      caption: "[CAPTION]",
      delay: 1.6,
    },
    {
      id: "left-2",
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template decorative photo placeholder",
      rotation: 5,
      position: "left-lower",
      caption: "[CAPTION]",
      delay: 1.8,
    },
    {
      id: "right-1",
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template decorative photo placeholder",
      rotation: 7,
      position: "right",
      caption: "[CAPTION]",
      delay: 2.0,
    },
    {
      id: "right-2",
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template decorative photo placeholder",
      rotation: -4,
      position: "right-lower",
      caption: "[CAPTION]",
      delay: 2.2,
    },
  ];

  // Position styles for photo cards
  const getPhotoPosition = (position) => {
    switch (position) {
      case "left":
        return "absolute left-4 md:left-8 lg:left-12 top-1/4 -translate-y-1/2 hidden lg:block";
      case "left-lower":
        return "absolute left-8 md:left-16 lg:left-20 top-3/4 -translate-y-1/2 hidden xl:block";
      case "right":
        return "absolute right-4 md:right-8 lg:right-12 top-1/3 -translate-y-1/2 hidden lg:block";
      case "right-lower":
        return "absolute right-8 md:right-16 lg:right-20 top-2/3 -translate-y-1/2 hidden xl:block";
      default:
        return "";
    }
  };

  return (
    <section
      ref={ref}
      className="relative hp-victus-section overflow-hidden"
      aria-label="Personal birthday message"
    >
      {/* Decorative Photo Cards */}
      {decorativePhotos.map((photo) => (
        <motion.div
          key={photo.id}
          className={`polaroid cursor-pointer z-10 ${getPhotoPosition(
            photo.position
          )}`}
          style={{
            transform: `rotate(${photo.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: photo.delay,
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            zIndex: 20,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-32 h-40 md:w-36 md:h-44 lg:w-40 lg:h-48 overflow-hidden">
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="200" height="240" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f3f4f6"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="12">
                      Photo
                    </text>
                  </svg>
                `)}`;
              }}
            />
          </div>
          <div className="text-center text-gray-700 text-xs md:text-sm mt-1 font-handwriting">
            {photo.caption}
          </div>
        </motion.div>
      ))}

      <div className="text-center max-w-2xl lg:max-w-4xl hp-victus:max-w-5xl mx-auto content-spacing relative z-5">
        {/* Section Header */}
        <motion.h2
          className="text-gray-800 mb-6 md:mb-8 lg:mb-10 hp-victus:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          A Special Message
        </motion.h2>

        {/* Message Content */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 hp-victus:p-12 shadow-lg"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  y: 50,
                  scale: 0.95,
                }
          }
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
          }}
        >
          {/* Message Text */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6 hp-victus:space-y-8">
            {messageLines.map((line, index) => (
              <motion.p
                key={index}
                className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl hp-victus:text-2xl font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.6 + index * 0.1,
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Author Signature */}
          <motion.div
            className="mt-8 md:mt-10 lg:mt-12 hp-victus:mt-16 pt-6 md:pt-8 lg:pt-10 hp-victus:pt-12 border-t border-birthday-pink-200"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 1.2,
            }}
          >
            <p className="text-birthday-pink-600 font-handwriting text-lg md:text-xl lg:text-2xl hp-victus:text-3xl font-bold">
              From,
            </p>
            <p className="text-birthday-pink-700 font-handwriting text-xl md:text-2xl lg:text-3xl hp-victus:text-4xl font-bold mt-2">
              {author}
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center items-center mt-8 md:mt-10 lg:mt-12 hp-victus:mt-16 space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 1.4,
          }}
        >
          <span className="text-2xl md:text-3xl lg:text-4xl hp-victus:text-5xl">
            🎈
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl hp-victus:text-6xl">
            💝
          </span>
          <span className="text-2xl md:text-3xl lg:text-4xl hp-victus:text-5xl">
            🎈
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageSection;

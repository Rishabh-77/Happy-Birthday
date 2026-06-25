// src/components/MemoryLane.jsx

import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { validatePhotoData } from "../utils/photoUtils";

/**
 * MemoryLane Component - Photo gallery with polaroid styling and scattered layout
 *
 * Props Interface:
 * @param {Array} photos - Array of photo objects with structure:
 *   - id: string|number - Unique identifier
 *   - src: string - Image source URL
 *   - alt: string - Alt text for accessibility
 *   - rotation: number - Rotation angle in degrees (-5 to 5 recommended)
 *   - position: {x: number, y: number} - Position as percentage (0-100)
 *   - caption?: string - Optional caption text
 *
 * Requirements fulfilled:
 * - 3.1: Displays 4-5 photos in polaroid-style frames
 * - 3.2: Applies polaroid styling with white borders and shadows
 * - 3.3: Arranges photos in scattered, organic layout
 * - 3.4: Ensures proper sizing and aspect ratio maintenance
 */
const MemoryLane = ({ photos = [] }) => {
  const displayPhotos = validatePhotoData(photos) ? photos : [];

  // Animation variants for staggered photo appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const photoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative hp-victus-section">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16 lg:mb-20 -mt-16 md:-mt-20 lg:-mt-24"
      >
        <h2 className="text-gray-800 mb-4">Memory Lane</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Replace these template cards with moments you want to celebrate.
        </p>
      </motion.div>

      {/* Photo Gallery Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full h-[1000px] md:h-[1700px] lg:h-[2200px] hp-victus:h-[2500px] overflow-hidden"
      >
        {displayPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={photoVariants}
            className="absolute polaroid cursor-pointer"
            style={{
              left: `${photo.position.x}%`,
              top: `${photo.position.y}%`,
              transform: `translate(-50%, -50%) rotate(${photo.rotation}deg)`,
              zIndex: photo.id,
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-48 h-56 md:w-56 md:h-64 lg:w-64 lg:h-72 hp-victus:w-72 hp-victus:h-80 overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Fallback for failed image loads
                  e.target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#f3f4f6"/>
                      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="16">
                        Photo ${photo.id}
                      </text>
                    </svg>
                  `)}`;
                }}
              />
            </div>

            {/* Optional caption area at bottom of polaroid */}
            <div className="text-center text-gray-700 text-sm md:text-base mt-2 font-handwriting">
              {photo.caption || `Memory ${photo.id}`}
            </div>
          </motion.div>
        ))}
        {displayPhotos.length === 0 && (
          <p className="text-center text-gray-600">
            [ADD PHOTO ENTRIES IN src/templateContent.js]
          </p>
        )}
      </motion.div>

      {/* Background decoration - subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-pink-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-pink-200 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-pink-100 rounded-full"></div>
      </div>
    </section>
  );
};

export default MemoryLane;

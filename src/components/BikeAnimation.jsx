// src/components/BikeAnimation.jsx

import React, { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/**
 * BikeAnimation Component - Animated bike that weaves between photos
 * 
 * Props Interface:
 * @param {Array} photoPositions - Array of photo position objects with x, y coordinates (percentages)
 * @param {boolean} isVisible - Whether the Memory Lane section is in view to trigger animation
 * @param {number} duration - Animation duration in seconds (default: 18)
 * 
 * Requirements fulfilled:
 * - 4.1: Displays animated bike moving around photos
 * - 4.2: Follows path that weaves between and around polaroid photos
 * - 4.4: Smooth, natural movement optimized for HP Victus screen dimensions
 */
const BikeAnimation = ({ 
  photoPositions = [], 
  isVisible = false, 
  duration = 18
}) => {
  // DEBUG: Log animation state
  console.log('BikeAnimation render:', { isVisible, photoPositions: photoPositions.length, duration });
  // Default photo positions if none provided (matching MemoryLane default layout)
  const defaultPhotoPositions = [
    { x: 15, y: 10 },
    { x: 45, y: 5 },
    { x: 75, y: 10 },
    { x: 25, y: 50 },
    { x: 65, y: 40 }
  ];

  const positions = photoPositions.length > 0 ? photoPositions : defaultPhotoPositions;

  // Bike SVG component - Enhanced design for better visibility
  const BikeSVG = ({ className = "" }) => (
    <svg 
      width="48" 
      height="32" 
      viewBox="0 0 48 32" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bike frame - main triangle */}
      <path 
        d="M10 24 L18 8 L28 24 M18 8 L24 8 L26 14 M18 14 L24 14" 
        stroke="#2d3748" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Front wheel */}
      <circle 
        cx="38" 
        cy="24" 
        r="6" 
        stroke="#2d3748" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Front wheel spokes */}
      <path 
        d="M32 24 L44 24 M38 18 L38 30 M34 20 L42 28 M42 20 L34 28" 
        stroke="#2d3748" 
        strokeWidth="0.5" 
        strokeLinecap="round"
      />
      
      {/* Back wheel */}
      <circle 
        cx="10" 
        cy="24" 
        r="6" 
        stroke="#2d3748" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Back wheel spokes */}
      <path 
        d="M4 24 L16 24 M10 18 L10 30 M6 20 L14 28 M14 20 L6 28" 
        stroke="#2d3748" 
        strokeWidth="0.5" 
        strokeLinecap="round"
      />
      
      {/* Chain and pedal */}
      <circle 
        cx="18" 
        cy="20" 
        r="1.5" 
        fill="#2d3748"
      />
      
      {/* Handlebar */}
      <path 
        d="M24 8 L26 6 M24 8 L26 10" 
        stroke="#2d3748" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Seat */}
      <path 
        d="M16 8 L22 8" 
        stroke="#2d3748" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      
      {/* Connecting frame to front wheel */}
      <path 
        d="M26 14 L38 24" 
        stroke="#2d3748" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Motion lines for speed effect */}
      <path 
        d="M2 16 L6 16 M1 20 L5 20 M2 28 L6 28" 
        stroke="#ec4899" 
        strokeWidth="1" 
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );

  // Calculate keyframe positions for smooth weaving animation
  const animationKeyframes = useMemo(() => {
    const keyframes = { x: [], y: [], rotate: [] };
    
    // Start off-screen left
    keyframes.x.push("-5%");
    keyframes.y.push("20%");
    keyframes.rotate.push(0);
    
    // Weave around each photo position
    positions.forEach((photo, index) => {
      // Calculate weaving offset - alternate sides
      const offsetX = photo.x + (index % 2 === 0 ? -12 : 12);
      const offsetY = photo.y + (index % 2 === 0 ? 8 : -8);
      
      // Clamp to screen bounds
      const clampedX = Math.max(5, Math.min(95, offsetX));
      const clampedY = Math.max(5, Math.min(85, offsetY));
      
      keyframes.x.push(`${clampedX}%`);
      keyframes.y.push(`${clampedY}%`);
      
      // Add rotation for natural movement
      const rotation = (index % 2 === 0 ? 1 : -1) * (10 + Math.sin(index) * 5);
      keyframes.rotate.push(rotation);
    });
    
    // Add flowing intermediate points
    keyframes.x.push("85%", "20%", "50%");
    keyframes.y.push("70%", "80%", "85%");
    keyframes.rotate.push(15, -10, 5);
    
    // End off-screen right
    keyframes.x.push("105%");
    keyframes.y.push("25%");
    keyframes.rotate.push(0);
    
    return keyframes;
  }, [positions]);

  // DEBUG: Log keyframes
  console.log('Animation keyframes:', animationKeyframes);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* DEBUG: Always show a static bike for testing */}
      <div className="absolute top-4 left-4 z-20 bg-yellow-200 p-2 text-xs">
        DEBUG: isVisible={isVisible.toString()}, photos={positions.length}
      </div>
      
      {/* Animated bike using Framer Motion keyframes */}
      {isVisible && (
        <motion.div
          className="absolute z-10"
          initial={{ 
            x: animationKeyframes.x[0], 
            y: animationKeyframes.y[0],
            rotate: animationKeyframes.rotate[0]
          }}
          animate={{
            x: animationKeyframes.x,
            y: animationKeyframes.y,
            rotate: animationKeyframes.rotate
          }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{
            transformOrigin: "center center"
          }}
          onAnimationStart={() => console.log('Bike animation started')}
        >
          <BikeSVG className="drop-shadow-lg" />
        </motion.div>
      )}
      
      {/* DEBUG: Static bike for visibility testing */}
      <div className="absolute top-20 left-20 z-10">
        <BikeSVG className="drop-shadow-lg border border-red-500" />
      </div>
    </div>
  );
};

export default BikeAnimation;

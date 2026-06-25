import React from 'react';

// --- A library of our 2 cloud shapes ---
const cloudSVGs = {
  // 1. Your original fluffy cloud
  fluffy: (
    <>
      <path
        d="M20 35 C5 35, 5 20, 15 15 C15 10, 25 5, 35 10 C40 5, 55 5, 60 10 C70 5, 85 10, 85 20 C95 20, 95 35, 80 35 Z"
        fill="#ffffff"
      />
      <circle cx="25" cy="25" r="8" fill="#ffffff" />
      <circle cx="45" cy="20" r="10" fill="#ffffff" />
      <circle cx="65" cy="25" r="9" fill="#ffffff" />
      <circle cx="75" cy="30" r="7" fill="#ffffff" />
    </>
  ),
  // 2. The new cumulus cloud, adapted from your Vexels link
  cumulus: (
    <path
      d="M15 45 H 85 C 95 45, 100 35, 85 30 C 80 15, 70 5, 55 10 C 45 0, 30 5, 20 15 C 5 20, 5 35, 15 45 Z"
      fill="#ffffff"
    />
  ),
};

// Keyframes for the animation, including the opacity fix to hide during delay
const keyframes = `
  @keyframes cloudFloat {
    0% {
      transform: translateX(-150%) translateY(-50%);
      opacity: 0;
    }
    5%, 95% {
      opacity: 1;
    }
    100% {
      transform: translateX(1100%) translateY(-50%);
      opacity: 0;
    }
  }
`;

const CloudAnimation = ({ 
  speed = 20, 
  size = 'medium', 
  opacity = 0.15,
  delay = 0,
  type = 'fluffy' // Add the 'type' prop, with 'fluffy' as the default
}) => {

  const sizeConfig = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 160, height: 80 }
  };

  const cloudSize = sizeConfig[size] || sizeConfig.medium;

  // Select the correct SVG from our library based on the 'type' prop
  const SelectedCloudSVG = cloudSVGs[type] || cloudSVGs.fluffy;

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <style>{keyframes}</style>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          opacity,
          // We apply the animation defined in our keyframes
          animationName: 'cloudFloat',
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDelay: `${delay}s`,
          
          // This is the crucial fix to hide the cloud during its delay period
          animationFillMode: 'backwards',
          
          willChange: 'transform, opacity'
        }}
      >
        <svg
          width={cloudSize.width}
          height={cloudSize.height}
          viewBox="0 0 100 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
            overflow: 'visible'
          }}
        >
          {SelectedCloudSVG}
        </svg>
      </div>
    </div>
  );
};

export default CloudAnimation;
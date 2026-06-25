// src/App.jsx

import { useRef, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BackgroundMusic from "./components/BackgroundMusic";
import ConfettiAnimation from "./components/ConfettiAnimation";
import BalloonAnimation from "./components/BalloonAnimation";
import MemoryLane from "./components/MemoryLane";
import MessageSection from "./components/MessageSection";
import { templateContent } from "./templateContent";

function App() {
  const musicRef = useRef(null);
  // Manage candle state at app level to control locked sections
  const [candlesBlown, setCandlesBlown] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const allCandlesBlown = candlesBlown.every((candle) => candle);
  return (
    // We use a React Fragment (<>...</>) to wrap everything.
    <>
      {/* 
        FIX: All overlay components are moved here, BEFORE the main content div.
        This prevents the `overflow-x-hidden` on the content div from trapping
        the fixed-position animations. This is the most robust way to solve
        stacking context issues.
      */}
      <BackgroundMusic ref={musicRef} playOn={allCandlesBlown} />
      <ConfettiAnimation onCandleBlow={true} />
      <BalloonAnimation trigger={true} balloonCount={6} />

      {/* 
        This div now ONLY contains your visible page content. 
      */}
      <div className="min-h-screen bg-gradient-to-b from-birthday-pink-50 to-white overflow-x-hidden">
        {/* Header Section - Animated clouds - Full width */}
        <Header />

        {/* Hero Section - Birthday greeting with animations - Full width, no container padding */}
        <div className="-mt-8 md:-mt-12 lg:-mt-16">
          <HeroSection
            recipientName={templateContent.recipientName}
            age={templateContent.age}
            candlesBlown={candlesBlown}
            setCandlesBlown={setCandlesBlown}
            onAllCandlesBlown={() =>
              musicRef.current?.playFromUserGesture()
            }
          />
        </div>

        {/* Main Layout Container - Optimized for HP Victus 16" (16:9 aspect ratio) */}
        <div className="hp-victus-container">

          {/* Memory Lane Section - Polaroid photos with scattered layout */}
          <MemoryLane
            photos={templateContent.photos}
            isLocked={!allCandlesBlown}
          />

          {/* Personal Message Section */}
          <MessageSection
            message={templateContent.message}
            author={templateContent.senderName}
            isLocked={!allCandlesBlown}
          />

          {/* Footer */}
          <footer className="py-6 md:py-8 lg:py-10 text-center text-gray-600">
            <p className="text-base md:text-lg lg:text-xl">
              {templateContent.footerText}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;

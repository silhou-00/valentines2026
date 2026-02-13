"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const steps = [
  "Update Sephirah Protocol",
  "Refine PE-Boxes",
  "Assign TT2 Component",
  "Activate Enkephalin",
  "Accelerate TT2",
  "DAY 14",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000); 
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 1000);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 overflow-hidden ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-[400px] w-full flex flex-col items-center justify-center">
        {steps.map((step, index) => {
          // Calculate offset relative to current step
          const offset = index - currentStep;
          
          return (
            <div 
              key={index} 
              className={`absolute transition-all duration-700 ease-in-out flex flex-col items-center justify-center w-full`}
              style={{
                transform: `translateY(${offset * 80}px)`, // 80px vertical spacing
                opacity: index === currentStep ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.4), // Fade out further items
                scale: index === currentStep ? 1 : Math.max(0.5, 1 - Math.abs(offset) * 0.1), // Scale down further items
                zIndex: 10 - Math.abs(offset), // Layering
                filter: index === currentStep ? 'none' : `blur(${Math.abs(offset) * 2}px)`
              }}
            >
              <p
                className={`font-norwester tracking-widest transition-all duration-300 ${
                  index === currentStep
                    ? "text-4xl text-[#4ffbfb] drop-shadow-[0_0_10px_rgba(79,251,251,0.5)]" 
                    : "text-2xl text-[#1d5c5c]" 
                }`}
              >
                {step}
              </p>
               {/* Horizontal lines for active step */}
              {index === currentStep && (
                  <div className="w-[500px] h-px bg-[#4ffbfb] mt-4 animate-pulse transition-all duration-500 shadow-[0_0_10px_#4ffbfb]" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* FINAL DAY 14 OVERLAY */}
      {currentStep === steps.length - 1 && (
         <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 animate-flash-bang">
             <h1 className="font-norwester text-8xl text-[#4ffbfb] animate-pulse drop-shadow-[0_0_30px_#4ffbfb]">DAY 14</h1>
         </div>
      )}

      {/* Logo Bottom Left */}
      <div className="absolute bottom-10 left-10 flex flex-col items-start opacity-80">
          <div className="flex items-center gap-4">
              {/* Simple Brain Logo SVG placeholder if image not available */}
             <svg width="60" height="60" viewBox="0 0 100 100" className="fill-[#4ffbfb]">
                <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z M50 20 C65 20 80 35 80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20 Z" />
                <path d="M50 30 L50 70 M30 50 L70 50" stroke="black" strokeWidth="5" />
             </svg>
             <div className="flex flex-col">
                 <span className="font-norwester text-3xl text-[#1d5c5c]">LOBOTOMY VALENTINE</span>
                 <span className="font-mono text-sm text-[#1d5c5c] tracking-widest">FACE THE FEAR, MAKE THE FUTURE</span>
             </div>
          </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] bg-repeat" />
    </div>
  );
}

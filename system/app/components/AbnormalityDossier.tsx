"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Abnormality {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  flavourText: string;
  stats: {
    instinct: string;
    insight: string;
    attachment: string;
    repression: string;
  };
  image: string;
}

export default function AbnormalityDossier({
  abnormality,
  onBack,
}: {
  abnormality: Abnormality;
  onBack: () => void;
}) {
  const [showRisk, setShowRisk] = useState(false);
  const [showPortrait, setShowPortrait] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  useEffect(() => {
    // Reset state when abnormality changes if used in same component instance
    setShowRisk(false);
    setShowPortrait(false);
    setShowText(false);
    setShowStats(false);
    
    // Sequence
    const t1 = setTimeout(() => setShowRisk(true), 500);
    const t2 = setTimeout(() => setShowPortrait(true), 1000);
    const t3 = setTimeout(() => setShowText(true), 1500);
    const t4 = setTimeout(() => setShowStats(true), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [abnormality]);

  return (
    <div className="flex w-full max-w-6xl flex-col items-start gap-8 p-8 md:flex-row bg-black/80 backdrop-blur-md rounded-xl border border-zinc-800 shadow-2xl">
      {/* Left Column: Portrait */}
      <div className="relative h-[400px] w-full shrink-0 overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-900 md:w-[300px]">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showPortrait ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={abnormality.image}
            alt={abnormality.name}
            fill
            className="object-cover"
          />
          {/* Glitch Overlay */}
          <div className="pointer-events-none absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-20" />
        </div>
      </div>

      {/* Right Column: Data */}
      <div className="flex flex-1 flex-col gap-6 w-full">
        {/* Header: Name and Risk Level */}
        <div className="relative flex items-center justify-between border-b-2 border-red-900 pb-4">
          <div className="flex items-center gap-4">
             <button 
                onClick={onBack}
                className="group flex items-center justify-center rounded border border-red-900 bg-black/50 px-4 py-2 font-norwester text-red-600 transition-all hover:bg-red-900/20 hover:text-red-500"
             >
                <span className="mr-2 text-xl">←</span> BACK
             </button>
             <h1 className="font-norwester text-4xl text-white tracking-wider">
               {abnormality.name.toUpperCase()}
             </h1>
          </div>

          {/* Risk Level Stamp */}
          {showRisk && (
            <div className="absolute right-0 top-0 rotate-[-5deg] animate-stamp-slam border-4 border-red-600 px-4 py-1 text-2xl font-bold text-red-600 opacity-0 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              {abnormality.riskLevel}
            </div>
          )}
        </div>

        {/* Flavour Text / Description */}
        <div className="min-h-[100px] font-mono text-zinc-300">
          {showText && (
            <p className="animate-text-type overflow-hidden whitespace-nowrap text-lg">
              {abnormality.flavourText}
            </p>
          )}
           {showText && (
             <p className="mt-4 text-sm text-zinc-500 italic">
               "{abnormality.description}"
             </p>
           )}
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 gap-4 transition-all duration-700 ease-out ${
            showStats ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {Object.entries(abnormality.stats).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between bg-zinc-900/50 p-3 rounded border border-zinc-800"
            >
              <span className="font-norwester text-zinc-400 uppercase tracking-widest">{key}</span>
              <span
                className={`font-bold ${
                  value === "Very High" || value === "Max"
                    ? "text-red-500"
                    : value === "High"
                    ? "text-orange-400"
                    : "text-zinc-300"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

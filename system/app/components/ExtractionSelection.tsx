"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import abnormalities from "../data/abnormalities.json";
import EmployeeCharacter from "./EmployeeCharacter";

const DRAG_THRESHOLD = 150; // pixels down to trigger extract

export default function ExtractionSelection({
  onExtract,
}: {
  onExtract: (abnormalityId: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [holdingId, setHoldingId] = useState<string | null>(null);
  const [dragY, setDragY] = useState(0);
  const [extracted, setExtracted] = useState(false);

  const startYRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleExtract = useCallback((id: string) => {
    if (isExtracting) return;
    setSelectedId(id);
    setIsExtracting(true);
    setExtracted(true);

    setTimeout(() => {
      onExtract(id);
    }, 500);
  }, [isExtracting, onExtract]);

  const handlePointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if (isExtracting) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startYRef.current = e.clientY;
    isDraggingRef.current = true;
    setHoldingId(id);
    setDragY(0);
  }, [isExtracting]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || !holdingId || isExtracting) return;
    const deltaY = e.clientY - startYRef.current;
    // Only allow dragging downward
    setDragY(Math.max(0, deltaY));

    if (deltaY > DRAG_THRESHOLD) {
      isDraggingRef.current = false;
      handleExtract(holdingId);
    }
  }, [holdingId, isExtracting, handleExtract]);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current && !extracted) {
      // Released before threshold — snap back
      setHoldingId(null);
      setDragY(0);
    }
    isDraggingRef.current = false;
  }, [extracted]);

  // Calculate drag progress (0 to 1)
  const dragProgress = Math.min(dragY / DRAG_THRESHOLD, 1);

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-8 md:gap-32 bg-[url('/background/LobCorp.png')] bg-cover bg-center">
      
      {/* Overlay grid/texture */}
      <div className="pointer-events-none absolute inset-0 bg-black/30 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />

      {/* Playable Employee Character */}
      <EmployeeCharacter />

      {/* Top Re-Extraction Sign */}
      <button 
        onClick={() => { setShowError(true); setTimeout(() => setShowError(false), 3000); }}
        className="absolute top-10 flex items-center justify-center border-4 border-yellow-100 bg-black px-8 py-2 shadow-lg z-50 cursor-pointer hover:bg-zinc-900 hover:border-yellow-300 transition-all active:scale-95"
      >
          <span className="font-norwester text-2xl text-yellow-100 tracking-widest">EXTRACT ABNORMALITY</span>
          <div className="absolute inset-x-0 -bottom-2 h-2 bg-[repeating-linear-gradient(45deg,black,black_0.625rem,#fbbf24_0.625rem,#fbbf24_1.25rem)] border-t border-black" />
      </button>

      {/* Drag instruction hint */}
      {!isExtracting && !holdingId && (
        <div className="absolute bottom-16 z-50 flex flex-col items-center animate-pulse">
          <span className="font-norwester text-lg text-zinc-500 tracking-widest">HOLD & DRAG DOWN TO EXTRACT</span>
          <svg className="w-6 h-6 text-zinc-500 mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-red-900/90 border-4 border-red-500 px-16 py-8 shadow-[0_0_3.125rem_rgba(220,38,38,0.6)] animate-pulse">
            <span className="font-norwester text-5xl md:text-7xl text-red-300 tracking-widest">ERROR - Commitment Enabled</span>
          </div>
        </div>
      )}

      {abnormalities.map((item) => (
        <div
          key={item.id}
          className={`relative group cursor-grab active:cursor-grabbing transition-all select-none scale-90 md:scale-100 ${
            isExtracting && selectedId !== item.id
              ? "opacity-0 -translate-y-20 pointer-events-none duration-500"
              : "duration-300"
          } ${
            isExtracting && selectedId === item.id
              ? "z-50 pointer-events-none"
              : ""
          } ${
            holdingId === item.id && dragY === 0
              ? "animate-shake-violent z-50"
              : holdingId === item.id && dragY > 0
                ? "z-50"
                : !isExtracting ? "hover:scale-105 animate-shake-subtle hover:animate-none" : ""
          }`}
          style={{
            transform: holdingId === item.id || (extracted && selectedId === item.id)
              ? `translateY(${extracted ? '150vh' : `${dragY}px`}) ${holdingId === item.id ? `rotate(${dragProgress * 3}deg)` : ''}`
              : undefined,
            transition: extracted && selectedId === item.id
              ? 'transform 1s ease-in'
              : holdingId === item.id
                ? 'none'
                : undefined,
          }}
          onPointerDown={(e) => handlePointerDown(e, item.id)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Cable */}
          <div
            className={`absolute -top-[100vh] left-1/2 w-4 -translate-x-1/2 duration-500 bg-[#2a2a2a] border-x border-black z-0 ${
               isExtracting && selectedId !== item.id ? "-translate-y-20" : ""
            }`}
          />
          
          {/* Main Container for the Unit */}
          <div className="relative w-80 flex flex-col items-center select-none">
            
             {/* Backing Plate / Outline Material */}
             <div className="absolute -inset-4 bg-[#111] rounded-xl -z-10 border-4 border-black group-hover:bg-[#fbf6d9] transition-colors duration-300" style={{ clipPath: "polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)" }} />


             {/* --- TOP MECHANISM CLUSTER --- */}
             <div className="relative w-full h-24 -mt-16 mb-[-1.25rem] z-10 flex justify-center items-end">
                 {/* Big Gear Left */}
                 <div className="absolute left-[-0.625rem] bottom-4 w-20 h-20 rounded-full bg-[#1a1a1a] border-4 border-black flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-[#333] bg-[#0a0a0a]" />
                    <div className="absolute -top-4 w-4 h-12 bg-black rotate-45" />
                 </div>
                 {/* Medium Gear Right */}
                 <div className="absolute right-0 bottom-8 w-16 h-16 rounded-full bg-[#1a1a1a] border-4 border-black flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#555] bg-[#222]" />
                 </div>
                 {/* Small Connecting Gears/Pipes */}
                 <div className="absolute left-16 bottom-10 w-24 h-4 bg-black rounded-full border border-gray-600" />
                 <div className="absolute top-0 right-10 w-12 h-12 rounded-full bg-[#2a2a2a] border-4 border-black z-[-1]" />
             </div>


             {/* --- NAME LABEL --- */}
             <div className="relative z-20 w-[110%] rotate-[-2deg] border-4 border-black bg-black px-2 py-3 text-center shadow-lg skew-x-[-5deg] group-hover:bg-[#fefce0] transition-colors duration-300">
                 <span className="font-norwester text-3xl text-zinc-500 block tracking-normal leading-none stroke-black stroke-2 group-hover:text-black transition-colors duration-300">{item.name}</span>
             </div>


             {/* --- MAIN BLACK BOX --- */}
             <div className="relative z-10 w-full h-72 border-[0.375rem] border-black bg-black p-2 mt-[-0.625rem] shadow-xl">
                 {/* Inner Frame */}
                 <div className="relative h-full w-full overflow-hidden border-2 border-zinc-600 bg-[#0a0a0a]">
                     
                     {/* Screen Content */}
                     <div className="absolute inset-0 flex items-center justify-center">
                         {/* Red Eye */}
                         <div className={`w-16 h-16 rounded-full bg-[#300] border-4 border-[#200] shadow-none z-20 transition-all duration-300 ${
                           holdingId === item.id
                             ? "animate-pulse scale-125 bg-[#ff0000] border-[#500] shadow-[0_0_3.125rem_#f00]"
                             : isExtracting && selectedId === item.id 
                               ? "animate-pulse scale-125 bg-[#ff0000] border-[#500] shadow-[0_0_1.25rem_#f00]" 
                               : "group-hover:scale-110 group-hover:bg-[#ff0000] group-hover:border-[#500] group-hover:shadow-[0_0_3.125rem_#f00]"
                         }`}>
                            <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-50" />
                         </div>
                         
                         {/* EKG Line / Noise */}
                         <div className="absolute bottom-10 inset-x-0 h-1 bg-red-900 opacity-20 group-hover:opacity-50 transition-opacity" />
                         <div className="absolute bottom-10 inset-x-0 h-16 bg-gradient-to-t from-red-900/10 to-transparent group-hover:from-red-900/20 transition-all" />
                     </div>

                     {/* Glass Reflection */}
                     <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-white/5 rotate-45 blur-xl pointer-events-none group-hover:bg-white/10 transition-colors" />
                     
                     {/* Scratches/Texture */}
                     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/scratch-pattern.png')] mix-blend-overlay" />
                 </div>

                 {/* Side Vents */}
                 <div className="absolute bottom-2 -right-3 flex flex-col gap-1">
                     <div className="w-2 h-4 bg-zinc-800 border border-black" />
                     <div className="w-2 h-4 bg-zinc-800 border border-black" />
                     <div className="w-2 h-4 bg-zinc-800 border border-black" />
                 </div>
             </div>


             {/* --- BOTTOM MECHANISM CLUSTER --- */}
             <div className="relative w-full h-16 -mt-4 z-20 flex justify-center items-start">
                 {/* Bottom Gear Left */}
                 <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border-4 border-black -ml-10 mt-2 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full" />
                 </div>
                 {/* Bottom Gear Center */}
                 <div className="w-10 h-10 rounded-full bg-[#222] border-4 border-black mt-6 -ml-2" />
                 {/* Pipes */}
                 <div className="absolute bottom-0 right-10 w-4 h-12 bg-black skew-x-12" />
             </div>

          </div>

          {/* Hover Glow */}
          <div className={`absolute inset-0 -z-20 scale-110 rounded-full blur-3xl transition-all duration-300 ${
            holdingId === item.id 
              ? "bg-red-500/30" 
              : "bg-[#fbbf24]/0 group-hover:bg-[#fbbf24]/20"
          }`} />
        </div>
      ))}


    </div>
  );
}


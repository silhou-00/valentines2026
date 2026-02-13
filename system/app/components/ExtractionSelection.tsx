"use client";

import { useState } from "react";
import Image from "next/image";
import abnormalities from "../data/abnormalities.json";

export default function ExtractionSelection({
  onExtract,
}: {
  onExtract: (abnormalityId: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtract = (id: string) => {
    if (isExtracting) return;
    setSelectedId(id);
    setIsExtracting(true);

    setTimeout(() => {
      onExtract(id);
    }, 2500); 
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-8 md:gap-32 bg-[url('/background/LobCorp.png')] bg-cover bg-center">
      
      {/* Overlay grid/texture */}
      <div className="pointer-events-none absolute inset-0 bg-black/30 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />

      {/* Top Re-Extraction Sign */}
      <div className="absolute top-10 flex items-center justify-center border-4 border-yellow-100 bg-black px-8 py-2 shadow-lg z-50">
          <span className="font-norwester text-2xl text-yellow-100 tracking-widest">FIXED EXTRACTION</span>
          <div className="absolute inset-x-0 -bottom-2 h-2 bg-[repeating-linear-gradient(45deg,black,black_0.625rem,#fbbf24_0.625rem,#fbbf24_1.25rem)] border-t border-black" />
      </div>

      {abnormalities.map((item) => (
        <div
          key={item.id}
          className={`relative group cursor-pointer transition-all duration-500 scale-90 md:scale-100 ${
            isExtracting && selectedId !== item.id
              ? "opacity-0 -translate-y-20 pointer-events-none"
              : ""
          } ${
            isExtracting && selectedId === item.id
              ? "animate-shake-violent z-50"
              : "hover:scale-105 animate-shake-subtle hover:animate-none"
          }`}
          onClick={() => handleExtract(item.id)}
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
             {/* Default: Black/Dark. Hover: Beige */}
             <div className="absolute -inset-4 bg-[#111] rounded-xl -z-10 border-4 border-black group-hover:bg-[#fbf6d9] transition-colors duration-300" style={{ clipPath: "polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)" }} />


             {/* --- TOP MECHANISM CLUSTER --- */}
             <div className="relative w-full h-24 -mt-16 mb-[-1.25rem] z-10 flex justify-center items-end">
                 {/* Big Gear Left */}
                 <div className="absolute left-[-0.625rem] bottom-4 w-20 h-20 rounded-full bg-[#1a1a1a] border-4 border-black flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-[#333] bg-[#0a0a0a]" />
                    <div className="absolute -top-4 w-4 h-12 bg-black rotate-45" /> {/* Pipe */}
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
             {/* Default: Black bg, White/Gray text. Hover: Beige bg, Black text */}
             <div className="relative z-20 w-[110%] rotate-[-2deg] border-4 border-black bg-black px-2 py-3 text-center shadow-lg skew-x-[-5deg] group-hover:bg-[#fefce0] transition-colors duration-300">
                 <span className="font-norwester text-3xl text-zinc-500 block tracking-normal leading-none stroke-black stroke-2 group-hover:text-black transition-colors duration-300">{item.name}</span>
             </div>


             {/* --- MAIN BLACK BOX --- */}
             <div className="relative z-10 w-full h-72 border-[0.375rem] border-black bg-black p-2 mt-[-0.625rem] shadow-xl">
                 {/* Inner Frame */}
                 <div className="relative h-full w-full overflow-hidden border-2 border-zinc-600 bg-[#0a0a0a]">
                     
                     {/* Screen Content */}
                     <div className="absolute inset-0 flex items-center justify-center">
                         {/* Red Eye (Dim by default, bright on hover) */}
                         <div className={`w-16 h-16 rounded-full bg-[#300] border-4 border-[#200] shadow-none z-20 transition-all duration-300 ${isExtracting && selectedId === item.id ? "animate-pulse scale-125 bg-[#ff0000] border-[#500] shadow-[0_0_1.25rem_#f00]" : "group-hover:scale-110 group-hover:bg-[#ff0000] group-hover:border-[#500] group-hover:shadow-[0_0_3.125rem_#f00]"}`}>
                            <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-50" />
                         </div>
                         
                         {/* EKG Line / Noise - Only visible on hover? Or dim? Let's keep dim */}
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
          <div className="absolute inset-0 -z-20 scale-110 bg-[#fbbf24]/0 rounded-full blur-3xl transition-all duration-300 group-hover:bg-[#fbbf24]/20" />
        </div>
      ))}

      {/* Flash Bang Overlay */}
      {isExtracting && (
        <div className="pointer-events-none fixed inset-0 z-100 animate-flash-bang bg-white opacity-0" />
      )}
    </div>
  );
}

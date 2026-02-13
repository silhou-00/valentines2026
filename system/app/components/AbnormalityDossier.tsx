"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Abnormality {
  id: string;
  name: string;
  code?: string;
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
  managerialTips?: string[];
  workResults?: {
    good: string;
    normal: string;
    bad: string;
  };
  qliphothCounter?: number;
  damageType?: string;
  eBoxOutput?: number;
  ego?: {
    weapon: string;
    suit: string;
    gift: string;
  };
}

export default function AbnormalityDossier({
  abnormality,
  onBack,
}: {
  abnormality: Abnormality;
  onBack: () => void;
}) {
  const [showContent, setShowContent] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const damageColor = 
    abnormality.damageType === "RED" ? "text-red-500" :
    abnormality.damageType === "WHITE" ? "text-white" :
    abnormality.damageType === "BLACK" ? "text-purple-400" :
    abnormality.damageType === "PALE" ? "text-cyan-300" : "text-gray-400";

  return (
    <div className={`relative w-full max-w-[95vw] h-[90vh] bg-black border-2 border-red-900/50 flex flex-col overflow-hidden transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(50,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

      {/* --- TOP HEADER --- */}
      <div className="relative z-10 flex h-16 items-center border-b-2 border-red-600 bg-gradient-to-r from-red-900/80 to-transparent px-6">
          <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-black">
                  <span className="font-norwester text-2xl text-red-500">L</span>
              </div>
              <div className="flex flex-col">
                  <span className="font-norwester text-3xl text-red-500 leading-none">ABNORMALITY DETAILS</span>
                  <span className="font-mono text-xs text-red-300 tracking-[0.3em]">LOBOTOMY CORPORATION DATABASE</span>
              </div>
          </div>
          
          <div className="ml-auto flex gap-4">
              <div className="px-6 py-2 bg-red-600 text-black font-norwester text-xl skew-x-12 border-r-4 border-black">ABNORMALITY DETAILS</div>
              <div className="px-6 py-2 bg-black text-zinc-600 font-norwester text-xl skew-x-12 border border-zinc-800">ABNORMALITY STORY</div>
          </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
          
          {/* LEFT SIDEBAR (Stats) */}
          <div className="hidden xl:flex w-24 flex-col gap-8 pt-10">
              <div className="flex flex-col gap-2">
                  <div className="h-12 w-2 bg-red-600" />
                  <span className="font-norwester text-2xl text-white -rotate-90 origin-bottom-left translate-x-8">Speed Rate +4</span>
              </div>
              <div className="flex flex-col gap-2">
                   <div className="h-12 w-2 bg-red-600/50" />
                   <span className="font-norwester text-2xl text-white/50 -rotate-90 origin-bottom-left translate-x-8">Success Rate +4%</span>
              </div>
              <div className="mt-auto mb-10">
                  <h3 className="font-norwester text-xl text-yellow-500 mb-2 rotate-[-5deg]">OBSERVATION LEVEL 4</h3>
                  <div className="flex gap-1">
                      {[1,2,3,4].map(i => <div key={i} className="w-4 h-8 bg-yellow-500 border border-black" />)}
                      <div className="w-4 h-8 bg-zinc-800 border border-black" />
                  </div>
              </div>
          </div>


          {/* COLUMN 2: BASIC INFO */}
          <div className="flex flex-col w-[350px] shrink-0 gap-2">
              <div className="bg-[#1a1a1a] border-t-4 border-yellow-500 px-2 py-1 text-center font-norwester text-yellow-500 text-sm">ABNORMALITY BASIC INFORMATION</div>
              
              <div className="relative border-2 border-zinc-600 bg-black p-4">
                  {/* Portrait */}
                  <div className="relative w-full aspect-square border-4 border-[#2a2a2a] bg-[#1a1a1a] mb-2 overflow-hidden group">
                      <Image 
                        src={abnormality.image} 
                        alt={abnormality.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      {/* Scanline */}
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-30 pointer-events-none" />
                  </div>

                  {/* Name & ID */}
                  <div className="bg-[#1a1a1a] border border-zinc-700 p-2 flex justify-between items-center mb-4">
                      <span className="font-norwester text-xl text-white truncate">{abnormality.name}</span>
                      <span className={`font-norwester text-xl ${
                          abnormality.riskLevel === "ALEPH" ? "text-red-600" : 
                          abnormality.riskLevel === "WAW" ? "text-purple-500" : 
                          "text-yellow-500"
                      }`}>{abnormality.riskLevel}</span>
                  </div>
                   
                  <div className="flex justify-between items-end border-b border-zinc-700 pb-2 mb-2">
                      <span className="font-mono text-zinc-500 text-sm">{abnormality.code || "O-00-00"}</span>
                      <span className={`font-norwester text-2xl ${
                          abnormality.riskLevel === "ALEPH" ? "text-red-600" : "text-yellow-500"
                      }`}>{abnormality.riskLevel}</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="border-l-2 border-zinc-700 pl-2">
                          <span className="font-norwester text-xs text-zinc-500 block">Attack Type</span>
                          <span className={`font-norwester text-lg ${damageColor}`}>{abnormality.damageType || "RED"}</span> 
                          <span className="font-mono text-xs text-zinc-600 ml-2">1-5</span>
                      </div>
                      <div className="border-l-2 border-zinc-700 pl-2">
                           <span className="font-norwester text-xs text-zinc-500 block">E-Box Output</span>
                           <span className="font-norwester text-3xl text-white">{abnormality.eBoxOutput || 20}</span>
                      </div>
                  </div>

                  {/* Work Results */}
                  <div className="mt-6 space-y-2">
                      <div className="flex items-center text-xs font-mono gap-2 text-zinc-400 mb-1 border-b border-zinc-800 pb-1">
                          <span>Work Result</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"/> <span className="text-green-500">Good</span></div>
                          <span className="font-mono text-green-500">{abnormality.workResults?.good || "15-20"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"/> <span className="text-yellow-500">Normal</span></div>
                          <span className="font-mono text-yellow-500">{abnormality.workResults?.normal || "10-14"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/> <span className="text-red-500">Bad</span></div>
                          <span className="font-mono text-red-500">{abnormality.workResults?.bad || "0-9"}</span>
                      </div>
                  </div>
                  
                  {/* Gallery Button */}
                  <button 
                    onClick={() => setShowGallery(true)}
                    className="mt-6 w-full py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-300 font-norwester text-sm tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                      <span>📷</span> VIEW GALLERY
                  </button>

              </div>
          </div>


          {/* COLUMN 3: MIDDLE (Tips & Flavor) */}
          <div className="hidden lg:flex flex-col flex-1 gap-4">
               {/* Managerial Tips */}
               <div className="border-2 border-[#b08d55] bg-black/50 p-1">
                   <div className="bg-[#b08d55] text-black font-norwester text-sm px-2 py-1 mb-2 inline-block">Managerial Tips</div>
                   <div className="flex flex-col gap-4 p-4 h-[300px] overflow-y-auto custom-scrollbar">
                       {abnormality.managerialTips ? (
                           abnormality.managerialTips.map((tip, i) => (
                               <div key={i} className="border border-[#b08d55]/30 p-3 bg-black/80">
                                   <span className="text-[#b08d55] font-norwester text-xs block mb-1">Managerial Tip {i+1}</span>
                                   <p className="text-zinc-300 font-mono text-sm leading-relaxed">{tip}</p>
                               </div>
                           ))
                       ) : (
                           <p className="text-zinc-500 italic">No managerial tips available.</p>
                       )}
                   </div>
               </div>

               {/* Work Favor Table */}
               <div className="flex-1 border-2 border-zinc-700 bg-black/50 p-4 flex flex-col items-center justify-center">
                    <h3 className="font-norwester text-yellow-100 mb-4 border-b border-yellow-100/30 pb-2 w-full text-center">ABNORMALITY WORK FAVOR</h3>
                    <div className="grid grid-cols-4 gap-4 w-full h-full">
                        {['Instinct', 'Insight', 'Attachment', 'Repression'].map((type) => (
                            <div key={type} className="border border-zinc-800 bg-zinc-900/50 p-2 flex flex-col items-center">
                                <span className="font-norwester text-xs text-zinc-500 mb-2 uppercase">{type} Work List</span>
                                {/* Icon placeholder */}
                                <div className={`w-10 h-10 mb-2 rounded border-2 ${
                                    type === 'Instinct' ? 'border-red-900 bg-red-900/20' :
                                    type === 'Insight' ? 'border-blue-900 bg-blue-900/20' :
                                    type === 'Attachment' ? 'border-purple-900 bg-purple-900/20' :
                                    'border-cyan-900 bg-cyan-900/20'
                                }`} />
                                
                                <div className="w-full space-y-1">
                                    {['I', 'II', 'III', 'IV', 'V'].map((level) => (
                                        <div key={level} className="flex justify-between text-[10px] font-mono text-zinc-400 border-b border-zinc-800 pb-1">
                                            <span>{level}</span>
                                            <span className={
                                                (abnormality.stats as any)[type.toLowerCase()]?.includes('High') || (abnormality.stats as any)[type.toLowerCase()] === 'Max' ? 'text-green-500' : 
                                                (abnormality.stats as any)[type.toLowerCase()]?.includes('Low') ? 'text-red-500' : 'text-yellow-500'
                                            }>
                                                {(abnormality.stats as any)[type.toLowerCase()] || "Common"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
               </div>
          </div>


          {/* COLUMN 4: RIGHT SIDEBAR */}
          <div className="flex flex-col w-[300px] shrink-0 gap-4">
               {/* Qliphoth Counter */}
               <div className="border-2 border-[#b08d55] bg-black p-4 flex flex-col items-center relative">
                   <span className="absolute top-[-10px] bg-black px-2 text-[#b08d55] font-norwester text-sm">Qliphoth Counter</span>
                   <span className="font-norwester text-6xl text-white mt-2">{abnormality.qliphothCounter || 0}</span>
               </div>

               {/* Defenses */}
               <div className="border-2 border-[#b08d55] bg-black p-2">
                   <span className="text-[#b08d55] font-norwester text-xs block text-center mb-2 border-b border-[#b08d55]/30">Abnormality Defense</span>
                   <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                       <div className="flex justify-between px-2 text-red-500"><span>RED</span> <span>0.8</span></div>
                       <div className="flex justify-between px-2 text-white"><span>WHITE</span> <span>1.2</span></div>
                       <div className="flex justify-between px-2 text-purple-500"><span>BLACK</span> <span>0.5</span></div>
                       <div className="flex justify-between px-2 text-cyan-400"><span>PALE</span> <span>2.0</span></div>
                   </div>
               </div>

               {/* E.G.O Information */}
               <div className="flex-1 flex flex-col gap-2">
                   <h3 className="text-right font-norwester text-xl text-white border-b-2 border-white mb-2">E.G.O GIFT</h3>
                   <div className="h-20 border border-zinc-700 bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                       <span className="z-10 font-norwester text-zinc-500">{abnormality.ego?.gift || "unknown"}</span>
                       <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5" />
                   </div>

                   <div className="grid grid-cols-2 gap-2 mt-2">
                       <div className="flex flex-col">
                           <h3 className="text-center font-norwester text-sm text-red-500 border-b border-red-500 mb-1">E.G.O WEAPON</h3>
                           <div className="h-32 border border-red-900 bg-black flex flex-col items-center justify-center p-2 text-center">
                                <div className="w-12 h-12 bg-red-900/20 rounded-full mb-2" />
                                <span className="font-mono text-xs text-red-300">{abnormality.ego?.weapon || "Weapon"}</span>
                           </div>
                       </div>
                       <div className="flex flex-col">
                           <h3 className="text-center font-norwester text-sm text-blue-500 border-b border-blue-500 mb-1">E.G.O SUIT</h3>
                           <div className="h-32 border border-blue-900 bg-black flex flex-col items-center justify-center p-2 text-center">
                                <div className="w-12 h-12 bg-blue-900/20 rounded-full mb-2" />
                                <span className="font-mono text-xs text-blue-300">{abnormality.ego?.suit || "Suit"}</span>
                           </div>
                       </div>
                   </div>
               </div>
               
               {/* Unique PE-Boxes & Leave */}
               <div className="mt-auto flex justify-between items-end">
                   <div className="relative w-24 h-24">
                        {/* Spinny PE Box thing */}
                        <div className="absolute inset-0 border-4 border-yellow-400 rotate-45 bg-black animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-2 border-4 border-yellow-600 -rotate-12 bg-black animate-[spin_8s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 flex items-center justify-center font-norwester text-2xl text-yellow-400 z-10 font-bold drop-shadow-[0_0_10px_yellow]">
                            {abnormality.eBoxOutput ? abnormality.eBoxOutput * 10 : 999}
                        </div>
                        <span className="absolute -bottom-6 w-full text-center font-norwester text-xs text-yellow-500">UNIQUE PE-BOXES</span>
                   </div>

                   <button 
                    onClick={onBack}
                    className="bg-red-600 hover:bg-red-500 text-black font-norwester text-4xl px-8 py-2 skew-x-[-10deg] shadow-[0_0_20px_red] transition-all hover:scale-105 active:scale-95"
                   >
                       LEAVE
                   </button>
               </div>
          </div>

      </div>


      {/* --- GALLERY MODAL --- */}
      {showGallery && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-10 animate-fade-in">
              <div className="flex justify-between items-center mb-10 border-b border-zinc-700 pb-4">
                  <h2 className="font-norwester text-4xl text-white">OBSERVATION RECORDS</h2>
                  <button onClick={() => setShowGallery(false)} className="text-zinc-500 hover:text-white font-norwester text-2xl">CLOSE [X]</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto">
                  {/* Placeholder Gallery Items */}
                  {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="aspect-square bg-zinc-900 border-2 border-zinc-800 relative group overflow-hidden cursor-pointer">
                          <Image src={abnormality.image} alt="Gallery" fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                          <div className="absolute bottom-0 inset-x-0 bg-black/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                              <span className="text-xs font-mono text-zinc-400">Record #{i}</span>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-auto text-center font-mono text-zinc-600 text-sm pt-4">
                  WARNING: OBSERVATION MAY CAUSE MENTAL CORRUPTION
              </div>
          </div>
      )}

    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sword, Shirt, Gift } from "lucide-react";
import EmployeeCharacter from "./EmployeeCharacter";

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
  galleryImages?: string[];
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

  const getWorkIcon = (type: string) => {
      switch(type) {
          case 'Instinct': return '/abnormality/WorkType/Instinct.png';
          case 'Insight': return '/abnormality/WorkType/Insight.png';
          case 'Attachment': return '/abnormality/WorkType/Attachment.png';
          case 'Repression': return '/abnormality/WorkType/JusticeIcon.png';
          default: return '/abnormality/WorkType/Instinct.png';
      }
  }

  return (
    <div className={`fixed inset-0 z-50 w-full h-full bg-black border-4 border-red-900/50 flex flex-col overflow-hidden transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
      
      {/* Playable Employee Character - Hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <EmployeeCharacter 
            idleSprite="/employee_sprite/StartWork.gif"
            walkingSprite="/employee_sprite/WorkProcess.gif"
        />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(50,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,0,0,0.1)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-50" />

      {/* --- TOP HEADER --- */}
      <div className="relative z-10 flex h-16 shrink-0 items-center border-b-2 border-red-600 bg-gradient-to-r from-red-900/80 to-transparent px-4">
          <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-black shadow-[0_0_0.9375rem_red]">
                  <span className="font-norwester text-[1.5rem] text-red-500">L</span>
              </div>
              <div className="flex flex-col">
                  <span className="font-norwester text-[1.25rem] lg:text-[1.5rem] xl:text-[2rem] text-red-500 leading-none drop-shadow-md whitespace-nowrap">ABNORMALITY DETAILS</span>
                  <span className="font-mono text-[0.75rem] text-red-300 tracking-[0.3em]">LOBOTOMY CORPORATION DATABASE</span>
              </div>
          </div>
          
          <div className="ml-auto flex gap-2 md:gap-4">
              <div className="hidden md:block px-6 py-2 bg-red-600 text-black font-norwester text-[1.25rem] skew-x-12 border-r-4 border-black shadow-[0_0_0.9375rem_rgba(220,38,38,0.5)]">ABNORMALITY DETAILS</div>
              <div onClick={() => setShowGallery(true)} className="flex items-center px-4 md:px-6 py-1 md:py-2 bg-black text-zinc-400 hover:text-white hover:bg-zinc-800 font-norwester text-[1rem] md:text-[1.25rem] skew-x-12 border border-zinc-800 cursor-pointer transition-colors whitespace-nowrap">VIEW GALLERY</div>
          </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="flex flex-col lg:flex-row flex-1 p-[1rem] gap-[1rem] overflow-y-auto lg:overflow-hidden relative z-10">
          
          {/* LEFT SIDEBAR (Stats) */}
          <div className="flex w-full lg:w-8 flex-row lg:flex-col items-center justify-center lg:justify-start gap-4 lg:gap-0 pt-2 pb-2 shrink-0 border-b lg:border-b-0 lg:border-r border-red-900/30 lg:border-transparent min-h-16 lg:min-h-0">
              {/* Speed Rate */}
              <div className="flex items-center gap-1 group cursor-help h-auto lg:h-24">
                  <div className="h-1.5 w-full lg:w-1.5 lg:h-full bg-red-600 group-hover:bg-red-500 transition-colors shadow-[0_0_0.625rem_red]" />
                  <span className="font-norwester text-[1rem] text-white whitespace-nowrap group-hover:text-red-400 transition-colors lg:[writing-mode:vertical-rl] lg:rotate-180">Speed Rate +4</span>
              </div>
              
              {/* Success Rate */}
              <div className="flex items-center gap-1 group cursor-help h-auto lg:h-24 mt-0 lg:mt-8 ml-4 lg:ml-0">
                   <div className="h-1.5 w-full lg:w-1.5 lg:h-full bg-red-600/30 group-hover:bg-red-600/60 transition-colors" />
                   <span className="font-norwester text-[1rem] text-white/50 whitespace-nowrap group-hover:text-white/80 transition-colors lg:[writing-mode:vertical-rl] lg:rotate-180">Success Rate +4%</span>
              </div>

              {/* Observation Level */}
              <div className="mt-0 lg:mt-auto ml-auto lg:ml-0 flex flex-col items-center">
                  <span className="font-norwester text-[1rem] text-yellow-500 whitespace-nowrap mb-0 lg:mb-2 lg:[writing-mode:vertical-rl] lg:rotate-180">OBSERVATION LV.4</span>
                  <div className="flex flex-row lg:flex-col gap-[0.125rem] ml-2 lg:ml-0">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-3 lg:w-3 lg:h-1.5 bg-yellow-500 border border-black shadow-[0_0_0.3125rem_yellow]" />)}
                      <div className="w-1.5 h-3 lg:w-3 lg:h-1.5 bg-zinc-800 border border-black" />
                  </div>
              </div>
          </div>


          {/* COLUMN 2: BASIC INFO */}
          <div className="flex flex-col w-full md:w-auto lg:w-[16rem] xl:w-[20rem] 2xl:w-[22rem] shrink-0 gap-2 h-auto lg:h-full lg:min-h-0">
              <div className="bg-[#1a1a1a] border-t-4 border-yellow-500 px-2 py-1 text-center font-norwester text-yellow-500 text-[1rem] tracking-widest shadow-lg shrink-0">ABNORMALITY BASIC INFORMATION</div>
              
              <div className="relative border-2 border-zinc-600 bg-black p-4 shadow-2xl flex flex-col flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                  {/* Portrait */}
                  <div id="abnormality-exposure-zone" className="relative w-full aspect-square border-4 border-[#2a2a2a] bg-[#1a1a1a] mb-3 overflow-hidden group shrink-0">
                      <Image 
                        src={abnormality.image} 
                        alt={abnormality.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      {/* Scanline */}
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_0.25rem] opacity-30 pointer-events-none" />
                      {/* Vignette */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,black_100%)] opacity-50" />
                  </div>

                  {/* Name & ID */}
                  <div className="bg-[#1a1a1a] border border-zinc-700 p-2 flex justify-between items-center mb-2 shadow-inner shrink-0">
                      <span className="font-norwester text-[1.25rem] text-white truncate">{abnormality.name}</span>
                  </div>
                   
                  <div className="flex justify-between items-end border-b border-zinc-700 pb-1 mb-2 shrink-0">
                      <span className="font-mono text-zinc-500 text-[1.125rem] tracking-widest">{abnormality.code || "O-00-00"}</span>
                      <span className={`font-norwester text-[2rem] ${
                          abnormality.riskLevel === "ALEPH" ? "text-red-600" : "text-yellow-500"
                      }`}>{abnormality.riskLevel}</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-2 shrink-0">
                      <div className="border-l-4 border-zinc-700 pl-2">
                          <span className="font-norwester text-[1rem] text-zinc-500 block mb-0.5">Attack Type</span>
                          <div className="flex items-baseline gap-1">
                             <span className={`font-norwester text-[1.5rem] ${damageColor}`}>{abnormality.damageType || "RED"}</span> 
                             <span className="font-mono text-[1rem] text-zinc-600">1-5</span>
                          </div>
                      </div>
                      <div className="border-l-4 border-zinc-700 pl-2">
                           <span className="font-norwester text-[1rem] text-zinc-500 block mb-0.5">E-Box Output</span>
                           <span className="font-norwester text-[1.5rem] xl:text-[2rem] text-white ml-1">{abnormality.eBoxOutput || 20}</span>
                      </div>
                  </div>

                  {/* Work Results */}
                  <div className="mt-auto space-y-2 shrink-0 pt-2">
                      <div className="flex items-center text-[1rem] font-mono gap-2 text-zinc-400 mb-1 border-b border-zinc-800 pb-1">
                          <span>Work Result</span>
                      </div>
                      <div className="flex items-center justify-between text-[1rem] md:text-[1.125rem]">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_0.5rem_green]"/> <span className="text-green-500 font-bold">Good</span></div>
                          <span className="font-mono text-green-500 bg-green-500/10 px-2 rounded">{abnormality.workResults?.good || "15-20"}</span>
                      </div>
                      <div className="flex items-center justify-between text-[1rem] md:text-[1.125rem]">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"/> <span className="text-yellow-500 font-bold">Normal</span></div>
                          <span className="font-mono text-yellow-500 bg-yellow-500/10 px-2 rounded">{abnormality.workResults?.normal || "10-14"}</span>
                      </div>
                      <div className="flex items-center justify-between text-[1rem] md:text-[1.125rem]">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/> <span className="text-red-500 font-bold">Bad</span></div>
                          <span className="font-mono text-red-500 bg-red-500/10 px-2 rounded">{abnormality.workResults?.bad || "0-9"}</span>
                      </div>
                  </div>
                  


              </div>
          </div>


          {/* COLUMN 3: MIDDLE (Tips & Flavor) */}
          <div className="flex flex-col flex-1 gap-3 h-auto lg:h-full lg:min-h-0">
               {/* Managerial Tips */}
               <div className="border-2 border-[#b08d55] bg-black/50 p-2 shadow-xl flex flex-col flex-1 min-h-0">
                   <div className="bg-[#b08d55] text-black font-norwester text-[1rem] px-3 py-0.5 mb-1 inline-block self-start">Managerial Tips</div>
                   <div className="flex flex-col gap-3 p-3 overflow-y-auto custom-scrollbar flex-1">
                       {abnormality.managerialTips ? (
                           abnormality.managerialTips.map((tip, i) => (
                               <div key={i} className="border border-[#b08d55]/30 p-2 bg-black/80 hover:bg-black/90 transition-colors">
                                   <span className="text-[#b08d55] font-norwester text-[0.875rem] block mb-1">Managerial Tip {i+1}</span>
                                   <p className="text-zinc-300 font-mono text-[1rem] leading-relaxed tracking-wide">{tip}</p>
                               </div>
                           ))
                       ) : (
                           <p className="text-zinc-500 italic p-2">No managerial tips available.</p>
                       )}
                   </div>
               </div>

               {/* Work Favor Table */}
               <div className="border-2 border-zinc-700 bg-black/50 p-2 flex flex-col items-center justify-center shadow-xl flex-1 min-h-0 overflow-hidden">
                    <h3 className="font-norwester text-[1.25rem] text-yellow-100 mb-1.5 border-b-2 border-yellow-100/30 pb-0.5 w-full text-center shrink-0">ABNORMALITY WORK FAVOR</h3>
                    <div className="grid grid-cols-2 gap-2 w-full flex-1 min-h-0">
                        {['Instinct', 'Insight', 'Attachment', 'Repression'].map((type) => (
                            <div key={type} className="border- border-zinc-800 bg-zinc-900/50 p-2 flex flex-row items-center justify-center gap-2 hover:bg-zinc-900 transition-colors group">
                                {/* Left: Icon + Title */}
                                <div className="flex flex-col items-center w-28 shrink-0 justify-center">
                                    <span className="font-norwester text-[0.75rem] md:text-[1rem] text-zinc-500 mb-1 uppercase group-hover:text-zinc-300 transition-colors text-center leading-tight">{type}<br/>Work List</span>
                                    <div className={`relative w-16 h-16 p-1 rounded border-2 shrink-0 ${
                                        type === 'Instinct' ? 'border-red-900 bg-red-900/20 shadow-[0_0_0.625rem_rgba(127,29,29,0.5)]' :
                                        type === 'Insight' ? 'border-blue-900 bg-blue-900/20 shadow-[0_0_0.625rem_rgba(30,58,138,0.5)]' :
                                        type === 'Attachment' ? 'border-purple-900 bg-purple-900/20 shadow-[0_0_0.625rem_rgba(88,28,135,0.5)]' :
                                        'border-cyan-900 bg-cyan-900/20 shadow-[0_0_0.625rem_rgba(8,145,178,0.5)]'
                                    }`}>
                                       <Image src={getWorkIcon(type)} alt={type} fill className="object-contain p-1 opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                
                                {/* Right: Level rows */}
                                <div className=" flex flex-col justify-center space-y-[0.0625rem] min-w-0 w-[15rem]">
                                    {['I', 'II', 'III', 'IV', 'V'].map((level) => (
                                        <div key={level} className="flex justify-between text-[0.75rem] md:text-[0.875rem] font-mono text-zinc-400 border-b border-zinc-800/50 py-0.5">
                                            <span>{level}</span>
                                            <span className={
                                                (abnormality.stats as any)[type.toLowerCase()]?.includes('High') || (abnormality.stats as any)[type.toLowerCase()] === 'Max' ? 'text-green-500 font-bold' : 
                                                (abnormality.stats as any)[type.toLowerCase()]?.includes('Low') ? 'text-red-500 font-bold' : 'text-yellow-500'
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
          <div className="flex flex-col w-full lg:w-48 xl:w-[16rem] 2xl:w-[18rem] pb-5 shrink-0 gap-2 h-auto lg:h-full lg:min-h-0 overflow-visible">
               {/* Qliphoth Counter */}
               <div className="border-4 border-[#b08d55] bg-black p-[0.75rem] flex flex-col items-center relative shadow-[0_0_1.25rem_rgba(176,141,85,0.2)] shrink-0">
                   <div className="absolute top-[-0.75rem] bg-black px-[0.5rem] border-x border-[#b08d55]">
                        <span className="text-[#b08d55] font-norwester text-[1rem]">Qliphoth Counter</span>
                   </div>
                   <span className="font-norwester text-[2.5rem] xl:text-[4rem] text-white mt-[0.5rem] drop-shadow-[0_0_0.625rem_white]">{abnormality.qliphothCounter || 0}</span>
               </div>

               {/* Defenses */}
               <div className="border-2 border-[#b08d55] bg-black p-2 shadow-lg shrink-0">
                   <span className="text-[#b08d55] font-norwester text-[0.875rem] block text-center mb-2 border-b border-[#b08d55]/30 pb-1">Abnormality Defense</span>
                   <div className="grid grid-cols-2 gap-2 text-[0.875rem] font-mono">
                       <div className="flex justify-between px-2 py-1 bg-red-900/10 border border-red-900/30 text-red-500 rounded"><span>RED</span> <span>0.8</span></div>
                       <div className="flex justify-between px-2 py-1 bg-white/5 border border-white/20 text-white rounded"><span>WHITE</span> <span>1.2</span></div>
                       <div className="flex justify-between px-2 py-1 bg-purple-900/10 border border-purple-900/30 text-purple-500 rounded"><span>BLACK</span> <span>0.5</span></div>
                       <div className="flex justify-between px-2 py-1 bg-cyan-900/10 border border-cyan-900/30 text-cyan-400 rounded"><span>PALE</span> <span>2.0</span></div>
                   </div>
               </div>

               {/* E.G.O Information */}
               <div className="flex flex-col gap-1.5 flex-1 min-h-0">
                   <h3 className="text-right font-norwester text-[1rem] text-white border-b-2 border-white pb-0.5 shrink-0">E.G.O GIFT</h3>
                   <div className="h-10 border border-zinc-700 bg-zinc-900 flex items-center justify-center relative overflow-hidden group shrink-0">
                       <Gift className="w-5 h-5 text-zinc-600 absolute left-2 opacity-50" />
                       <span className="z-10 font-norwester text-zinc-300 text-[0.875rem] tracking-widest group-hover:text-white transition-colors">{abnormality.ego?.gift || "unknown"}</span>
                       <div className="absolute inset-0 bg-linear-to-tr from-transparent to-white/5 group-hover:to-white/10 transition-colors" />
                   </div>

                   <div className="grid grid-cols-2 gap-1.5 flex-1">
                       <div className="flex flex-col group">
                           <h3 className="text-center font-norwester text-[0.875rem] text-red-500 border-b border-red-500 mb-0.5 shrink-0">E.G.O WEAPON</h3>
                           <div className="border border-red-900 bg-black flex flex-col items-center justify-center p-3 text-center transition-all group-hover:border-red-600 group-hover:shadow-[0_0_0.9375rem_rgba(220,38,38,0.3)] flex-1">
                                <div className="w-12 h-12 bg-red-900/20 rounded-full mb-2 flex items-center justify-center border border-red-900/50 group-hover:scale-110 transition-transform">
                                    <Sword className="w-6 h-6 text-red-500" />
                                </div>
                                <span className="font-mono text-[0.875rem] text-red-300 uppercase tracking-widest">{abnormality.ego?.weapon || "Weapon"}</span>
                           </div>
                       </div>
                       <div className="flex flex-col group">
                           <h3 className="text-center font-norwester text-[0.875rem] text-blue-500 border-b border-blue-500 mb-0.5 shrink-0">E.G.O SUIT</h3>
                           <div className="border border-blue-900 bg-black flex flex-col items-center justify-center p-3 text-center transition-all group-hover:border-blue-600 group-hover:shadow-[0_0_0.9375rem_rgba(37,99,235,0.3)] flex-1">
                                <div className="w-12 h-12 bg-blue-900/20 rounded-full mb-2 flex items-center justify-center border border-blue-900/50 group-hover:scale-110 transition-transform">
                                    <Shirt className="w-6 h-6 text-blue-500" />
                                </div>
                                <span className="font-mono text-[0.875rem] text-blue-300 uppercase tracking-widest">{abnormality.ego?.suit || "Suit"}</span>
                           </div>
                       </div>
                   </div>
               </div>
               
               {/* Unique PE-Boxes & Leave */}
               <div className="mt-auto pt-2 flex justify-between items-center shrink-0">
                   <div className="relative w-20 h-20 group">
                        {/* Spinny PE Box thing */}
                        <div className="absolute inset-0 border-4 border-yellow-400 rotate-45 bg-black animate-[spin_10s_linear_infinite] group-hover:border-yellow-300 transition-colors" />
                        <div className="absolute inset-[0.4rem] border-4 border-yellow-600 -rotate-12 bg-black animate-[spin_8s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 flex items-center justify-center font-norwester text-[1.25rem] md:text-[1.5rem] text-yellow-400 z-10 font-bold drop-shadow-[0_0_0.625rem_yellow]">
                            {abnormality.eBoxOutput ? abnormality.eBoxOutput * 10 : 999}
                        </div>
                        <span className="absolute -bottom-[1.2rem] w-full text-center font-norwester text-[0.7rem] text-yellow-500 whitespace-nowrap">UNIQUE PE-BOXES</span>
                   </div>

                   <button 
                    onClick={onBack}
                     className="bg-red-600 hover:bg-red-500 text-black font-norwester text-[1.25rem] xl:text-[2rem] px-4 xl:px-6 py-2 skew-x-[-10deg] shadow-[0_0_1.25rem_red] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_2.5rem_red] z-50"
                   >
                       LEAVE
                   </button>
               </div>
          </div>

      </div>


      {/* --- GALLERY MODAL --- */}
      {showGallery && (
          <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-[3rem] animate-fade-in">
              <div className="flex justify-between items-center mb-[2rem] border-b-2 border-zinc-700 pb-[1rem]">
                  <div className="flex flex-col">
                      <h2 className="font-norwester text-[2rem] xl:text-[3rem] text-white tracking-wider">OBSERVATION RECORDS</h2>
                      <span className="font-mono text-zinc-500 mt-[0.5rem]">SUBJECT: {abnormality.name} // {abnormality.code}</span>
                  </div>
                  <button onClick={() => setShowGallery(false)} className="text-zinc-500 hover:text-red-500 font-norwester text-[2rem] border border-zinc-600 hover:border-red-500 px-[1.5rem] py-[0.5rem] transition-all">CLOSE [X]</button>
              </div>
              
              <div className="columns-2 md:columns-3 gap-4 overflow-y-auto pb-8 custom-scrollbar">
                  {(abnormality.galleryImages || [abnormality.image]).map((img: string, i: number) => (
                      <div key={i} className="relative bg-zinc-900 border-2 border-zinc-800 group overflow-hidden cursor-pointer hover:border-red-600 transition-colors mb-4 break-inside-avoid">
                          <img src={img} alt={`Observation ${i + 1}`} className="w-full h-auto opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                          <div className="absolute bottom-0 inset-x-0 bg-black/80 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red-900">
                              <span className="text-[0.875rem] font-mono text-red-400 block">OBSERVATION #{i + 1}</span>
                              <span className="text-[0.75rem] font-mono text-zinc-500">Day 14 // 14:00</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

    </div>
  );
}

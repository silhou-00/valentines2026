"use client";

import { useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ExtractionSelection from "./components/ExtractionSelection";
import AbnormalityDossier from "./components/AbnormalityDossier";
import abnormalities from "./data/abnormalities.json";

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "selection" | "dossier">("loading");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLoadingComplete = () => {
    setPhase("selection");
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleExtract = (id: string) => {
    setSelectedId(id);
    setPhase("dossier");
  };

  const handleBack = () => {
    setPhase("selection");
    setSelectedId(null);
  };

  const selectedAbnormality = abnormalities.find((a) => a.id === selectedId);

  return (
    <div className={`flex min-h-screen w-full justify-center font-sans overflow-auto overflow-x-hidden transition-all duration-1000 ${
        phase === "loading" ? "bg-black items-center" :
        "bg-[url('/background/LobCorp.png')] bg-cover bg-center items-center"
    }`}>
      
      {phase === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={`transition-opacity duration-1000 w-full min-h-screen flex items-center justify-center ${phase === "loading" ? "opacity-0" : "opacity-100"}`}>
        {phase === "selection" && (
          <ExtractionSelection onExtract={handleExtract} />
        )}

        {phase === "dossier" && selectedAbnormality && (
          <AbnormalityDossier abnormality={selectedAbnormality} onBack={handleBack} />
        )}
      </div>
      <audio ref={audioRef} src="/audio/Netzach battle.mp3" loop preload="auto" />
    </div>
  );
}



"use client";

import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ExtractionSelection from "./components/ExtractionSelection";
import AbnormalityDossier from "./components/AbnormalityDossier";
import abnormalities from "./data/abnormalities.json";

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "selection" | "dossier">("loading");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleLoadingComplete = () => {
    setPhase("selection");
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
    <div className={`flex min-h-screen w-full items-center justify-center font-sans overflow-hidden transition-all duration-1000 ${
        phase === "loading" ? "bg-black" :
        phase === "selection" ? "bg-[url('/background/LobCorp.png')] bg-cover bg-center" :
        "bg-[url('/background/Lobotomy_Background.png')] bg-cover bg-center"
    }`}>
      
      {phase === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={`transition-opacity duration-1000 w-full h-[60rem] flex items-center justify-center ${phase === "loading" ? "opacity-0" : "opacity-100"}`}>
        {phase === "selection" && (
          <ExtractionSelection onExtract={handleExtract} />
        )}

        {phase === "dossier" && selectedAbnormality && (
          <AbnormalityDossier abnormality={selectedAbnormality} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

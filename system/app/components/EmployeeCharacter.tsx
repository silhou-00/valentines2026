"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Movement speed in pixels per frame
const MOVE_SPEED = 5;

export default function EmployeeCharacter({
  idleSprite = "/employee_sprite/Standing.gif",
  walkingSprite = "/employee_sprite/Walking.gif"
}: {
  idleSprite?: string;
  walkingSprite?: string;
}) {
  // Position state for rendering
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isMoving, setIsMoving] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [spriteState, setSpriteState] = useState<"normal" | "happy" | "dead">("normal");

  // Refs for tracking animation and interaction state
  const posRef = useRef({ x: 100, y: 100 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const animationFrameRef = useRef<number>(0);
  const overlapStartTimeRef = useRef<number | null>(null);
  const spriteStateRef = useRef<"normal" | "happy" | "dead">("normal");

  // Handle key press/release
  useEffect(() => {
    // Initial center positioning
    if (typeof window !== "undefined") {
      posRef.current = { 
        x: window.innerWidth / 2 - 50, 
        y: window.innerHeight - 200 
      };
      setPosition(posRef.current);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Animation loop
    const loop = () => {
      const keys = keysRef.current;
      let dx = 0;
      let dy = 0;

      // WASD + Arrow keys support
      if (keys["w"] || keys["arrowup"]) dy -= 1;
      if (keys["s"] || keys["arrowdown"]) dy += 1;
      if (keys["a"] || keys["arrowleft"]) dx -= 1;
      if (keys["d"] || keys["arrowright"]) dx += 1;

      // Normalize diagonal movement so speed is consistent
      if (dx !== 0 || dy !== 0) {
        // Normalize vector
        const length = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / length) * MOVE_SPEED;
        dy = (dy / length) * MOVE_SPEED;

        posRef.current.x += dx;
        posRef.current.y += dy;

        // Keep within bounds (optional, but good)
        if (typeof window !== "undefined") {
          posRef.current.x = Math.max(0, Math.min(window.innerWidth - 100, posRef.current.x));
          posRef.current.y = Math.max(0, Math.min(window.innerHeight - 150, posRef.current.y));
        }

        // Update direction based on movement
        if (dx > 0) setDirection("right");
        if (dx < 0) setDirection("left");

        setIsMoving(true);
        if (!hasMoved) setHasMoved(true);
        setPosition({ ...posRef.current });
      } else {
        setIsMoving(false);
      }

      // Check overlap with Abnormality Image Zone
      const zoneElement = document.getElementById("abnormality-exposure-zone");
      if (zoneElement) {
        const zoneRect = zoneElement.getBoundingClientRect();
        // Character is roughly 100x100
        const charRect = {
          left: posRef.current.x,
          right: posRef.current.x + 100,
          top: posRef.current.y,
          bottom: posRef.current.y + 100,
        };

        const isOverlapping = !(
          charRect.right < zoneRect.left ||
          charRect.left > zoneRect.right ||
          charRect.bottom < zoneRect.top ||
          charRect.top > zoneRect.bottom
        );

        if (isOverlapping) {
          if (!overlapStartTimeRef.current) {
            overlapStartTimeRef.current = Date.now();
            if (spriteStateRef.current !== "happy") {
              setSpriteState("happy");
              spriteStateRef.current = "happy";
            }
          } else {
            const elapsed = Date.now() - overlapStartTimeRef.current;
            if (elapsed > 3000 && spriteStateRef.current !== "dead") {
              setSpriteState("dead");
              spriteStateRef.current = "dead";
            } else if (elapsed <= 3000 && spriteStateRef.current !== "happy") {
              // Ensure we stay happy until death
               if (spriteStateRef.current !== "dead") {
                 setSpriteState("happy");
                 spriteStateRef.current = "happy";
               }
            }
          }
        } else {
          overlapStartTimeRef.current = null;
          if (spriteStateRef.current !== "normal") {
            setSpriteState("normal");
            spriteStateRef.current = "normal";
          }
        }
      } else {
         // Fallback if not on dossier page or element missing
         if (spriteStateRef.current !== "normal") {
           setSpriteState("normal");
           spriteStateRef.current = "normal";
         }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div
      className="fixed z-[100] pointer-events-none" // pointer-events-none so drags pass through behind character
      style={{
        left: position.x,
        top: position.y,
        width: "100px",
        height: "100px",
        // Using transform for smooth movement without layout thrashing
        // actually standard positioning is fine here since we update state
      }}
    >
      <div 
        className="relative w-full h-full transition-transform duration-100"
        style={{
          transform: direction === "right" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        <Image
          src={
            spriteState === "dead" 
              ? "/employee_sprite/DieofLove.gif" 
              : spriteState === "happy" 
                ? "/employee_sprite/Happy.gif" 
                : isMoving 
                  ? walkingSprite 
                  : idleSprite
          }
          alt="Employee"
          fill
          className="object-contain"
          unoptimized // Required for GIFs to animate properly
          priority
        />
      </div>

      {/* Control Hint */}
      <div 
        className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-opacity duration-500 ${hasMoved ? "opacity-0" : "opacity-100 animate-bounce"}`}
      >
        <span className="bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 font-mono tracking-widest">
          WASD / ARROWS
        </span>
      </div>
    </div>
  );
}

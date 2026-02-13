# Project Context: "Valentine's Extraction" (Lobotomy Corp Style)

## 1. Project Overview
**Goal:** Create a cinematic Valentine's website that replicates the "Abnormality Extraction" and "Abnormality Dossier" sequences from *Lobotomy Corporation*.
**Vibe:** Industrial, Sci-Fi, Horror-Cute, High-Fidelity UI.
**Reference Video:** [YouTube Link](https://youtu.be/R411BMlnbOg?si=FGzLwW60LI6IJ-5R)
    starting from 1:52 to 1:59 which will be my loading screen when the site is opened
    and 2:00 to 2:55 for the animation of the mvp page
**Tech Stack:** - Next.js (App Router)
- Tailwind CSS (v3.4+)
- **Strictly No External Animation Libraries** (Use Tailwind Config + CSS Keyframes only).

---

## 2. Animation Sequences (The "Spec")

### Phase 1: The Loading Screen (Timestamp 1:52 - 1:59)
**Visual Reference:** A Loading Sequence, Initiating - Updating - Refine - Assign - Activate - Accelerate - Day 14.
**Concept:** A computer like loading from top to bottom then after finishing it will fade out.

### Phase 2: The Extraction Selection (Timestamp 2:00 - 2:55)
**Visual:** - **Background:** In the background folder
- **Foreground:** Three black "Containment Boxes" hanging from the ceiling by vertical cables.
- **The Boxes:** - Use the box in the abnormality folder
    - Create a json file for the 3 boxes containing their information
        - Name
        - Description
        - Risk level
        - Stats
        
    - **Hover Effect:** The selected box glows slightly and the red eye pulses faster.

**Interaction:**
1.  User hovers over one of the 3 boxes.
2.  User **CLICKS** a box to "Extract" it.
3.  **Animation:** - The non-clicked boxes fade out/retract up.
    - The clicked box shakes violently (`animate-shake-violent`).
    - The screen goes black as if like a fade transition.

### Phase 3: The Information Reveal 
**Visual:** The "Abnormality Encyclopedia" page for the girlfriend.
**Trigger:** Pops up when a box is extracted and then goes back to phase 2 when the back button is pressed .

**Layout:**
-   **Left Column:** The Portrait (Photo of Girlfriend).
-   **Right Column:** The Data (Risk Level, Name, Flavour Text, Stats).

**Animation Sequence:**
1.  **The Stamp (0.5s delay):** The "Risk Level" (e.g., ALEPH) slams onto the screen.
    -   *Effect:* Scale down from 3x to 1x + rotation + dust particles.
2.  **The Portrait (1s delay):** The image appears with a "glitch/scanline" effect.
3.  **The Text (1.5s delay):** The Description/Love Letter types out letter-by-letter (`typewriter` effect).
4.  **The Stats (2s delay):** The "Work Success" boxes slide in from the bottom.

---

## 3. Implementation Details for AI

### A. Tailwind Configuration (`tailwind.config.js`)
*Add these specific keyframes to capture the violent/mechanical feel.*

The background image is in the background folder
The box image is in the abnormality folder
The font family is in the font folder
      animation: {
        'shake-violent': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite',
        'door-slide-left': 'slideLeft 1.5s cubic-bezier(0.7, 0, 0.3, 1) forwards',
        'door-slide-right': 'slideRight 1.5s cubic-bezier(0.7, 0, 0.3, 1) forwards',
        'flash-bang': 'flashBang 2.5s ease-out forwards',
        'stamp-slam': 'stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'text-type': 'typing 3s steps(40, end)',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '10%, 90%': { transform: 'translate(-2px, -2px) rotate(-1deg)' },
          '20%, 80%': { transform: 'translate(2px, 2px) rotate(1deg)' },
          '30%, 50%, 70%': { transform: 'translate(-4px, 2px) rotate(-2deg)' },
          '40%, 60%': { transform: 'translate(4px, -2px) rotate(2deg)' },
        },
        stamp: {
          '0%': { opacity: '0', transform: 'scale(5) rotate(-15deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-5deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
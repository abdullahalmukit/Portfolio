import React, { createContext, useContext, useEffect, useState } from "react";

type MotionPreference = "full" | "reduced" | "none";

interface MotionContextType {
  motionPreference: MotionPreference;
  setMotionPreference: (preference: MotionPreference) => void;
  shouldAnimate: boolean;
  shouldReduceMotion: boolean;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionPreference, setMotionPreferenceState] = useState<MotionPreference>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("motionPreference") as MotionPreference;
      if (stored) return stored;
      
      // Respect system preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "reduced";
      }
    }
    return "full";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all motion classes first
    root.classList.remove("motion-full", "motion-reduce", "motion-none");
    
    // Add the appropriate class
    if (motionPreference === "reduced") {
      root.classList.add("motion-reduce");
    } else if (motionPreference === "none") {
      root.classList.add("motion-none");
    }
  }, [motionPreference]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("motionPreference");
      if (!stored) {
        setMotionPreferenceState(e.matches ? "reduced" : "full");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setMotionPreference = (preference: MotionPreference) => {
    localStorage.setItem("motionPreference", preference);
    setMotionPreferenceState(preference);
  };

  const shouldAnimate = motionPreference === "full";
  const shouldReduceMotion = motionPreference !== "full";

  return (
    <MotionContext.Provider
      value={{
        motionPreference,
        setMotionPreference,
        shouldAnimate,
        shouldReduceMotion,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}

import React, { createContext, useContext, useEffect, useState } from "react";

interface RecruiterContextType {
  isRecruiterMode: boolean;
  setRecruiterMode: (enabled: boolean) => void;
  toggleRecruiterMode: () => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("recruiterMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("recruiterMode", String(isRecruiterMode));
    
    // When recruiter mode is enabled, disable heavy animations
    if (isRecruiterMode) {
      document.documentElement.classList.add("motion-reduce");
    } else {
      // Restore motion preference
      const motionPref = localStorage.getItem("motionPreference");
      if (motionPref !== "reduced" && motionPref !== "none") {
        document.documentElement.classList.remove("motion-reduce");
      }
    }
  }, [isRecruiterMode]);

  const setRecruiterMode = (enabled: boolean) => {
    setIsRecruiterMode(enabled);
  };

  const toggleRecruiterMode = () => {
    setIsRecruiterMode((prev) => !prev);
  };

  return (
    <RecruiterContext.Provider
      value={{
        isRecruiterMode,
        setRecruiterMode,
        toggleRecruiterMode,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
}

export function useRecruiter() {
  const context = useContext(RecruiterContext);
  if (context === undefined) {
    throw new Error("useRecruiter must be used within a RecruiterProvider");
  }
  return context;
}

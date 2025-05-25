// src/context/MatchContext.js
import React, { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export function MatchProvider({ children }) {
  const [lastResult, setLastResult] = useState(null);
  return (
    <MatchContext.Provider value={{ lastResult, setLastResult }}>
      {children}
    </MatchContext.Provider>
  );
}

export const useMatch = () => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error("useMatch must be used within MatchProvider");
  return ctx;
};

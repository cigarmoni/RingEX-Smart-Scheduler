import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface AvaContextValue {
  avaOpen: boolean;
  openAva: () => void;
  closeAva: () => void;
  toggleAva: () => void;
}

const AvaContext = createContext<AvaContextValue | null>(null);

export const AvaProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [avaOpen, setAvaOpen] = useState(false);
  const openAva = useCallback(() => setAvaOpen(true), []);
  const closeAva = useCallback(() => setAvaOpen(false), []);
  const toggleAva = useCallback(() => setAvaOpen((v) => !v), []);
  return (
    <AvaContext.Provider value={{ avaOpen, openAva, closeAva, toggleAva }}>
      {children}
    </AvaContext.Provider>
  );
};

export const useAva = (): AvaContextValue => {
  const ctx = useContext(AvaContext);
  if (!ctx) {
    throw new Error("useAva must be used within an AvaProvider");
  }
  return ctx;
};

import { createContext, useContext, useState } from "react";

const SidebareContext = createContext();

const SidebareProvider = ({ children }) => {
  const [showSidebare, setShowSidebare] = useState(true);

  return (
    <SidebareContext.Provider
      value={{
        showSidebare,
        setShowSidebare,
      }}
    >
      {children}
    </SidebareContext.Provider>
  );
};

const useSidebare = () => {
  const context = useContext(SidebareContext);

  return context;
};

export { SidebareProvider, useSidebare };

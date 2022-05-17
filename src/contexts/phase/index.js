import { createContext, useState } from "react";

const PhaseContext = createContext();

const PhaseProvider = (props) => {
  const [phase, setPhase] = useState(1);
  return <PhaseContext.Provider value={{ phase, setPhase }} {...props} />;
};

export { PhaseContext, PhaseProvider };

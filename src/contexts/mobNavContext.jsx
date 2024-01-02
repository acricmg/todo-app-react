import React, { createContext, useContext, useState } from "react";

const MobNavContext = createContext();

const MobNavProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const toggleState = () => {
    setState((prevState) => !prevState);
  };

  return (
    <MobNavContext.Provider value={{ state, toggleState }}>
      {children}
    </MobNavContext.Provider>
  );
};

const useMobNav = () => {
  return useContext(MobNavContext);
};

export { MobNavProvider, useMobNav };


import { createContext, useContext } from "react";

export const CardsContext = createContext(null);
export const useCards = () => {
  return useContext(CardsContext);
};

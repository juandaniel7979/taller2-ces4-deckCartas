import { useContext } from "react";
import { PartidaContext } from "../context/PartidaContext";


const usePartida = () => {
  return useContext(PartidaContext);
};

export default usePartida;

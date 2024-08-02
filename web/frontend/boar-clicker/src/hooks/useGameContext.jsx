import { useContext } from "react";
import { GameContext } from "../context/GameContext";


function useGameContext() {
    return useContext(GameContext);
}

export default useGameContext;

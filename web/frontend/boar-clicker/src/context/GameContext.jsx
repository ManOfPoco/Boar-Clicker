import { createContext, useReducer } from "react";

const initialState = {
    points: 500,
    energy: 100,
    pointsPerClick: 1,
    clicks: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "addClick":
            if (state.energy === 0) return state;
            return {
                ...state,
                energy: state.energy - 1,
                clicks: [
                    ...state.clicks,
                    {
                        id: action.payload.id,
                        x: action.payload.x,
                        y: action.payload.y,
                        translateX: action.payload.translateX,
                        translateY: action.payload.translateY,
                    },
                ],
            };
        case "increasePoints":
            return {
                ...state,
                points: state.points + state.pointsPerClick,
                clicks: state.clicks.filter(
                    (click) => click.id !== action.payload.id
                ),
            };
        case "restoreEnergy":
            if (state.energy < 100) {
                return {
                    ...state,
                    energy: state.energy + 1,
                };
            }
            return state;
        case "increasePointsPerClick":
            return {
                ...state,
                pointsPerClick:
                    state.pointsPerClick + action.payload.pointsPerClick,
                points: state.points - action.payload.pointsCost,
            };
        default:
            return state;
    }
}

const GameContext = createContext();

function GameProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };

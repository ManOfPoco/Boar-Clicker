import { createContext, useEffect, useReducer } from "react";

const initialState = {
    points: 500,
    pointsPerClick: 1,
    energy: 750,
    maxEnergy: 750,
    energyRefillAmount: 1,
    level: 1,
    levelExperience: 0,
    experiencePerClick: 2,
    clicks: [],
    isEveryDayMoneyCollected: false,
    availableEnergyRefill: 5,
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
                        points: action.payload.points,
                        x: action.payload.x,
                        y: action.payload.y,
                        translateX: action.payload.translateX,
                        translateY: action.payload.translateY,
                    },
                ],
            };
        case "addBonusClick":
            return {
                ...state,
                clicks: [
                    ...state.clicks,
                    {
                        id: action.payload.id,
                        points: action.payload.points,
                        x: action.payload.x,
                        y: action.payload.y,
                        translateX: action.payload.translateX,
                        translateY: action.payload.translateY,
                    },
                ],
            };
        case "cleanClicks":
            return {
                ...state,
                points:
                    state.points +
                    state.clicks.reduce((acc, click) => acc + click.points, 0),
                clicks: [],
            };
        case "increasePoints":
            return {
                ...state,
                points: state.points + action.payload.points,
                levelExperience:
                    state.levelExperience + state.experiencePerClick,
                clicks: state.clicks.filter(
                    (click) => click.id !== action.payload.id
                ),
            };
        case "restoreEnergy":
            if (state.energy < state.maxEnergy) {
                return {
                    ...state,
                    energy: state.energy + action.energy,
                };
            }
            return state;
        case "restoreFullEnergy":
            return {
                ...state,
                energy: state.maxEnergy,
                availableEnergyRefill: state.availableEnergyRefill - 1,
            };
        case "increasePointsPerClick":
            return {
                ...state,
                pointsPerClick:
                    state.pointsPerClick + action.payload.pointsPerClick,
                points: state.points - action.payload.pointsCost,
            };
        case "increaseLevel": {
            const levelExperience = state.levelExperience - state.level * 3000;
            return {
                ...state,
                level: state.level + 1,
                levelExperience: levelExperience,
            };
        }
        case "collectEveryDayMoney":
            return {
                ...state,
                isEveryDayMoneyCollected: true,
            };
        default:
            return state;
    }
}

const GameContext = createContext();

function GameProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { level, levelExperience, energyRefillAmount } = state;

    // Restore energy every second
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: "restoreEnergy",
                energy: energyRefillAmount,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [energyRefillAmount]);

    // Increase level when there's enough experience
    useEffect(() => {
        if (level * 3000 <= levelExperience) {
            dispatch({
                type: "increaseLevel",
            });
        }
    }, [level, levelExperience]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };

import { createContext, useEffect, useReducer } from "react";

function calculateTotalExperienceForLevel(n) {
    if (n <= 0) {
        return 0; // Invalid level, can return 0 or raise an error
    }

    let totalValue = 0;

    // Loop to sum the values for all levels up to n
    for (let i = 1; i <= n; i++) {
        totalValue += 3000 * i;
    }

    return totalValue;
}

const initialState = {
    points: 500,
    pointsPerClick: 1,
    energy: 750,
    maxEnergy: 750,
    energyRefillPerTick: 1,
    level: 1,
    experience: 0,
    experiencePerClick: 2,
    nextLevelExperience: calculateTotalExperienceForLevel(1),
    clicks: [],
    boosters: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "addClick": {
            if (state.energy === 0) return state;

            const energy = action.payload.consumeEnergy ? 1 : 0;

            return {
                ...state,
                energy: state.energy - energy,
                clicks: [
                    ...state.clicks,
                    {
                        id: Date.now(),
                        points: action.payload.click.points,
                        x: action.payload.click.x,
                        y: action.payload.click.y,
                        translateX: action.payload.click.translateX,
                        translateY: action.payload.click.translateY,
                    },
                ],
            };
        }
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
                experience: state.experience + state.experiencePerClick,
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
            };
        case "increasePointsPerClick":
            return {
                ...state,
                pointsPerClick:
                    state.pointsPerClick + action.payload.pointsPerClick,
                points: state.points - action.payload.pointsCost,
            };
        case "increaseLevel": {
            return {
                ...state,
                level: state.level + 1,
                experience: state.experience - state.nextLevelExperience,
                nextLevelExperience: action.payload.nextLevelExperience,
            };
        }
        case "collectFriendsGift":
            return {
                ...state,
                points: state.points + action.payload.points,
            };
        case "collectEnergyDrink":
            return {
                ...state,
                energy: state.energy + state.maxEnergy,
            };
        case "activateBooster":
            return {
                ...state,
                boosters: [...state.boosters, action.payload.booster],
            };
        case "deactivateBooster":
            return {
                ...state,
                boosters: state.boosters.filter(
                    (booster) => booster.type !== action.payload.type
                ),
            };
        case "activateDoubleEnergyBooster": {
            let energy = state.energy;
            if (state.energy <= state.maxEnergy) {
                energy = state.energy * 2;
            }
            return {
                ...state,
                energy: energy,
                maxEnergy: state.maxEnergy * 2,
                boosters: [...state.boosters, action.payload.booster],
            };
        }
        case "deactivateDoubleEnergyBooster":
            return {
                ...state,
                energy: state.energy,
                maxEnergy: state.maxEnergy / 2,
                boosters: state.boosters.filter(
                    (booster) => booster.type !== "double_energy"
                ),
            };
        default:
            return state;
    }
}

const GameContext = createContext();

function GameProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        level,
        experience,
        energyRefillPerTick,
        nextLevelExperience,
        boosters,
    } = state;

    // useEffect(() => {
    //     const autoClickerBooster = boosters.find(
    //         (booster) => booster.type === "auto_clicker"
    //     );
    //     console.log(autoClickerBooster);
    //     if (!autoClickerBooster) return;

    //     let clicksQuantity =
    //         autoClickerBooster.baseEffect *
    //         autoClickerBooster.usesScaling *
    //         autoClickerBooster.levelScaling;
    //     const remainingTime = autoClickerBooster.endTime - Date.now(); // Calculate remaining time

    //     if (remainingTime <= 0) return; // If the booster has expired, do nothing

    //     const intervalId = setInterval(() => {
    //         for (let i = 0; i < clicksQuantity; i++) {
    //             console.log("Auto click");
    //             dispatch({
    //                 type: "addClick",
    //                 payload: { consumeEnergy: false },
    //             });
    //         }
    //     }, remainingTime);

    //     return () => clearInterval(intervalId); // Cleanup interval on component unmount
    // }, [boosters, dispatch]);

    // Increase level when there's enough experience
    useEffect(() => {
        if (nextLevelExperience <= experience) {
            dispatch({
                type: "increaseLevel",
                payload: {
                    nextLevelExperience:
                        calculateTotalExperienceForLevel(level),
                },
            });
        }
    }, [level, experience, nextLevelExperience]);

    // Restore energy every second
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: "restoreEnergy",
                energy: energyRefillPerTick,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [energyRefillPerTick]);

    // Check if boosters are still active
    useEffect(() => {
        const intervalId = setInterval(() => {
            boosters.forEach((booster) => {
                if (booster.endTime < Date.now()) {
                    switch (booster.type) {
                        case "double_energy":
                            dispatch({ type: "deactivateDoubleEnergyBooster" });
                            break;
                        default:
                            dispatch({
                                type: "deactivateBooster",
                                payload: { type: booster.type },
                            });
                    }
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [boosters]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };

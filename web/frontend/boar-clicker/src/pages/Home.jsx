import { useEffect, useReducer, useRef } from "react";

import BoostersMenu from "../features/Home/components/BoostersMenu";
import NavigationMenu from "../layouts/NavigationMenu";

import coinIcon from "../assets/svg/coin.svg";
import mainCharacterIcon from "../assets/svg/main-character.svg";
import energyIcon from "../assets/svg/energy.svg";
import ClickAnimations from "../features/Home/components/ClickAnimations";

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

function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { points, energy, pointsPerClick, clicks } = state;

    const pointsRef = useRef(null);

    // Handle card click
    function handleCardClick(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        setTimeout(() => {
            card.style.transform = "";
        }, 100);

        let click = {
            id: Date.now(),
            x: e.pageX,
            y: e.pageY,
        };
        const pointsRect = pointsRef.current.getBoundingClientRect();
        const translateX = pointsRect.left - click.x;
        const translateY = pointsRect.top - click.y;

        click = {
            ...click,
            translateX,
            translateY,
        };

        dispatch({
            type: "addClick",
            payload: click,
        });
    }

    // Increase points when magnet animation ends
    function handleMagnetAnimationEnd(id) {
        dispatch({ type: "increasePoints", payload: { id } });
    }

    // Restore energy every second
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: "restoreEnergy",
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [clicks]);

    return (
        <div className="relative flex justify-center overflow-hidden bg-rich-black">
            <div className="relative flex h-dvh w-full max-w-xl flex-col bg-dark-grey font-bold">
                <NavigationMenu />
                <BoostersMenu />

                <div className="flex gap-1 ps-3 pt-3 text-2xl text-primary">
                    <span>Energy:</span>
                    <div className="flex">
                        <img
                            src={energyIcon}
                            alt="Energy"
                            className="h-8 w-8"
                            draggable="false"
                        />
                        <span>{energy}</span>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="mt-4 flex justify-center">
                        <div
                            className="flex items-center gap-2 py-2"
                            ref={pointsRef}
                        >
                            <img
                                src={coinIcon}
                                alt="Dollar Coin"
                                className="h-10 w-10"
                                draggable="false"
                            />

                            <span className="text-4xl text-white">
                                {points}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 select-none justify-center">
                    <div
                        className="flex select-none justify-center"
                        onClick={(e) => handleCardClick(e)}
                    >
                        <img
                            src={mainCharacterIcon}
                            alt="Main Character"
                            className="h-80 w-80"
                            draggable="false"
                        />
                    </div>
                </div>
            </div>

            <ClickAnimations
                clicks={clicks}
                pointsPerClick={pointsPerClick}
                handleMagnetAnimationEnd={handleMagnetAnimationEnd}
            />
        </div>
    );
}

export default Home;

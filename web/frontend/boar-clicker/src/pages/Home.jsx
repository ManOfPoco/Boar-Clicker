import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import PointsGainAnimation from "../features/Home/components/PointsGainAnimation";
import NavigationMenu from "../layouts/NavigationMenu";

import useGameContext from "../hooks/useGameContext";
import useConvertSystem from "../hooks/useConvertSystem";

import { calculatePointsPerClick } from "../utils/calculatePointsPerClick.js";
import { calculateClicksQuantity } from "../utils/calculateClicksQuantity.js";

import coinIcon from "../assets/svg/coin.svg";
import mainCharacterIcon from "../assets/svg/main-character.svg";
import energyIcon from "../assets/svg/energy.svg";
import upgrades from "../assets/svg/upgrades.svg";
import boostersSvg from "../assets/svg/boosters.svg";

function Home() {
    const {
        state: {
            points,
            energy,
            maxEnergy,
            pointsPerClick,
            clicks,
            level,
            experience,
            nextLevelExperience,
            boosters,
        },
        dispatch,
    } = useGameContext();

    const { convertToViewSystem } = useConvertSystem();

    const pointsRef = useRef(null);
    const mainCharacterRef = useRef(null);

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

        const points = calculatePointsPerClick({
            pointsPerClick,
            level,
            boosters,
        });
        let clicksQuantity = calculateClicksQuantity({
            boosters,
        });

        clicksQuantity = Math.max(clicksQuantity, 1);
        const delay = 25;

        for (let i = 0; i < clicksQuantity; i++) {
            setTimeout(() => {
                const clickX = e.pageX + (Math.random() - 0.5) * 20;
                const clickY = e.pageY + (Math.random() - 0.5) * 20;

                const pointsRect = pointsRef.current.getBoundingClientRect();
                const translateX = pointsRect.left - clickX;
                const translateY = pointsRect.top - clickY;

                dispatch({
                    type: "addClick",
                    payload: {
                        click: {
                            id: Date.now(),
                            points: points,
                            x: clickX,
                            y: clickY,
                            translateX,
                            translateY,
                        },
                        consumeEnergy: i % 2 === 0,
                    },
                });
            }, i * delay);
        }
    }

    useEffect(() => {
        const autoClickerBooster = boosters.find(
            (booster) => booster.type === "auto_clicker"
        );

        if (!autoClickerBooster) return;

        let clicksQuantity = Math.max(autoClickerBooster.baseEffect, 1); // Calculate clicks quantity
        const remainingTime = autoClickerBooster.endTime - Date.now(); // Calculate remaining time

        if (remainingTime <= 0) return; // If the booster has expired, do nothing

        const card = mainCharacterRef.current;
        const rect = card.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const points = calculatePointsPerClick({
            pointsPerClick,
            level,
            boosters,
        });

        const intervalId = setInterval(() => {
            for (let i = 0; i < clicksQuantity; i++) {
                const clickX = x + (Math.random() - 0.5) * 20;
                const clickY = y + (Math.random() - 0.5) * 20;

                const pointsRect = pointsRef.current.getBoundingClientRect();
                const translateX = pointsRect.left - clickX;
                const translateY = pointsRect.top - clickY;

                dispatch({
                    type: "addClick",
                    payload: {
                        click: {
                            x: clickX,
                            y: clickY,
                            points: points,
                            translateX,
                            translateY,
                        },
                        consumeEnergy: false,
                    },
                });
            }
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [boosters, level, pointsPerClick, dispatch]);

    useEffect(() => {
        dispatch({ type: "cleanClicks" });
    }, [dispatch]);

    return (
        <div className="relative flex justify-center overflow-hidden bg-rich-black">
            <div className="relative flex h-dvh w-full max-w-xl flex-col bg-dark-grey font-bold">
                <NavigationMenu />

                <div className="flex items-center justify-between px-3 pt-3">
                    <div className="flex gap-1 text-lg text-primary">
                        <h3>Energy:</h3>
                        <div className="flex">
                            <img
                                src={energyIcon}
                                alt="Energy"
                                className="h-8 w-8"
                                draggable="false"
                            />
                            <span>
                                {energy} / {maxEnergy}
                            </span>
                        </div>
                    </div>

                    <div className="flex w-44 flex-col text-lg">
                        <div className="flex w-full justify-between text-primary">
                            <h3>Level</h3>
                            <span>{level}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
                            <div
                                style={{
                                    width: `${(experience / nextLevelExperience) * 100}%`,
                                }}
                                className="h-full rounded-full bg-primary transition-all duration-500"
                            ></div>
                        </div>
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
                                {convertToViewSystem(points)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 select-none justify-center">
                    <div
                        className="flex select-none justify-center"
                        onClick={(e) => handleCardClick(e)}
                        ref={mainCharacterRef}
                    >
                        <img
                            src={mainCharacterIcon}
                            alt="Main Character"
                            className="h-80 w-80"
                            draggable="false"
                        />
                    </div>
                </div>

                <div className="absolute bottom-0 flex w-full justify-between px-3 pb-3">
                    <NavLink
                        className="flex items-center gap-2.5 text-xl text-white"
                        to="/upgrades"
                    >
                        <img
                            src={upgrades}
                            alt="Dollar Coin"
                            className="h-8 w-8"
                        />
                        <span>Upgrades</span>
                    </NavLink>
                    <NavLink
                        className="flex items-center gap-2.5 text-xl text-white"
                        to="/boosters"
                    >
                        <img
                            src={boostersSvg}
                            alt="Dollar Coin"
                            className="h-8 w-8"
                        />
                        <span>Boosters</span>
                    </NavLink>
                </div>
            </div>

            <PointsGainAnimation clicks={clicks} dispatch={dispatch} />
        </div>
    );
}

export default Home;

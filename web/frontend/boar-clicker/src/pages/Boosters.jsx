import { useEffect, useRef } from "react";

import GetFreePoints from "../features/Boosters/components/GetFreePoints";
import GetFreeEnergyRefill from "../features/Boosters/components/GetFreeEnergyRefill";
import PointsGainAnimation from "../features/Home/components/PointsGainAnimation";

import useConvertSystem from "../hooks/useConvertSystem";
import useGameContext from "../hooks/useGameContext";

import coinIcon from "../assets/svg/coin.svg";

const BoostersList = [
    {
        type: "free_points",
        title: "Friend's Gift",
        description: "Get coins from your friend",
        levelRequirement: 1,
        baseEffect: 100,
        scalingFactor: 10,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 550,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 600,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 650,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 700,
                price: 500,
            },
        ],
        cost: 0,
        cooldown: 600,
    },
    {
        type: "free_energy_refill",
        title: "Energy Drink",
        description: "Get an energy refill",
        levelRequirement: 1,
        baseEffect: "maxEnergy",
        scalingFactor: 5,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 550,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 600,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 650,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 700,
                price: 500,
            },
        ],
        cost: 0,
        cooldown: 600,
    },
    {
        type: "free_double_clicks",
        title: "Double Clicks",
        description: "Get double clicks for 30 seconds",
        levelRequirement: 1,
        baseEffect: 2,
        scalingFactor: 0.1,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 550,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 600,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 650,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 700,
                price: 500,
            },
        ],
        cost: 0,
        cooldown: 600,
    },
    {
        type: "free_double_points",
        title: "Double Coins",
        description: "Get double coins for 30 seconds",
        levelRequirement: 1,
        baseEffect: 2,
        scalingFactor: 0.1,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 550,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 600,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 650,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 700,
                price: 500,
            },
        ],
        cost: 0,
        cooldown: 600,
    },
    {
        type: "double_clicks",
        title: "Double Clicks",
        description: "Get double clicks for 30 seconds",
        levelRequirement: 1,
        baseEffect: 2,
        scalingFactor: 0.1,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 1700,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 1800,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 1900,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 2000,
                price: 500,
            },
        ],
        cost: 100,
        cooldown: 1800,
    },
    {
        type: "double_points",
        title: "Double Coins",
        description: "Get double coins for 30 seconds",
        levelRequirement: 1,
        baseEffect: 2,
        scalingFactor: 0.1,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 1700,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 1800,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 1900,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 2000,
                price: 500,
            },
        ],
        cost: 100,
        cooldown: 1800,
    },
    {
        type: "double_energy",
        title: "Double Energy",
        description: "Get double energy for 30 seconds",
        levelRequirement: 1,
        baseEffect: 2,
        scalingFactor: 0.1,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 1700,
                price: 50,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 1800,
                price: 100,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 1900,
                price: 200,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 2000,
                price: 500,
            },
        ],
        cost: 100,
        cooldown: 1800,
    },
    {
        type: "auto_clicker",
        title: "Auto Clicker",
        description: "Get auto clicker for 30 seconds",
        levelRequirement: 1,
        baseEffect: 1,
        scalingFactor: 0.1,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 1900,
                price: 100,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 2000,
                price: 200,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 2100,
                price: 400,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 2200,
                price: 800,
            },
        ],
        cost: 200,
        cooldown: 2000,
    },
    {
        type: "mystery_box",
        title: "Mystery Box",
        description: "Get a mystery box. It can be anything 🕵️‍♂️",
        levelRequirement: 1,
        baseEffect: "random",
        scalingFactor: 0,
        upgrades: [
            {
                level: 1,
                effectCoefficient: 1.5,
                scalingCoefficient: 1.2,
                cooldown: 3500,
                price: 100,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                scalingCoefficient: 1.1,
                cooldown: 3000,
                price: 200,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                scalingCoefficient: 1.0,
                cooldown: 2500,
                price: 400,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                scalingCoefficient: 0.9,
                cooldown: 2000,
                price: 800,
            },
        ],
        cost: 500,
        cooldown: 4000,
    },
];

const getComponent = (type) => {
    switch (type) {
        case "free_points":
            return GetFreePoints;
        case "free_energy_refill":
            return GetFreeEnergyRefill;
        default:
            return null;
    }
};

function Boosters() {
    const {
        state: { points, clicks },
        dispatch,
    } = useGameContext();
    const { convertToViewSystem } = useConvertSystem();

    const pointsRef = useRef(null);

    useEffect(() => {
        dispatch({ type: "cleanClicks" });
    }, [dispatch]);

    return (
        <div className="relative flex justify-center overflow-hidden bg-rich-black">
            <div className="relative flex h-dvh w-full max-w-xl flex-col bg-dark-grey font-bold">
                <div className="mt-10 flex flex-col items-center justify-center">
                    <h3 className="text-white/75">Your balance</h3>
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

                <div className="mt-5 flex w-full flex-col gap-3 px-3">
                    <h3 className="text-xl text-white">Free daily boosters</h3>

                    <div className="flex w-full flex-col gap-2">
                        {BoostersList.map((booster, index) => {
                            const Component = getComponent(booster.type);
                            if (Component)
                                return (
                                    <Component ref={pointsRef} key={index} />
                                );
                        })}
                    </div>
                </div>
            </div>

            <PointsGainAnimation clicks={clicks} dispatch={dispatch} />
        </div>
    );
}

export default Boosters;

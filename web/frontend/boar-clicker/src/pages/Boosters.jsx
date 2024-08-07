import { useEffect, useReducer, useRef } from "react";

import FreePoints from "../features/Boosters/components/FreePoints";
import FreeEnergyRefill from "../features/Boosters/components/FreeEnergyRefill";
import FreeDoubleClicks from "../features/Boosters/components/FreeDoubleClicks";
import FreeDoublePoints from "../features/Boosters/components/FreeDoublePoints";
import DoublePoints from "../features/Boosters/components/DoublePoints";
import DoubleClicks from "../features/Boosters/components/DoubleClicks";
import DoubleEnergy from "../features/Boosters/components/DoubleEnergy";
import AutoClicker from "../features/Boosters/components/AutoClicker";
import MysteryBox from "../features/Boosters/components/MysteryBox";
import PointsGainAnimation from "../features/Home/components/PointsGainAnimation";

import useConvertSystem from "../hooks/useConvertSystem";
import useGameContext from "../hooks/useGameContext";

import coinIcon from "../assets/svg/coin.svg";
import BoosterWindow from "../features/Boosters/components/BoosterWindow";

const BoostersList = [
    {
        type: "free_points",
        title: "Friend's Gift",
        description: "Get coins from your friend",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 100,
        scalingFactor: 10,
        time: 0,
        upgrades: [],
        price: 0,
        priceCoefficient: 0,
        cooldown: 86400,
        uses: 0,
        maxUses: 1,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "free_energy_refill",
        title: "Energy Drink",
        description: "Get an energy refill",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 750,
        scalingFactor: 1,
        time: 0,
        upgrades: [],
        price: 0,
        priceCoefficient: 0,
        cooldown: 86400,
        uses: 0,
        maxUses: 5,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "free_double_clicks",
        title: "Double Clicks",
        description: "Get double clicks for 30 seconds",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 2,
        scalingFactor: 1.05, // Each use increases effect by 5%
        time: 30, // time in seconds for the booster to last
        upgrades: [],
        price: 0,
        priceCoefficient: 0,
        cooldown: 86400,
        uses: 0,
        maxUses: 1,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "free_double_points",
        title: "Double Coins",
        description: "Get double coins for 30 seconds",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 2,
        scalingFactor: 1.05, // Each use increases effect by 5%
        time: 30, // time in seconds for the booster to last
        upgrades: [],
        price: 0,
        priceCoefficient: 0,
        cooldown: 86400,
        uses: 0,
        maxUses: 1,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "double_clicks",
        title: "Double Clicks",
        description: "Double your taps for limited time",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 2,
        scalingFactor: 1.05, // Each use increases effect by 5%
        time: 30, // time in seconds for the booster to last
        upgrade_type: "next", // closest or next (closest is the closest to the current level, next is the next level)
        upgrades: [
            {
                level: 2,
                level_required: 5,
                effectCoefficient: 1.5,
                priceCoefficient: 2.25,
                timeCoefficient: 1.15,
            },
            {
                level: 3,
                level_required: 10,
                effectCoefficient: 2,
                priceCoefficient: 2.5,
                timeCoefficient: 1.35,
            },
            {
                level: 4,
                level_required: 15,
                effectCoefficient: 2.5,
                priceCoefficient: 2.75,
                timeCoefficient: 1.5,
            },
            {
                level: 5,
                level_required: 20,
                effectCoefficient: 3,
                priceCoefficient: 3,
                timeCoefficient: 1.75,
            },
            {
                level: 6,
                level_required: 25,
                effectCoefficient: 3.5,
                priceCoefficient: 3.5,
                timeCoefficient: 2,
            },
        ],
        price: 2000,
        priceCoefficient: 2,
        cooldown: 2000,
        uses: 0,
        maxUses: null,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "double_points",
        title: "Double Coins",
        description: "Get double coins for 30 seconds",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 2,
        scalingFactor: 1.05, // Each use increases effect by 5%
        time: 30, // time in seconds for the booster to last
        upgrades: [
            {
                level: 2,
                effectCoefficient: 1.5,
                priceCoefficient: 1.25,
                timeCoefficient: 1.15,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                priceCoefficient: 1.5,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                priceCoefficient: 2,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                priceCoefficient: 2.5,
            },
        ],
        price: 2000,
        priceCoefficient: 1,
        cooldown: 1800,
        uses: 0,
        maxUses: null,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "double_energy",
        title: "Double Energy",
        description: "Get double energy for 30 seconds",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 2,
        scalingFactor: 1.05, // Each use increases effect by 5%
        time: 30, // time in seconds for the booster to last
        upgrades: [
            {
                level: 2,
                effectCoefficient: 1.5,
                priceCoefficient: 1.25,
                timeCoefficient: 1.15,
            },
            {
                level: 10,
                effectCoefficient: 1.4,
                priceCoefficient: 1.75,
                timeCoefficient: 1.5,
            },
            {
                level: 50,
                effectCoefficient: 1.3,
                priceCoefficient: 3,
                timeCoefficient: 2,
            },
            {
                level: 100,
                effectCoefficient: 1.2,
                priceCoefficient: 4,
                timeCoefficient: 2.5,
            },
        ],
        price: 3000,
        priceCoefficient: 1,
        cooldown: 1800,
        uses: 0,
        maxUses: null,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "auto_clicker",
        title: "Auto Clicker",
        description: "Get auto clicker for 30 seconds",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 1, // 1 click per second
        scalingFactor: 1.05, // Each use increases effect by 5%
        time: 30, // time in seconds for the booster to last
        upgrades: [
            {
                level: 2,
                effectCoefficient: 2,
                priceCoefficient: 2,
                timeCoefficient: 1.15,
            },
            {
                level: 10,
                effectCoefficient: 3,
                priceCoefficient: 4,
                timeCoefficient: 1.5,
            },
            {
                level: 50,
                effectCoefficient: 5,
                priceCoefficient: 6,
                timeCoefficient: 2,
            },
            {
                level: 100,
                effectCoefficient: 10,
                priceCoefficient: 15,
                timeCoefficient: 2.5,
            },
        ],
        price: 2000,
        priceCoefficient: 1,
        cooldown: 2000,
        uses: 0,
        maxUses: null,
        lastUsed: null,
        endTime: null,
    },
    {
        type: "mystery_box",
        title: "Mystery Box",
        description: "Get a mystery box. It can be anything 🕵️‍♂️",
        level_required: 1,
        currentLevel: 1,
        baseEffect: 1, // 1 box per use
        scalingFactor: 0,
        upgrades: [],
        price: 5000,
        priceCoefficient: 1,
        cooldown: 4000,
        uses: 0,
        maxUses: null,
        lastUsed: null,
        endTime: null,
    },
];

const initialState = {
    isBoosterWindowOpen: false,
    booster: null,
    boosterEffects: null,
    onActivate: null,
    onUpgrade: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "openBoosterWindow":
            return {
                ...state,
                isBoosterWindowOpen: true,
                booster: action.payload.booster,
                boosterEffects: action.payload.boosterEffects,
                onActivate: action.payload.onActivate,
                onUpgrade: action.payload.onUpgrade,
            };
        case "closeBoosterWindow":
            return {
                ...state,
                isBoosterWindowOpen: false,
                booster: null,
                boosterEffects: null,
                onActivate: null,
                onUpgrade: null,
            };
        default:
            return state;
    }
}

const getComponent = (type) => {
    switch (type) {
        case "free_points":
            return FreePoints;
        case "free_energy_refill":
            return FreeEnergyRefill;
        case "free_double_clicks":
            return FreeDoubleClicks;
        case "free_double_points":
            return FreeDoublePoints;
        case "double_clicks":
            return DoubleClicks;
        case "double_points":
            return DoublePoints;
        case "double_energy":
            return DoubleEnergy;
        case "auto_clicker":
            return AutoClicker;
        case "mystery_box":
            return MysteryBox;
        default:
            return null;
    }
};

function Boosters() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isBoosterWindowOpen, booster } = state;
    const {
        state: { points, clicks },
        dispatch: gameDispatch,
        handleAutoClicker,
    } = useGameContext();
    const { convertToViewSystem } = useConvertSystem({});

    const pointsRef = useRef(null);
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }
        const cleanup = handleAutoClicker({});
        return cleanup;
    }, [handleAutoClicker]);

    useEffect(() => {
        gameDispatch({ type: "cleanClicks" });
    }, [gameDispatch]);

    return (
        <div className="relative flex justify-center overflow-hidden bg-rich-black">
            <div className="relative flex h-dvh w-full max-w-xl flex-col overflow-auto bg-dark-grey py-10 font-bold">
                <div className="flex flex-col items-center justify-center">
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
                            {convertToViewSystem({ labelValue: points })}
                        </span>
                    </div>
                </div>

                <div className="mt-5 flex w-full flex-col gap-3 px-3">
                    <h3 className="text-xl text-white">Free daily boosters</h3>

                    <div className="flex w-full flex-col gap-2">
                        {BoostersList.map((booster, index) => {
                            const Component = getComponent(booster.type);
                            if (Component && booster.type.startsWith("free_"))
                                return (
                                    <Component
                                        booster={booster}
                                        dispatch={dispatch}
                                        ref={pointsRef}
                                        key={index}
                                    />
                                );
                        })}
                    </div>
                </div>

                <div className="mt-5 flex w-full flex-col gap-3 px-3">
                    <h3 className="text-xl text-white">Premium boosters</h3>

                    <div className="flex w-full flex-col gap-2">
                        {BoostersList.map((booster, index) => {
                            const Component = getComponent(booster.type);
                            if (Component && !booster.type.startsWith("free_"))
                                return (
                                    <Component
                                        booster={booster}
                                        dispatch={dispatch}
                                        ref={pointsRef}
                                        key={index}
                                    />
                                );
                        })}
                    </div>
                </div>
            </div>

            {isBoosterWindowOpen && (
                <BoosterWindow state={state} dispatch={dispatch} />
            )}

            <PointsGainAnimation clicks={clicks} dispatch={gameDispatch} />
        </div>
    );
}

export default Boosters;

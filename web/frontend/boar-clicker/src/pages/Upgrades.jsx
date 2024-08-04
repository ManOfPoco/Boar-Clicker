import { useEffect, useRef } from "react";

import GetFreePoints from "../features/Upgrades/components/GetFreePoints";
import PointsGainAnimation from "../features/Home/components/PointsGainAnimation";

import useConvertSystem from "../hooks/useConvertSystem";
import useGameContext from "../hooks/useGameContext";

import coinIcon from "../assets/svg/coin.svg";
import GetFreeEnergyRefill from "../features/Upgrades/components/GetFreeEnergyRefill";

function Upgrades() {
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
                    <h3 className="text-white text-xl">Free daily boosters</h3>

                    <div className="flex w-full flex-col gap-2">
                        <GetFreePoints ref={pointsRef} />
                        <GetFreeEnergyRefill />
                    </div>
                </div>
            </div>

            <PointsGainAnimation clicks={clicks} dispatch={dispatch} />
        </div>
    );
}

export default Upgrades;

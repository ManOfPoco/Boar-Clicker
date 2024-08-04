import { forwardRef } from "react";

import useConvertSystem from "../../../hooks/useConvertSystem";
import useGameContext from "../../../hooks/useGameContext";

import coinIcon from "../../../assets/svg/coin.svg";

const GetFreePoints = forwardRef(function GetFreePoints(
    { ...props },
    pointsRef
) {
    const {
        state: { pointsPerClick, level, isEveryDayMoneyCollected },
        dispatch,
    } = useGameContext();
    const { convertToViewSystem } = useConvertSystem();

    const pointsQuantity = level * pointsPerClick * 1000;

    function handleCardClick(e) {
        const pointsRect = pointsRef.current.getBoundingClientRect();
        const numberOfClicks = 10; // Number of simulated clicks
        const delay = 50; // Delay between each click in milliseconds

        const basePoints = Math.floor(pointsQuantity / numberOfClicks);
        const remainderPoints = pointsQuantity % numberOfClicks;

        for (let i = 0; i < numberOfClicks; i++) {
            setTimeout(() => {
                let clickPoints = basePoints;
                if (i < remainderPoints) {
                    clickPoints += 1; // Distribute remainder points
                }

                let click = {
                    id: Date.now() + i,
                    points: clickPoints,
                    x: e.pageX + (Math.random() - 0.5) * 20, // Randomize x position slightly
                    y: e.pageY + (Math.random() - 0.5) * 20, // Randomize y position slightly
                };

                const translateX = pointsRect.left - click.x;
                const translateY = pointsRect.top - click.y;

                click = {
                    ...click,
                    translateX,
                    translateY,
                };

                dispatch({
                    type: "addBonusClick",
                    payload: click,
                });
            }, i * delay);
        }
        dispatch({ type: "collectEveryDayMoney" });
    }

    return (
        <div
            className={`flex items-center gap-4 rounded-md px-3 py-2 ${isEveryDayMoneyCollected ? "bg-onyx/50 pointer-events-none cursor-not-allowed" : "bg-onyx cursor-pointer"}`}
            onClick={(e) => handleCardClick(e)}
        >
            <img
                src={coinIcon}
                alt="Dollar Coin"
                className="h-12 w-12"
                draggable="false"
            />

            <div className="flex flex-col gap-1 text-white">
                <h3>Friend&apos;s gift</h3>
                <div className="flex items-center gap-1.5">
                    <img
                        src={coinIcon}
                        alt="Dollar Coin"
                        className="h-5 w-5"
                        draggable="false"
                    />
                    <span className="text-sm text-white/75">
                        {convertToViewSystem(pointsQuantity)} coins
                    </span>
                </div>
            </div>
        </div>
    );
});

export default GetFreePoints;

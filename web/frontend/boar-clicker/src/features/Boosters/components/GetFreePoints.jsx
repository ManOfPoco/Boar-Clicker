import { forwardRef } from "react";
import { createPointsAnimation } from "../../../utils/createPointsAnimation";

import Booster from "./Booster";

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

    function handleClick(e) {
        createPointsAnimation({
            event: e,
            pointsRef,
            pointsQuantity,
            dispatch,
        });
        dispatch({ type: "collectEveryDayMoney" });
    }

    return (
        <Booster
            className={
                isEveryDayMoneyCollected
                    ? "pointer-events-none cursor-not-allowed bg-onyx/50"
                    : "cursor-pointer bg-onyx"
            }
            handleClick={handleClick}
            icon={coinIcon}
            title="Energy drink"
            subtitle={`${convertToViewSystem(pointsQuantity)} coins`}
            subtitleIcon={coinIcon}
        />
    );
});

export default GetFreePoints;

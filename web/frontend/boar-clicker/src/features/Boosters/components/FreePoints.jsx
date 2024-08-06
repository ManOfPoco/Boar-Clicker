import { forwardRef } from "react";
import { createPointsAnimation } from "../../../utils/createPointsAnimation.js";

import Booster from "./Booster";

import useConvertSystem from "../../../hooks/useConvertSystem";
import useGameContext from "../../../hooks/useGameContext";

import coinIcon from "../../../assets/svg/coin.svg";

const FreePoints = forwardRef(function FreePoints({ booster }, pointsRef) {
    const {
        state: { pointsPerClick, level },
        dispatch,
    } = useGameContext();
    const { convertToViewSystem } = useConvertSystem();

    const {
        type,
        title,
        description,
        levelRequirement,
        baseEffect,
        scalingFactor,
        upgrades,
        price,
        cooldown,
        uses,
        maxUses,
        lastUsed,
        endTime,
    } = booster;

    const pointsQuantity = baseEffect * scalingFactor * pointsPerClick * level;

    function handleClick(e) {
        createPointsAnimation({
            event: e,
            pointsRef,
            pointsQuantity,
            dispatch,
        });
    }

    return (
        <Booster
            className={
                uses === maxUses
                    ? "pointer-events-none cursor-not-allowed bg-onyx/50"
                    : "cursor-pointer bg-onyx"
            }
            handleClick={handleClick}
            icon={coinIcon}
            title={title}
            subtitle={`${convertToViewSystem(pointsQuantity)} coins`}
            subtitleIcon={coinIcon}
        />
    );
});

export default FreePoints;

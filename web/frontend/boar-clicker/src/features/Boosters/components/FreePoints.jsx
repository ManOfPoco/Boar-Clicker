import { forwardRef } from "react";
import { createPointsAnimation } from "../../../utils/createPointsAnimation.js";

import Booster from "./Booster";

import useConvertSystem from "../../../hooks/useConvertSystem";
import useGameContext from "../../../hooks/useGameContext";

import coinIcon from "../../../assets/svg/coin.svg";

const FreePoints = forwardRef(function FreePoints(
    { booster, dispatch },
    pointsRef
) {
    const {
        state: { pointsPerClick, level },
        dispatch: gameDispatch,
    } = useGameContext();
    const { convertToViewSystem } = useConvertSystem();

    const {
        type,
        title,
        description,
        level_required,
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

    function handleActivate(e) {
        createPointsAnimation({
            event: e,
            pointsRef,
            pointsQuantity,
            dispatch: gameDispatch,
        });
    }

    return (
        <Booster
            className={
                uses === maxUses
                    ? "pointer-events-none cursor-not-allowed bg-onyx/50"
                    : "cursor-pointer bg-onyx"
            }
            handleClick={handleActivate}
            icon={coinIcon}
            title={title}
            subtitle={`${convertToViewSystem({ labelValue: pointsQuantity })} coins`}
            subtitleIcon={coinIcon}
            isFreeBooster={type.startsWith("free_")}
        />
    );
});

export default FreePoints;

import { forwardRef } from "react";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import { getClosestUpgrade } from "../../../utils/getClosestUpgrade";

import doubleTap from "../../../assets/svg/double-tap.svg";

const FreeDoubleClicks = forwardRef(function FreeDoubleClicks(
    { booster },
    pointsRef
) {
    const {
        state: { level },
        dispatch,
    } = useGameContext();

    const {
        type,
        title,
        description,
        levelRequirement,
        baseEffect,
        scalingFactor,
        time,
        upgrades,
        price,
        cooldown,
        uses,
        maxUses,
        lastUsed,
        endTime,
    } = booster;

    function handleClick() {
        if (level < levelRequirement) return;

        let levelScaling = 1;
        let baseBoostTime = time * 1000;

        const upgrade = getClosestUpgrade({ upgrades, level });

        if (upgrade) {
            levelScaling = upgrade.effectCoefficient;
            baseBoostTime = time * upgrade.timeCoefficient;
        }

        dispatch({
            type: "activateBooster",
            payload: {
                booster: {
                    type,
                    baseEffect,
                    usesScaling: uses > 0 ? uses * scalingFactor : 1,
                    levelScaling: levelScaling,
                    lastUsed: Date.now(),
                    endTime: Date.now() + baseBoostTime,
                },
            },
        });
    }

    return (
        <Booster
            className="cursor-pointer bg-onyx"
            handleClick={handleClick}
            icon={doubleTap}
            title={title}
            subtitle={`x2 clicks for 30 seconds`}
            subtitleIcon={doubleTap}
        />
    );
});

export default FreeDoubleClicks;

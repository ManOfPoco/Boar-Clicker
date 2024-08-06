import { forwardRef } from "react";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import { getClosestUpgrade } from "../../../utils/getClosestUpgrade";

import energy from "../../../assets/svg/energy.svg";

const DoubleEnergy = forwardRef(function DoubleEnergy({ booster }, pointsRef) {
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
            type: "activateDoubleEnergyBooster",
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
            icon={energy}
            title={title}
            subtitle={`x2 energy for 30 seconds`}
            subtitleIcon={energy}
        />
    );
});

export default DoubleEnergy;

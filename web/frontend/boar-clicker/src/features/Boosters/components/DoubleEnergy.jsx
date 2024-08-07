import { forwardRef } from "react";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import useConvertSystem from "../../../hooks/useConvertSystem";
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
        level_required,
        currentLevel,
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
    const { convertToViewSystem } = useConvertSystem();

    function handleClick() {
        if (level < level_required) return;

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
            isFreeBooster={type.startsWith("free_")}
            upgradePrice={convertToViewSystem({
                labelValue: price,
            })}
            currentLevel={currentLevel}
        />
    );
});

export default DoubleEnergy;

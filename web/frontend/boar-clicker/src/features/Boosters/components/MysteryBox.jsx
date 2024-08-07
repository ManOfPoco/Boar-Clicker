import { forwardRef } from "react";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import useConvertSystem from "../../../hooks/useConvertSystem";
import { getClosestUpgrade } from "../../../utils/getClosestUpgrade";

import mysteryGift from "../../../assets/svg/mystery-gift.svg";

const MysteryBox = forwardRef(function MysteryBox({ booster }, pointsRef) {
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

        // TODO: Implement mystery box logic when backend is ready
    }

    return (
        <Booster
            className="cursor-pointer bg-onyx"
            handleClick={handleClick}
            icon={mysteryGift}
            title={title}
            isFreeBooster={type.startsWith("free_")}
            upgradePrice={convertToViewSystem({
                labelValue: price,
            })}
            currentLevel={currentLevel}
        />
    );
});

export default MysteryBox;

import { forwardRef } from "react";
import toast from "react-hot-toast";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import { getUpgradeScaling } from "../../../utils/getUpgradeScaling";

import mysteryGift from "../../../assets/svg/mystery-gift.svg";

const MysteryBox = forwardRef(function MysteryBox(
    { booster, dispatch },
    pointsRef
) {
    const {
        state: { level },
    } = useGameContext();

    const {
        type,
        title,
        level_required,
        currentLevel,
        baseEffect,
        scalingFactor,
        time,
        upgrades,
        price,
        priceCoefficient,
        uses,
        maxUses,
        endTime,
    } = booster;

    let isMaxLevel =
        upgrades.length > 0
            ? upgrades[upgrades.length - 1].level === currentLevel
            : true;

    const upgrade =
        upgrades.length > 0
            ? (upgrades.find((upgrade) => upgrade.level === currentLevel) ??
              null)
            : null;
    const nextUpgrade =
        upgrades.length > 0
            ? (upgrades.find((upgrade) => upgrade.level > currentLevel) ?? null)
            : null;

    const { effectScaling, upgradePriceCoefficient, baseBoostTime } =
        getUpgradeScaling({
            time,
            priceCoefficient,
            upgrade,
        });

    const { effectScaling: nextEffectScaling, baseBoostTime: nextBaseBoost } =
        getUpgradeScaling({
            time,
            priceCoefficient,
            upgrade: nextUpgrade,
        });

    const upgradePrice = isMaxLevel ? 0 : price * upgradePriceCoefficient;
    const usesScaling = uses > 0 ? Math.round(uses * scalingFactor) : 1;

    const currentEffect = Math.round(baseEffect * usesScaling * effectScaling);
    const nextUpgradeEffect = Math.round(
        baseEffect * usesScaling * nextEffectScaling
    );

    const currentEffectDescription = `${currentEffect} taps per second`;
    const nextUpgradeEffectDescription = `${nextUpgradeEffect} taps per second`;

    function handleUpgrade() {
        if (level < level_required || level < upgrade.level_required) return;
        if ((endTime ?? 0) > Date.now()) return;
        if ((uses ?? 0) >= (maxUses ?? Infinity)) return;

        dispatch({
            type: "upgradeBooster",
            payload: {
                booster: {
                    type,
                    currentLevel: currentLevel,
                },
                upgradePrice,
            },
        });
    }

    function handleActivate() {
        if (level < level_required) return;
        if ((endTime ?? 0) > Date.now()) return;
        if ((uses ?? 0) >= (maxUses ?? Infinity)) return;

        toast.success("Mystery gift opened", {
            style: {
                backgroundColor: "#1e1e1e",
                color: "#fff",
            },
        });

        // Implement some logic here when backend is ready
    }

    function handleOpenBoosterWindow() {
        dispatch({
            type: "openBoosterWindow",
            payload: {
                booster: {
                    ...booster,
                    isFreeBooster: false,
                    icon: mysteryGift,
                    upgrade: upgrade,
                    nextUpgrade: nextUpgrade,
                    upgradePrice: upgradePrice,
                    isMaxLevel: isMaxLevel,
                },
                boosterEffects: {
                    currentEffectDescription: currentEffectDescription,
                    nextUpgradeEffectDescription: nextUpgradeEffectDescription,
                    currentTime: baseBoostTime,
                    nextUpgradeTime: nextBaseBoost,
                },
                onActivate: handleActivate,
                onUpgrade: handleUpgrade,
            },
        });
    }

    return (
        <Booster
            className="cursor-pointer bg-onyx"
            handleClick={handleOpenBoosterWindow}
            icon={mysteryGift}
            title={title}
            isMaxLevel={isMaxLevel}
            isFreeBooster={false}
            upgradePrice={upgradePrice}
            currentLevel={currentLevel}
        />
    );
});

export default MysteryBox;

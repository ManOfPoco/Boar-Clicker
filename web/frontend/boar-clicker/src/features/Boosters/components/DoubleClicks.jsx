import { forwardRef } from "react";
import toast from "react-hot-toast";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import { getUpgradeScaling } from "../../../utils/getUpgradeScaling";

import doubleTap from "../../../assets/svg/double-tap.svg";

const DoubleClicks = forwardRef(function DoubleClicks(
    { booster, dispatch },
    pointsRef
) {
    const {
        state: { level, points },
        dispatch: gameDispatch,
    } = useGameContext();

    const {
        type,
        title,
        level_required,
        currentLevel,
        baseEffect,
        scalingFactor,
        time,
        upgrade_type,
        upgrades,
        price,
        priceCoefficient,
        cooldown,
        uses,
        maxUses,
        lastUsed,
    } = booster;

    let isMaxLevel = upgrades[upgrades.length - 1].level === currentLevel;

    const upgrade = upgrades.find((upgrade) => upgrade.level === currentLevel);
    const nextUpgrade = upgrades.find(
        (upgrade) => upgrade.level > currentLevel
    );

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

    const upgradePrice = price * upgradePriceCoefficient;
    const usesScaling = uses > 0 ? Math.round(uses * scalingFactor) : 1;

    const currentEffect = Math.round(baseEffect * usesScaling * effectScaling);
    const nextUpgradeEffect = Math.round(
        baseEffect * usesScaling * nextEffectScaling
    );

    const currentEffectDescription = `${currentEffect} taps per tap`;
    const nextUpgradeEffectDescription = `${nextUpgradeEffect} taps per tap`;

    function handleActivate() {
        if (level < level_required) return;
        if ((lastUsed ?? 0) + cooldown * 1000 > Date.now()) return;
        if ((uses ?? 0) >= (maxUses ?? Infinity)) return;

        toast.success("Double clicks activated", {
            style: {
                backgroundColor: "#1e1e1e",
                color: "#fff",
            },
        });

        gameDispatch({
            type: "activateBooster",
            payload: {
                booster: {
                    ...booster,
                    lastUsed: Date.now(),
                    endTime: Date.now() + baseBoostTime,
                    uses: (uses ?? 0) + 1,
                },
            },
        });
    }

    function handleUpgrade() {
        if (level < level_required) return;
        if (points < upgradePrice) return;
        if (isMaxLevel) return;

        gameDispatch({
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

    function handleOpenBoosterWindow() {
        dispatch({
            type: "openBoosterWindow",
            payload: {
                booster: {
                    ...booster,
                    icon: doubleTap,
                    subtitle: null,
                    subtitleIcon: null,
                    isFreeBooster: false,
                    upgrade: upgrade,
                    nextUpgrade: nextUpgrade,
                    upgradePrice: upgradePrice,
                    isMaxLevel: isMaxLevel,
                },
                boosterEffects: {
                    currentEffectDescription: currentEffectDescription,
                    nextUpgradeEffectDescription: nextUpgradeEffectDescription,
                    currentTime: time,
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
            icon={doubleTap}
            title={title}
            isFreeBooster={false}
            upgradePrice={upgradePrice}
            currentLevel={currentLevel}
        />
    );
});

export default DoubleClicks;

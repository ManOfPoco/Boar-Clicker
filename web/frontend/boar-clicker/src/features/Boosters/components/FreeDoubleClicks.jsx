import { forwardRef } from "react";

import Booster from "./Booster";

import useGameContext from "../../../hooks/useGameContext";
import { getClosestUpgrade } from "../../../utils/getClosestUpgrade";

import doubleTap from "../../../assets/svg/double-tap.svg";
import toast from "react-hot-toast";

const FreeDoubleClicks = forwardRef(function FreeDoubleClicks(
    { booster, dispatch },
    pointsRef
) {
    const {
        state: { level },
        dispatch: gameDispatch,
    } = useGameContext();

    const {
        type,
        title,
        description,
        level_required,
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

    const subtitle = `x2 taps for 30 seconds`;
    const isFreeBooster = type.startsWith("free_");

    function handleActivate() {
        if (level < level_required) return;

        let levelScaling = 1;
        let baseBoostTime = time * 1000;

        const upgrade = getClosestUpgrade({ upgrades, level });

        if (upgrade) {
            levelScaling = upgrade.effectCoefficient;
            baseBoostTime = time * upgrade.timeCoefficient;
        }

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

    function handleOpenBoosterWindow() {
        dispatch({
            type: "openBoosterWindow",
            payload: {
                booster: {
                    ...booster,
                    icon: doubleTap,
                    subtitle: subtitle,
                    subtitleIcon: doubleTap,
                    isFreeBooster: isFreeBooster,
                },
                onActivate: handleActivate,
            },
        });
    }

    return (
        <Booster
            className="cursor-pointer bg-onyx"
            handleClick={handleOpenBoosterWindow}
            icon={doubleTap}
            title={title}
            subtitle={subtitle}
            subtitleIcon={doubleTap}
            isFreeBooster={isFreeBooster}
        />
    );
});

export default FreeDoubleClicks;

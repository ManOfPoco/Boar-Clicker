import { forwardRef } from "react";
import toast from "react-hot-toast";

import Booster from "./Booster";
import useGameContext from "../../../hooks/useGameContext";

import doubleTap from "../../../assets/svg/double-tap.svg";

const FreeDoubleClicks = forwardRef(function FreeDoubleClicks(
    { booster, dispatch },
    pointsRef
) {
    const {
        state: { level },
        dispatch: gameDispatch,
    } = useGameContext();

    const { title, level_required, time, uses, maxUses, endTime } = booster;

    const subtitle = `x2 taps for 30 seconds`;

    function handleActivate() {
        if (level < level_required) return;
        if ((endTime ?? 0) > Date.now()) return;
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
                    endTime: Date.now() + time * 1000,
                    uses: (uses ?? 0) + 1,
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
                    isFreeBooster: true,
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
            isFreeBooster={true}
        />
    );
});

export default FreeDoubleClicks;

import { forwardRef } from "react";
import toast from "react-hot-toast";

import Booster from "./Booster";
import useGameContext from "../../../hooks/useGameContext";

import energyDrink from "../../../assets/svg/energy-drink.svg";
import energy from "../../../assets/svg/energy.svg";

const FreeEnergyRefill = forwardRef(function FreeEnergyRefill(
    { booster, dispatch },
    ref
) {
    const {
        state: { level },
        dispatch: gameDispatch,
    } = useGameContext();

    const { title, level_required, uses, maxUses, endTime } = booster;

    function handleActivate() {
        if (level < level_required) return;
        if ((endTime ?? 0) > Date.now()) return;
        if ((uses ?? 0) >= (maxUses ?? Infinity)) return;

        toast.success("Energy refilled!", {
            style: {
                backgroundColor: "#1e1e1e",
                color: "#fff",
            },
        });
        // Implement the request to the server
        gameDispatch({ type: "restoreFullEnergy" });
    }

    const subtitle = `${maxUses - uses}/5 energy refills`;

    function handleOpenBoosterWindow() {
        dispatch({
            type: "openBoosterWindow",
            payload: {
                booster: {
                    ...booster,
                    icon: energyDrink,
                    subtitle: subtitle,
                    subtitleIcon: energy,
                    isFreeBooster: true,
                },
                onActivate: handleActivate,
            },
        });
    }

    return (
        <Booster
            className={
                uses < maxUses
                    ? "bg-dark-gray cursor-pointer bg-onyx"
                    : "pointer-events-none cursor-not-allowed bg-onyx/50"
            }
            handleClick={handleOpenBoosterWindow}
            icon={energyDrink}
            title={title}
            subtitle={subtitle}
            subtitleIcon={energy}
            isFreeBooster={true}
        />
    );
});

export default FreeEnergyRefill;

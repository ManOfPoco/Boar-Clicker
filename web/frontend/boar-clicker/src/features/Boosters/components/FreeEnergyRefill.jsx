import { forwardRef } from "react";

import Booster from "./Booster";
import useGameContext from "../../../hooks/useGameContext";

import energyDrink from "../../../assets/svg/energy-drink.svg";
import energy from "../../../assets/svg/energy.svg";
import toast from "react-hot-toast";

const FreeEnergyRefill = forwardRef(function FreeEnergyRefill(
    { booster, dispatch },
    ref
) {
    const { dispatch: gameDispatch } = useGameContext();

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

    function handleActivate() {
        toast.success("Energy refilled!", {
            style: {
                backgroundColor: "#1e1e1e",
                color: "#fff",
            },
        });
        if (uses < maxUses) {
            // Implement the request to the server
            gameDispatch({ type: "restoreFullEnergy" });
        }
    }

    const subtitle = `${maxUses - uses}/5 energy refills`;
    const isFreeBooster = type.startsWith("free_");

    function handleOpenBoosterWindow() {
        dispatch({
            type: "openBoosterWindow",
            payload: {
                booster: {
                    ...booster,
                    icon: energyDrink,
                    subtitle: subtitle,
                    subtitleIcon: energy,
                    isFreeBooster: isFreeBooster,
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
            isFreeBooster={isFreeBooster}
        />
    );
});

export default FreeEnergyRefill;

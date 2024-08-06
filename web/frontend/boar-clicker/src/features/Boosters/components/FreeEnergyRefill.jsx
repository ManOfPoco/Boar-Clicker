import { forwardRef } from "react";

import Booster from "./Booster";
import useGameContext from "../../../hooks/useGameContext";

import energyDrink from "../../../assets/svg/energy-drink.svg";
import energy from "../../../assets/svg/energy.svg";

const FreeEnergyRefill = forwardRef(function FreeEnergyRefill(
    { booster },
    ref
) {
    const { dispatch } = useGameContext();

    const {
        type,
        title,
        description,
        levelRequirement,
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

    function handleClick() {
        if (uses < maxUses) {
            dispatch({ type: "restoreFullEnergy" });
        }
    }

    return (
        <Booster
            className={
                uses < maxUses
                    ? "bg-dark-gray cursor-pointer bg-onyx"
                    : "pointer-events-none cursor-not-allowed bg-onyx/50"
            }
            handleClick={handleClick}
            icon={energyDrink}
            title={title}
            subtitle={`${maxUses - uses}/5 energy refills`}
            subtitleIcon={energy}
        />
    );
});

export default FreeEnergyRefill;

import { forwardRef } from "react";

import useGameContext from "../../../hooks/useGameContext";

import energyDrink from "../../../assets/svg/energy-drink.svg";
import energy from "../../../assets/svg/energy.svg";
import Booster from "./Booster";

const GetFreeEnergyRefill = forwardRef(function GetFreeEnergyRefill() {
    const {
        state: { availableEnergyRefill },
        dispatch,
    } = useGameContext();

    function handleClick() {
        if (availableEnergyRefill > 0) {
            dispatch({ type: "restoreFullEnergy" });
        }
    }

    return (
        <Booster
            className={
                availableEnergyRefill > 0
                    ? "bg-dark-gray cursor-pointer bg-onyx"
                    : "pointer-events-none cursor-not-allowed bg-onyx/50"
            }
            handleClick={handleClick}
            icon={energyDrink}
            title="Energy drink"
            subtitle={`${availableEnergyRefill}/5 energy refills`}
            subtitleIcon={energy}
        />
    );
});

export default GetFreeEnergyRefill;

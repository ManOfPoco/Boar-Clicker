import useGameContext from "../../../hooks/useGameContext";

import coinIcon from "../../../assets/svg/coin.svg";

function GetFreeEnergyRefill() {
    const {
        state: { availableEnergyRefill },
        dispatch,
    } = useGameContext();

    function handleCardClick() {
        if (availableEnergyRefill > 0) {
            dispatch({ type: "restoreFullEnergy" });
        }
    }

    return (
        <div
            className={`flex items-center gap-4 rounded-md px-3 py-2 ${availableEnergyRefill > 0 ? "bg-dark-gray bg-onyx cursor-pointer" : "bg-onyx/50 pointer-events-none cursor-not-allowed"}`}
            onClick={(e) => handleCardClick(e)}
        >
            <img
                src={coinIcon}
                alt="Dollar Coin"
                className="h-12 w-12"
                draggable="false"
            />

            <div className="flex flex-col gap-1 text-white">
                <h3>Friend&apos;s gift</h3>
                <div className="flex items-center gap-1.5">
                    <img
                        src={coinIcon}
                        alt="Dollar Coin"
                        className="h-5 w-5"
                        draggable="false"
                    />
                    <span className="text-sm text-white/75">
                        {availableEnergyRefill}/5 available
                    </span>
                </div>
            </div>
        </div>
    );
}

export default GetFreeEnergyRefill;

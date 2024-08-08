import { useEffect, useRef } from "react";

import useConvertSystem from "../../../hooks/useConvertSystem";
import useGameContext from "../../../hooks/useGameContext";
import { getHumanTime } from "../../../utils/getHumanTime";
import { validateBoosterWindowData } from "../utils/validateBoosterWindowData.js";

import closeCircle from "../../../assets/svg/close-circle.svg";
import coinIcon from "../../../assets/svg/coin.svg";

function BoosterWindow({ state, dispatch }) {
    const {
        state: { level, points },
    } = useGameContext();
    const {
        isBoosterWindowOpen,
        booster = {},
        boosterEffects = {},
        onActivate,
        onUpgrade,
    } = state;

    const { isValid, missingField } = validateBoosterWindowData(
        booster,
        boosterEffects
    );

    const {
        title,
        description,
        level_required,
        currentLevel,
        cooldown,
        uses,
        maxUses,
        endTime,
        icon,
        subtitle,
        subtitleIcon,
        isFreeBooster,
        upgradePrice,
        upgrade,
        nextUpgrade,
        isMaxLevel,
    } = booster;

    const {
        currentEffectDescription,
        nextUpgradeEffectDescription,
        currentTime,
        nextUpgradeTime,
    } = boosterEffects;

    const { convertToViewSystem } = useConvertSystem();
    const boosterWindowRef = useRef(null);

    const isUpgradePossible =
        level >= nextUpgrade?.level_required &&
        !isMaxLevel &&
        points >= upgradePrice;
    const isActivatePossible =
        level >= level_required &&
        endTime <= Date.now() &&
        (uses ?? 0) < (maxUses ?? Infinity);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                boosterWindowRef.current &&
                !boosterWindowRef.current.contains(event.target)
            ) {
                dispatch({
                    type: "closeBoosterWindow",
                });
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);

    if (!isValid) {
        return (
            <div className="absolute inset-0 z-50 flex h-dvh items-center justify-center bg-black text-white">
                Missing field: {missingField}
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/50 transition-all duration-500"></div>
            <div
                className="min-h-1/2 absolute top-1/2 z-50 h-fit max-h-9/10 w-full max-w-xl -translate-y-1/2 overflow-y-auto rounded-xl bg-dark-grey shadow-glow"
                ref={boosterWindowRef}
            >
                <div
                    className="absolute right-0 top-0 p-3"
                    onClick={() =>
                        dispatch({
                            type: "closeBoosterWindow",
                        })
                    }
                >
                    <img src={closeCircle} alt="Close" className="h-8 w-8" />
                </div>

                <div className="flex h-full flex-col items-center justify-center gap-7 p-10 text-xl text-white">
                    <div className="flex w-full flex-col items-center gap-3">
                        <img src={icon} alt={title} className="h-28 w-28" />
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <p className="text-center text-base">{description}</p>
                        <p className="text-center text-base">
                            Cooldown: {getHumanTime({ seconds: cooldown })}
                        </p>
                        {isFreeBooster ? (
                            <div className="flex w-full flex-col items-center gap-5">
                                <div className="flex items-center gap-1.5 text-sm text-white/75">
                                    <img
                                        src={subtitleIcon}
                                        alt={subtitle}
                                        className="h-5 w-5"
                                        draggable="false"
                                    />
                                    <span>{subtitle}</span>
                                </div>
                                {isActivatePossible ? (
                                    <button
                                        className="w-full rounded-lg bg-green-600 py-2 text-base font-bold"
                                        onClick={onActivate}
                                    >
                                        Activate
                                    </button>
                                ) : (
                                    <button
                                        className="w-full cursor-not-allowed rounded-lg bg-green-600/50 py-2 text-base font-bold"
                                        disabled
                                    >
                                        Activate
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex w-full items-stretch justify-center gap-2.5">
                                <div className="flex w-1/2 flex-none flex-col justify-between gap-2.5">
                                    <div className="flex flex-col items-center gap-2 text-lg">
                                        <span>{currentLevel} lvl</span>
                                        <span>{currentEffectDescription}</span>
                                        <span>{currentTime} seconds</span>
                                        {!isMaxLevel && (
                                            <span>
                                                Required level:{" "}
                                                {upgrade?.level_required ||
                                                    level_required}
                                            </span>
                                        )}
                                        <span>Free</span>
                                    </div>
                                    {isActivatePossible ? (
                                        <button
                                            className="w-full rounded-lg bg-green-600 py-2 text-base font-bold"
                                            onClick={onActivate}
                                        >
                                            Activate
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full cursor-not-allowed rounded-lg bg-green-600/50 py-2 text-base font-bold"
                                            disabled
                                        >
                                            Activate
                                        </button>
                                    )}
                                </div>
                                <div className="flex w-1/2 flex-none flex-col justify-between gap-5">
                                    <div className="flex flex-col items-center gap-2 text-lg">
                                        <span>
                                            {isMaxLevel
                                                ? "Max level"
                                                : `${currentLevel + 1} lvl`}
                                        </span>

                                        <span>
                                            {isMaxLevel
                                                ? "Max level"
                                                : nextUpgradeEffectDescription}
                                        </span>

                                        <span>
                                            {isMaxLevel
                                                ? "Max level"
                                                : `${nextUpgradeTime} seconds`}
                                        </span>

                                        {!isMaxLevel && (
                                            <span>
                                                Required level:{" "}
                                                {nextUpgrade.level_required}
                                            </span>
                                        )}

                                        {isMaxLevel ? (
                                            <span>Max level</span>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src={coinIcon}
                                                    alt="coin-icon"
                                                    className="h-5 w-5"
                                                    draggable="false"
                                                />
                                                <span>
                                                    {convertToViewSystem({
                                                        labelValue:
                                                            upgradePrice,
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {isUpgradePossible ? (
                                        <button
                                            className="w-full rounded-lg bg-blue-500 py-2 text-base font-bold"
                                            onClick={onUpgrade}
                                        >
                                            Upgrade
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full cursor-not-allowed rounded-lg bg-blue-500/50 py-2 text-base font-bold"
                                            disabled
                                        >
                                            {isMaxLevel
                                                ? "Max level"
                                                : "Upgrade"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoosterWindow;

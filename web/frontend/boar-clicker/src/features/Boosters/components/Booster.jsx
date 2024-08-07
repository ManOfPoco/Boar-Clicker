import arrowPointRight from "../../../assets/svg/arrow-point-right.svg";
import coinIcon from "../../../assets/svg/coin.svg";

import useConvertSystem from "../../../hooks/useConvertSystem";

function Booster({
    className,
    handleClick,
    icon,
    title,
    subtitle,
    subtitleIcon,
    isFreeBooster,
    currentLevel,
    upgradePrice,
}) {
    const { convertToViewSystem } = useConvertSystem();

    return (
        <div
            className={`flex items-center justify-between gap-2.5 rounded-md px-3 py-2 ${className}`}
            onClick={(e) => handleClick(e)}
        >
            <div className="flex gap-4">
                <img
                    src={icon}
                    alt={title}
                    className="h-12 w-12"
                    draggable="false"
                />

                <div className="flex flex-col gap-1 text-white">
                    <h3>{title}</h3>
                    {isFreeBooster ? (
                        <div className="flex items-center gap-1.5 text-sm text-white/75">
                            <img
                                src={subtitleIcon}
                                alt={subtitle}
                                className="h-5 w-5"
                                draggable="false"
                            />
                            <span>{subtitle}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-base">
                                <img
                                    src={coinIcon}
                                    alt="coin-icon"
                                    className="h-5 w-5"
                                    draggable="false"
                                />
                                <h5>
                                    {convertToViewSystem({
                                        labelValue: upgradePrice,
                                    })}
                                </h5>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-white/50">•</span>
                                <span className="text-white/50">
                                    {currentLevel} lvl
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <img
                src={arrowPointRight}
                alt="Arrow Point Right"
                className="h-4 w-4"
            />
        </div>
    );
}

export default Booster;

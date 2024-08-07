import { getUpgradeScaling } from "./getUpgradeScaling";

export function getBoosterLevelEffect({ booster }) {
    const { time, currentLevel, priceCoefficient, upgrades } = booster;

    const upgrade = upgrades.find((upgrade) => upgrade.level === currentLevel);

    return getUpgradeScaling({
        time,
        priceCoefficient,
        upgrade,
    });
}

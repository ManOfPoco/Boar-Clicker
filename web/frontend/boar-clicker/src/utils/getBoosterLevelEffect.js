import { getUpgradeScaling } from "./getUpgradeScaling";

export function getBoosterLevelEffect({ booster }) {
    const { time, currentLevel, priceCoefficient, upgrades } = booster;

    const upgrade =
        upgrades.length > 0
            ? (upgrades.find((upgrade) => upgrade.level === currentLevel) ??
              null)
            : null;

    return getUpgradeScaling({
        time,
        priceCoefficient,
        upgrade,
    });
}

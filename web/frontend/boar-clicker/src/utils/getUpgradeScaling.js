export function getUpgradeScaling({ time, priceCoefficient, upgrade }) {
    let effectScaling = 1;
    let baseBoostTime = time * 1000;
    let upgradePriceCoefficient = priceCoefficient;

    if (upgrade) {
        effectScaling = upgrade.effectCoefficient;
        upgradePriceCoefficient = upgrade.priceCoefficient;
        baseBoostTime = time * upgrade.timeCoefficient;
    }

    return { effectScaling, upgradePriceCoefficient, baseBoostTime };
}

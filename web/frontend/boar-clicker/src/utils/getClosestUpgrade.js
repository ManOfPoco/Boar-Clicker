export function getClosestUpgrade({ upgrades, level }) {
    let closestUpgrade = upgrades.find((upgrade) => level >= upgrade.level);

    return closestUpgrade;
}

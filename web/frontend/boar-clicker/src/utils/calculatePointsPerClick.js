export function calculatePointsPerClick({ pointsPerClick, level, boosters }) {
    let pointsPerClickMultiplier = 1;
    let pointsPerClickBoost = 0;

    boosters.forEach((booster) => {
        if (booster.endTime > Date.now()) {
            switch (booster.type) {
                case "double_points":
                case "free_double_points":
                    pointsPerClickMultiplier *=
                        booster.baseEffect *
                        booster.usesScaling *
                        booster.levelScaling;
                    break;
                default:
                    break;
            }
        }
    });

    pointsPerClickBoost = pointsPerClick * level * pointsPerClickMultiplier;

    return pointsPerClickBoost;
}

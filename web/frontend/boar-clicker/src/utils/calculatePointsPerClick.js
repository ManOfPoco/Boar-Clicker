import { getBoosterLevelEffect } from "./getBoosterLevelEffect";

export function calculatePointsPerClick({ pointsPerClick, level, boosters }) {
    let pointsPerClickMultiplier = 1;
    let pointsPerClickBoost = 0;

    boosters.forEach((booster) => {
        if (booster.endTime > Date.now()) {
            const { type, baseEffect, uses, scalingFactor } = booster;
            const { effectScaling } = getBoosterLevelEffect({
                booster,
            });
            const usesScaling = uses > 0 ? Math.round(uses * scalingFactor) : 1;

            switch (type) {
                case "double_points":
                case "free_double_points":
                    pointsPerClickMultiplier *= Math.round(
                        baseEffect * usesScaling * effectScaling
                    );
                    break;
                default:
                    break;
            }
        }
    });

    pointsPerClickBoost = pointsPerClick * pointsPerClickMultiplier;

    return pointsPerClickBoost;
}

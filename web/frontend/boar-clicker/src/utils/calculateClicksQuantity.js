import { getBoosterLevelEffect } from "./getBoosterLevelEffect";

export function calculateClicksQuantity({ boosters }) {
    let clicks = 1;

    boosters.forEach((booster) => {
        if (booster.endTime > Date.now()) {
            const { type, baseEffect, uses, scalingFactor } = booster;
            const { effectScaling } = getBoosterLevelEffect({
                booster,
            });
            const usesScaling = uses > 0 ? Math.round(uses * scalingFactor) : 1;

            switch (type) {
                case "double_clicks":
                case "free_double_clicks":
                    clicks *= Math.round(
                        baseEffect * usesScaling * effectScaling
                    );
                    break;
                default:
                    break;
            }
        }
    });

    return clicks;
}

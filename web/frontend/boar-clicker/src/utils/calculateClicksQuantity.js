export function calculateClicksQuantity({ boosters }) {
    let clicks = 1;

    boosters.forEach((booster) => {
        if (booster.endTime > Date.now()) {
            switch (booster.type) {
                case "double_clicks":
                case "free_double_clicks":
                    clicks *=
                        booster.baseEffect *
                        booster.usesScaling *
                        booster.levelScaling;
                    break;
                default:
                    break;
            }
        }
    });

    return clicks;
}

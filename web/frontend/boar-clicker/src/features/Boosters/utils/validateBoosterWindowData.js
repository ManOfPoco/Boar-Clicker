export function validateBoosterWindowData(booster, boosterEffects) {
    const requiredBoosterFields = [
        "title",
        "description",
        "level_required",
        "currentLevel",
        "cooldown",
        "uses",
        "maxUses",
        "lastUsed",
        "icon",
        "isFreeBooster",
    ];
    const requiredFreeBoosterFields = ["subtitle", "subtitleIcon"];
    const requiredBoosterEffectsFields = [
        "currentEffectDescription",
        "nextUpgradeEffectDescription",
        "currentTime",
        "nextUpgradeTime",
    ];
    const premiumFields = [
        "upgrade",
        "nextUpgrade",
        "upgradePrice",
        "isMaxLevel",
    ];

    for (const field of requiredBoosterFields) {
        if (booster[field] === undefined) {
            return { isValid: false, missingField: field };
        }
    }

    if (!booster.isFreeBooster) {
        for (const field of premiumFields) {
            if (booster[field] === undefined) {
                return { isValid: false, missingField: field };
            }
        }
        for (const field of requiredBoosterEffectsFields) {
            if (boosterEffects[field] === undefined) {
                return { isValid: false, missingField: field };
            }
        }
    } else {
        for (const field of requiredFreeBoosterFields) {
            if (booster[field] === undefined) {
                return { isValid: false, missingField: field };
            }
        }
    }

    return { isValid: true, missingField: null };
}

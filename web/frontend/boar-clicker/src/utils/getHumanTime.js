export function getHumanTime({ seconds }) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours > 0 ? `${hours} hours` : ""}${
        minutes > 0 ? `${minutes} minutes` : ""
    }${minutes > 0 || hours > 0 ? "" : `${remainingSeconds} seconds`}`;
}

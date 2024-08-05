export function createPointsAnimation({
    event,
    pointsRef,
    pointsQuantity,
    dispatch,
}) {
    const pointsRect = pointsRef.current.getBoundingClientRect();
    const numberOfClicks = 10; // Number of simulated clicks
    const delay = 50; // Delay between each click in milliseconds

    const basePoints = Math.floor(pointsQuantity / numberOfClicks);
    const remainderPoints = pointsQuantity % numberOfClicks;

    for (let i = 0; i < numberOfClicks; i++) {
        setTimeout(() => {
            let clickPoints = basePoints;
            if (i < remainderPoints) {
                clickPoints += 1; // Distribute remainder points
            }

            let click = {
                id: Date.now() + i,
                points: clickPoints,
                x: event.pageX + (Math.random() - 0.5) * 20, // Randomize x position slightly
                y: event.pageY + (Math.random() - 0.5) * 20, // Randomize y position slightly
            };

            const translateX = pointsRect.left - click.x;
            const translateY = pointsRect.top - click.y;

            click = {
                ...click,
                translateX,
                translateY,
            };

            dispatch({
                type: "addBonusClick",
                payload: click,
            });
        }, i * delay);
    }
}

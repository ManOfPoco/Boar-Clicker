import coinIcon from "../../../assets/svg/coin.svg";

function PointsGainAnimation({ clicks, dispatch }) {
    // Increase points when magnet animation ends
    function handleMagnetAnimationEnd(id, points) {
        dispatch({
            type: "increasePoints",
            payload: { id, points: points },
        });
    }

    return (
        <>
            {clicks.map((click) => (
                <div
                    key={`${click.id}-${click.type}`}
                    className="pointer-events-none absolute overflow-hidden text-4xl font-bold text-white opacity-0"
                    style={{
                        top: `${click.y}px`,
                        left: `${click.x}px`,
                        animation: `magnet 1s ease-out`,
                        "--translate-x": `${click.translateX}px`,
                        "--translate-y": `${click.translateY}px`,
                    }}
                    onAnimationEnd={() =>
                        handleMagnetAnimationEnd(click.id, click.points)
                    }
                >
                    <div className="flex">
                        <img
                            src={coinIcon}
                            alt="Dollar Coin"
                            className="h-10 w-10"
                            draggable="false"
                        />
                        {click.points}
                    </div>
                </div>
            ))}
        </>
    );
}

export default PointsGainAnimation;

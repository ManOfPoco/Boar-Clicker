import coinIcon from "../../../assets/svg/coin.svg";

function ClickAnimations({ clicks, pointsPerClick, handleMagnetAnimationEnd }) {
    return (
        <>
            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="pointer-events-none absolute overflow-hidden text-4xl font-bold text-white opacity-0"
                    style={{
                        top: `${click.y}px`,
                        left: `${click.x}px`,
                        animation: `magnet 1s ease-out`,
                        "--translate-x": `${click.translateX}px`,
                        "--translate-y": `${click.translateY}px`,
                    }}
                    onAnimationEnd={() => handleMagnetAnimationEnd(click.id)}
                >
                    <div className="flex">
                        <img
                            src={coinIcon}
                            alt="Dollar Coin"
                            className="h-10 w-10"
                            draggable="false"
                        />
                        {pointsPerClick}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ClickAnimations;

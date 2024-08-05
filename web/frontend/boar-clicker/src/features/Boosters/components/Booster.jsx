function Booster({
    className,
    handleClick,
    icon,
    title,
    subtitle,
    subtitleIcon,
}) {
    return (
        <div
            className={`flex items-center gap-4 rounded-md px-3 py-2 ${className}`}
            onClick={(e) => handleClick(e)}
        >
            <img
                src={icon}
                alt={title}
                className="h-12 w-12"
                draggable="false"
            />

            <div className="flex flex-col gap-1 text-white">
                <h3>{title}</h3>
                <div className="flex items-center gap-1.5">
                    <img
                        src={subtitleIcon}
                        alt={subtitle}
                        className="h-5 w-5"
                        draggable="false"
                    />
                    <span className="text-sm text-white/75">{subtitle}</span>
                </div>
            </div>
        </div>
    );
}

export default Booster;

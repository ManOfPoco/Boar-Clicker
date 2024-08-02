function Booster({ img, alt, points }) {
    return (
        <div className="flex w-full flex-col items-center gap-1 border border-primary px-2 py-3">
            <img
                src={img}
                alt={alt}
                className="aspect-square h-20 w-20"
                draggable="false"
            />
            <p className="text-xl text-white">+{points}</p>
        </div>
    );
}

export default Booster;

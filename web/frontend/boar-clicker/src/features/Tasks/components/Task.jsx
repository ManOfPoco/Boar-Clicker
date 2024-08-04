import Button from "../../../components/Button";

function Task({ task }) {
    const { title, reward, img } = task;
    return (
        <div className="task flex w-full h-full items-center justify-between gap-5 py-5 text-white">
            <div className="flex gap-5 h-full items-center">
                <img src={img} alt={title} className="h-10 w-10" />
                <div className="flex h-full flex-col justify-between gap-1">
                    <span className="text-base font-bold leading-4">
                        {title}
                    </span>
                    <span className="text-sm leading-4">+ {reward} coins</span>
                </div>
            </div>

            <Button className="h-10 rounded-full bg-white/15 px-4 py-2 text-base text-white">
                Start
            </Button>
        </div>
    );
}

export default Task;

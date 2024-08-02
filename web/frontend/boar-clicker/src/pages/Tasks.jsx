import { useRef, useState } from "react";

import useGameContext from "../hooks/useGameContext";
import useConvertSystem from "../hooks/useConvertSystem";

import taskPointingArrow from "../assets/svg/task-pointing-arrow.svg";
import coinIcon from "../assets/svg/coin.svg";
import TasksList from "../features/Tasks/components/TasksList";

function Tasks() {
    const { state } = useGameContext();
    const { points } = state;
    const { convertToViewSystem } = useConvertSystem();

    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);

    const pointsRef = useRef(null);

    return (
        <div className="relative flex justify-center overflow-hidden bg-rich-black">
            <div className="relative flex h-dvh w-full max-w-xl flex-col bg-dark-grey font-bold">
                <div className="mt-10">
                    <div className="mt-4 flex justify-center">
                        <div
                            className="flex flex-col items-center gap-5 py-2"
                            ref={pointsRef}
                        >
                            <span className="text-4xl text-primary">
                                {convertToViewSystem(points)}
                            </span>

                            <img
                                src={coinIcon}
                                alt="Dollar Coin"
                                className="h-20 w-20"
                                draggable="false"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={`absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center text-2xl font-normal text-white ${isTaskMenuOpen ? "animate-fade-out opacity-0" : "animate-fade-in opacity-100"}`}
                >
                    <h2 className="max-w-xs text-center">
                        Выполните доступные задания чтобы получить очки
                    </h2>
                </div>

                <div
                    className={`absolute right-1/4 top-[calc(50%+180px)] -translate-y-1/2 ${isTaskMenuOpen ? "animate-fade-out opacity-0" : "animate-fade-in opacity-100"}`}
                >
                    <img
                        src={taskPointingArrow}
                        alt="Pointing Arrow"
                        className="h-48 w-14"
                    />
                </div>

                <TasksList
                    isTaskMenuOpen={isTaskMenuOpen}
                    setIsTaskMenuOpen={setIsTaskMenuOpen}
                />
            </div>
        </div>
    );
}

export default Tasks;

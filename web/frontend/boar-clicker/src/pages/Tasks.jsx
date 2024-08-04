import { useRef, useState, useEffect } from "react";

import TasksList from "../features/Tasks/components/TasksList";
import NavigationMenu from "../layouts/NavigationMenu";

import useGameContext from "../hooks/useGameContext";
import useConvertSystem from "../hooks/useConvertSystem";

import taskPointingArrow from "../assets/svg/task-pointing-arrow.svg";
import coinIcon from "../assets/svg/coin.svg";
import TasksWrapper from "../features/Tasks/components/TasksWrapper";

function Tasks() {
    const { state } = useGameContext();
    const { points } = state;
    const { convertToViewSystem } = useConvertSystem();

    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);

    const pointsRef = useRef(null);
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        isFirstRenderRef.current = false;
    }, []);

    return (
        <div className="relative flex justify-center overflow-hidden bg-rich-black">
            <div className="relative flex h-dvh w-full max-w-xl flex-col bg-dark-grey font-bold">
                <NavigationMenu />

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
                    className={`absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-end text-2xl font-normal text-white ${
                        isFirstRenderRef.current
                            ? ""
                            : isTaskMenuOpen
                              ? "animate-fade-out opacity-0"
                              : "animate-fade-in opacity-100"
                    }`}
                >
                    <h2 className="max-w-xs text-center">
                        Выполните доступные задания чтобы получить очки
                    </h2>
                </div>

                <div
                    className={`absolute right-1/4 top-[calc(50%+130px)] -translate-y-1/2 xs:top-[calc(50%+180px)] ${
                        isFirstRenderRef.current
                            ? ""
                            : isTaskMenuOpen
                              ? "animate-fade-out opacity-0"
                              : "animate-fade-in opacity-100"
                    }`}
                >
                    <img
                        src={taskPointingArrow}
                        alt="Pointing Arrow"
                        className="h-32 w-14 xs:h-48"
                    />
                </div>

                <TasksWrapper
                    isTaskMenuOpen={isTaskMenuOpen}
                    setIsTaskMenuOpen={setIsTaskMenuOpen}
                    ref={isFirstRenderRef}
                >
                    <TasksList />
                </TasksWrapper>
            </div>
        </div>
    );
}

export default Tasks;

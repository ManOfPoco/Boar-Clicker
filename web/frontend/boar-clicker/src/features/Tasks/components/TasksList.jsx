import Button from "../../../components/Button";
import Task from "./Task";

function TasksList({ isTaskMenuOpen, setIsTaskMenuOpen }) {
    return (
        <div
            className={`absolute mx-3 flex w-[calc(100%-24px)] rounded-xl border-2 border-primary transition-transform duration-500 ${
                isTaskMenuOpen
                    ? "animate-slideIn top-1/2 translate-y-1/2"
                    : "animate-slideOut -bottom-80"
            }`}
        >
            <Button
                className="absolute -top-20 left-1/2 size-28 -translate-x-1/2 rounded-full bg-white"
                onClick={() =>
                    setIsTaskMenuOpen((isTaskMenuOpen) => !isTaskMenuOpen)
                }
            />
            <div className="shadow-glow flex h-96 w-full flex-col gap-5 overflow-hidden rounded-xl px-2 py-3">
                <Task
                    title="Task 1"
                    description="Description 1"
                    status="Status 1"
                />
                <Task
                    title="Task 2"
                    description="Description 2"
                    status="Status 2"
                />
                <Task
                    title="Task 3"
                    description="Description 3"
                    status="Status 3"
                />
            </div>
        </div>
    );
}

export default TasksList;

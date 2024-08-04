import { forwardRef, useRef, useEffect } from "react";
import Button from "../../../components/Button";

const TasksWrapper = forwardRef(function TasksWrapper(
    { isTaskMenuOpen, setIsTaskMenuOpen, children },
    ref
) {
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsTaskMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsTaskMenuOpen]);

    return (
        <>
            <div
                className={`fixed inset-0 transition-all duration-500 ${
                    isTaskMenuOpen ? "z-40 bg-black/50" : "bg-none"
                }`}
            ></div>
            <div
                ref={containerRef}
                className={`absolute z-50 mx-3 flex h-3/4 w-[calc(100%-24px)] rounded-xl border-2 border-primary bg-dark-grey transition-transform duration-500 ${
                    ref.current
                        ? "-bottom-tasks"
                        : isTaskMenuOpen
                          ? "top-1/2 translate-y-1/2 animate-slideIn"
                          : "-bottom-tasks animate-slideOut"
                }`}
            >
                <Button
                    className="absolute -top-16 left-1/2 size-24 -translate-x-1/2 rounded-full bg-white"
                    onClick={() =>
                        setIsTaskMenuOpen((isTaskMenuOpen) => !isTaskMenuOpen)
                    }
                />

                {children}
            </div>
        </>
    );
});

export default TasksWrapper;

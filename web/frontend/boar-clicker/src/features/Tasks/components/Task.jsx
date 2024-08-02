import Button from "../../../components/Button";

function Task({ title, description, status }) {
    return (
        <div className="task flex w-full justify-between px-2 py-1 gap-5 border border-primary text-white rounded-md">
            <div className="flex flex-col gap-1">
                <span className="text-base font-bold leading-4">{title}</span>
                <span className="text-sm leading-4">{description}</span>
            </div>

            <Button className="text-white h-full px-2 bg-primary rounded-md">{status}</Button>
        </div>
    );
}

export default Task;

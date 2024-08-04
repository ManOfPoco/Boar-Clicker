import Task from "./Task";

import youtube from "../../../assets/svg/youtube.svg";
import telegram from "../../../assets/svg/telegram.svg";

const tasks = [
    {
        title: "Subscribe to our channelSubscribe to our channel",
        reward: 250,
        img: youtube,
    },
    {
        title: "Join our Telegram group",
        reward: 500,
        img: telegram,
    },
    {
        title: "Watch our latest video",
        reward: 300,
        img: youtube,
    },
    {
        title: "Subscribe to our channel",
        reward: 250,
        img: youtube,
    },
    {
        title: "Join our Telegram group",
        reward: 500,
        img: telegram,
    },
    {
        title: "Watch our latest video",
        reward: 300,
        img: youtube,
    },
    {
        title: "Subscribe to our channel",
        reward: 250,
        img: youtube,
    },
    {
        title: "Join our Telegram group",
        reward: 500,
        img: telegram,
    },
    {
        title: "Watch our latest video",
        reward: 300,
        img: youtube,
    },
];

function TasksList() {
    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl px-4 py-5 text-white shadow-glow">
            <h3 className="flex gap-1 text-3xl">
                Tasks <span className="text-lg">{tasks.length}</span>
            </h3>
            <span className="mb-5 mt-3 text-sm text-white/70">
                We’ll reward you immediately with coins after each task
                completion.
            </span>
            <div className="flex flex-col divide-y divide-white/20 h-full overflow-auto">
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
        </div>
    );
}

export default TasksList;

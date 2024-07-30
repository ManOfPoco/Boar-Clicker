import { useReducer } from "react";

import coin from "../assets/svg/coin.svg";
import mainCharacter from "../assets/svg/main-character.svg";
import { useNavigate } from "react-router-dom";

const initialState = {
    points: 500,
    pointsPerClick: 1,
    clicks: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "addPoints":
            return {
                ...state,
                points: state.points + state.pointsPerClick,
                clicks: [
                    ...state.clicks,
                    {
                        id: action.payload.id,
                        x: action.payload.x,
                        y: action.payload.y,
                    },
                ],
            };
        case "removeClick":
            return {
                ...state,
                clicks: state.clicks.filter(
                    (click) => click.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
}

function Home() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { points, pointsPerClick, clicks } = state;

    function handleCardClick(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        setTimeout(() => {
            card.style.transform = "";
        }, 100);

        dispatch({
            type: "addPoints",
            payload: { id: Date.now(), x: e.pageX, y: e.pageY },
        });
    }

    function handleAnimationEnd(id) {
        dispatch({ type: "removeClick", payload: { id } });
    }

    return (
        <div className="flex justify-center bg-black">
            <div className="flex h-screen w-full max-w-xl flex-col bg-black font-bold text-white">
                <div className="top-glow relative z-0 mt-4 flex-grow rounded-t-[48px] bg-[#f3ba2f]">
                    <div className="flex h-full flex-col items-center justify-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-[2px] before:-z-10 before:rounded-t-[46px] before:bg-[#1d2025]">
                        <div
                            className="absolute top-10 rounded-lg bg-gray-700 px-10 py-5"
                            onClick={() => navigate("/page")}
                        >
                            Boar Jump
                        </div>
                        <div className="mt-4 flex justify-center px-4">
                            <div className="flex items-center space-x-2 px-4 py-2">
                                <img
                                    src={coin}
                                    alt="Dollar Coin"
                                    className="h-10 w-10"
                                    draggable="false"
                                />
                                <p className="text-4xl text-white">{points}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex select-none justify-center px-4">
                            <div
                                className="circle-outer h-80 w-80 rounded-full p-4"
                                onClick={(e) => handleCardClick(e)}
                            >
                                <div className="circle-inner h-full w-full rounded-full">
                                    <img
                                        src={mainCharacter}
                                        alt="Main Character"
                                        className="h-full w-full"
                                        draggable="false"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="pointer-events-none absolute animate-float text-5xl font-bold text-white opacity-0"
                    style={{
                        top: `${click.y - 42}px`,
                        left: `${click.x}px`,
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                    + {pointsPerClick}
                </div>
            ))}
        </div>
    );
}

export default Home;

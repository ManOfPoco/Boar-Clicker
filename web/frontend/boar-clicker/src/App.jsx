import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GameProvider } from "./context/GameContext.jsx";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home.jsx";
import BoarJump from "./pages/BoarJump.jsx";
import Tasks from "./pages/Tasks.jsx";
import Referral from "./pages/Referral.jsx";
import Upgrades from "./pages/Upgrades.jsx";
import Boosters from "./pages/Boosters.jsx";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/upgrades",
                element: <Upgrades />,
            },
            {
                path: "/boosters",
                element: <Boosters />,
            },
            {
                path: "/tasks",
                element: <Tasks />,
            },
            {
                path: "/referral",
                element: <Referral />,
            },
            {
                path: "/boar-jump",
                element: <BoarJump />,
            },
        ],
    },
]);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GameProvider>
                <RouterProvider router={router} />
            </GameProvider>
        </QueryClientProvider>
    );
}

export default App;

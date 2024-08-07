import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <>
            <Toaster />
            <Outlet />
        </>
    );
}

export default AppLayout;

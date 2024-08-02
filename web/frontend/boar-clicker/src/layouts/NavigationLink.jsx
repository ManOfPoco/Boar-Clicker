import { NavLink } from "react-router-dom";

function NavigationLink({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                ` ${isActive ? "bg-primary text-white" : "bg-black text-white"} flex h-16 w-16 flex-none items-center justify-center rounded-xl border-2 border-primary text-lg xs:text-xl font-bold xs:h-20 xs:w-20`
            }
        >
            {children}
        </NavLink>
    );
}

export default NavigationLink;

import NavigationLink from "./NavigationLink";

function NavigationMenu() {
    return (
        <div className="absolute top-2/5 z-50 flex h-6/10 -translate-y-2/5 flex-col justify-evenly gap-3 xs:gap-5 overflow-y-auto rounded-r-xl border-b border-r border-t border-primary bg-navigation-background p-2 xs:p-3">
            <NavigationLink to="/ref">REF</NavigationLink>
            <NavigationLink to="/tasks">TASKS</NavigationLink>
            <NavigationLink to="/boar-jump">JUMP</NavigationLink>
            <NavigationLink to="/home">TAP</NavigationLink>
        </div>
    );
}

export default NavigationMenu;

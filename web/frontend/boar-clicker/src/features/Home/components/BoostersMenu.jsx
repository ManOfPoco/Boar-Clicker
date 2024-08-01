import Booster from "./Booster";

import coinIcon from "../../../assets/svg/coin.svg";

function BoostersMenu() {
    return (
        <div className="absolute bottom-0 flex w-full items-stretch justify-stretch">
            <Booster img={coinIcon} alt="Dollar Coin" points={100} />
            <Booster img={coinIcon} alt="Dollar Coin" points={100} />
            <Booster img={coinIcon} alt="Dollar Coin" points={100} />
            <Booster img={coinIcon} alt="Dollar Coin" points={100} />
        </div>
    );
}

export default BoostersMenu;

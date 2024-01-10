import { Link } from "react-router-dom";
import { ModeToggle } from "./components/ModeToggle";
import { UserNav } from "./components/UserNav";
import logo from "@/assets/svg/logo.svg";
import { QrCodeToggle } from "./components/QrCodeToggle";

export const DashboardNavbar = () => {
    return (
        <div className="h-full flex-col md:flex">
            <div className="container flex flex-row items-start justify-between space-y-2 py-4 sm:items-center sm:space-y-0 md:h-16">
                <Link to="/welcome" className="flex flex-row justify-between items-center">
                    <img src={logo} className="w-11 h-11" alt="logo" />
                    <h1 className="scroll-m-20 text-2xl font-black tracking-tight px-2">Serenity</h1>
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                    <QrCodeToggle />
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

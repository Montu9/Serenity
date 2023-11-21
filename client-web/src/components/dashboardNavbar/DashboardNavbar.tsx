import { Link } from "react-router-dom";
import { ModeToggle } from "./components/ModeToggle";
import { UserNav } from "./components/UserNav";
import logo from "@/assets/svg/logo.svg";

export const DashboardNavbar = () => {
    return (
        <div className="h-full flex-col md:flex">
            <div className="container flex flex-row items-start justify-between space-y-2 py-4  sm:items-center sm:space-y-0 md:h-16">
                <Link to="/welcome">
                    <img src={logo} className="w-12 h-12" alt="logo" />
                </Link>
                <h2 className="text-lg font-semibold">Serenity</h2>
                <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

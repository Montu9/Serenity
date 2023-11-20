import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "@/assets/svg/logo.svg";
import { UserNav } from "./components/UserNav";
import { Separator } from "../ui/separator";
import { selectCurrentAccessToken } from "@/app/api/features/auth/authSlice";

const RequireAuth = () => {
    const accessToken = useSelector(selectCurrentAccessToken);
    const location = useLocation();
    return accessToken ? (
        <>
            <div className="h-full flex-col md:flex">
                <div className="container flex flex-row items-start justify-between space-y-2 py-4  sm:items-center sm:space-y-0 md:h-16">
                    <img src={logo} className="w-12 h-12" alt="logo" />
                    <h2 className="text-lg font-semibold">Serenity</h2>
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav />
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Outlet />
            </div>
        </>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;

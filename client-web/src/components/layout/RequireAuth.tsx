import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { selectCurrentAccessToken } from "@/app/api/features/auth/authSlice";
import { DashboardNavbar } from "../dashboardNavbar/DashboardNavbar";

const RequireAuth = () => {
    const accessToken = useSelector(selectCurrentAccessToken);
    const location = useLocation();
    return accessToken ? (
        <>
            <DashboardNavbar />
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

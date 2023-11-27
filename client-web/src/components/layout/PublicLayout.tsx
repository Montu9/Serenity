import { selectCurrentAccessToken } from "@/app/api/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicLayout = () => {
    const accessToken = useSelector(selectCurrentAccessToken);
    const location = useLocation();

    return accessToken ? <Navigate to="/welcome" state={{ from: location }} replace /> : <Outlet />;
};

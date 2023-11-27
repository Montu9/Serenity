import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

export const Layout = () => {
    return (
        <>
            <Toaster />
            <Outlet />
        </>
    );
};

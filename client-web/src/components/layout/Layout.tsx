import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const Layout = () => {
    return (
        <>
            <Toaster />
            <Outlet />
        </>
    );
};

export default Layout;

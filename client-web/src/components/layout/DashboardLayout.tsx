import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../dashboardSidebar/DashboardSidebar";

export const DashboardLayout = () => {
    return (
        <div className="grid lg:grid-cols-5">
            <DashboardSidebar />
            <div className="col-span-4 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

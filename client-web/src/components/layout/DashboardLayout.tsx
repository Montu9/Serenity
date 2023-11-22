import { DashboardSidebar } from "../dashboardSidebar/DashboardSidebar";

export const DashboardLayout = () => {
    return (
        <div className="grid lg:grid-cols-5">
            <DashboardSidebar />
            <div className="col-span-4 lg:col-span-4 lg:border-l">asd</div>
        </div>
    );
};

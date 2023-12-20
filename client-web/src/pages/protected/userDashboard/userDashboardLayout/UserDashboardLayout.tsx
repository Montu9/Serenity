import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";
import { SidebarNavPanel } from "./components/SidebarNavPanel";

export const UserDashboardLayout = () => {
    const sidebarNavItems = [
        {
            title: "Kennels",
            href: "",
        },
        {
            title: "All dogs",
            href: "dogs",
        },
    ];

    return (
        <div className="spacey-y-1 lg:space-y-6 p-10 pb-16">
            <div className="hidden lg:block space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account settings.</p>
            </div>
            <Separator className="hidden lg:block lg:my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNavPanel items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";
import { SidebarNavPanel } from "../panelSidebar/PanelSidebar";

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
        <div className="space-y-6 pt-10 md:p-10 md:pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Caretaker Panel</h2>
                <p className="text-muted-foreground hidden lg:block">
                    In the "Caretaker Panel" tab, caretakers can effortlessly access a detailed overview of dogs and
                    kennels under their care. Execute essential actions such as walking, medicating, cleaning, and
                    feeding directly from this tab. Your dedication to these tasks significantly contributes to the
                    well-being of our canine residents. Thank you for your invaluable contributions!
                </p>
            </div>
            <Separator className="my-6 hidden lg:block" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className=" lg:w-1/5">
                    <SidebarNavPanel items={sidebarNavItems} />
                </aside>
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/SidebarNav";
import { Outlet } from "react-router-dom";
export const UserSettings = () => {
    const sidebarNavItems = [
        {
            title: "Profile",
            href: "",
        },
        {
            title: "Security",
            href: "security",
        },
    ];

    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground hidden lg:block">
                    In the Settings tab, you'll have full control over your account details and security preferences.
                    Here, you can personalize your basic information, including your name, contact details, and more.
                    Additionally, you have the option to update your password for added account security. Explore the
                    various sections within Settings to tailor your experience and ensure your account remains
                    up-to-date and secure.
                </p>
            </div>
            <Separator className="my-6 hidden lg:block" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

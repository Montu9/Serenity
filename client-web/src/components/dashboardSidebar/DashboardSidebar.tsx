import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import { SidebarData } from "./sidebarData";
import { Link, useMatch } from "react-router-dom";

export const DashboardSidebar = () => {
    const match = useMatch("/dashboard/:id/:lastPart");
    const pathnameLastPart = match?.params.lastPart || "";

    const content = (
        <div>
            <div className="px-3 py-2">
                {SidebarData.map((sidebarSection) => (
                    <div key={sidebarSection.title}>
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{sidebarSection.title}</h2>
                        <div className="space-y-1">
                            {sidebarSection.content.map((content) => (
                                <Link key={content.subTitle} to={content.href}>
                                    <Button
                                        variant={pathnameLastPart === content.href ? "secondary" : "ghost"}
                                        className="w-full justify-start gap-2 font-normal">
                                        {content.icon}
                                        {content.subTitle}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={cn("lg:pb-12")}>
            <div className="space-y-4 py-4">
                <div className="lg:hidden block">
                    <Sheet defaultOpen={false}>
                        <SheetTrigger>
                            <IoMenu /> Menu
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account and remove
                                    your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                            {content}
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden lg:block">{content}</div>
            </div>
        </div>
    );
};

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import { SidebarData } from "./sidebarData";
import { Link, useMatch } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export const DashboardSidebar = () => {
    const match = useMatch("/dashboard/:id/:lastPart");
    const pathnameLastPart = match?.params.lastPart || "";

    const content = (
        <ScrollArea className="h-full box-border self-stretch">
            {SidebarData.map((sidebarSection) => (
                <div key={sidebarSection.title} className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{sidebarSection.title}</h2>
                    <div className="space-y-1">
                        {sidebarSection.content.map((content) => (
                            <Button
                                key={content.subTitle}
                                variant={pathnameLastPart === content.href ? "secondary" : "ghost"}
                                className="w-full justify-start gap-2 font-normal"
                                asChild>
                                <Link to={content.href}>
                                    {content.icon}
                                    {content.subTitle}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </ScrollArea>
    );

    return (
        <div className={cn("lg:pb-12")}>
            <div className="space-y-4 py-4">
                <div className="lg:hidden block">
                    <Sheet defaultOpen={false}>
                        <SheetTrigger>
                            <IoMenu /> Menu
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
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
                <div className="hidden lg:block flex flex-col">{content}</div>
            </div>
        </div>
    );
};

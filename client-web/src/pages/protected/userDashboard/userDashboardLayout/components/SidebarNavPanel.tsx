import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

interface SidebarNavPanelProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string;
        href: string;
    }[];
}
export const SidebarNavPanel = ({ className, items, ...props }: SidebarNavPanelProps) => {
    const match = useMatch("/panel/:id/:lastPart");
    const pathnameLastPart = match?.params.lastPart || "";

    return (
        <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
            {items.map((item) => (
                <Link
                    key={item.title}
                    to={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathnameLastPart === item.href
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}>
                    {item.title}
                </Link>
            ))}
        </nav>
    );
};

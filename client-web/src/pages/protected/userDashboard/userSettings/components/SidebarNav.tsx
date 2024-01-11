import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string;
        href: string;
    }[];
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
    const match = useMatch("/settings/:lastPart");
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

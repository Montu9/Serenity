import { useLazyLogoutQuery } from "@/app/api/features/auth/authApiSlice";
import { logOut, selectCurrentUser } from "@/app/api/features/auth/authSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserNav = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const initials = user?.firstName?.charAt(0).toUpperCase() + user?.lastName?.charAt(0).toUpperCase();
    const [logout] = useLazyLogoutQuery();
    const logOutUser = async () => {
        await logout();
        dispatch(logOut());
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        {/*<AvatarImage src="/avatars/01.png" alt="@shadcn" />*/}
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Hi, {user.firstName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to="/settings" className="w-full justify-start gap-2 font-normal">
                            Profile Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/welcome" className="w-full justify-start gap-2 font-normal">
                            My shelters
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOutUser}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

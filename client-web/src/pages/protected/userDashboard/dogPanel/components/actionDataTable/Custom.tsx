import { selectCurrentUser } from "@/app/api/features/auth/authSlice";
import User from "@/app/api/features/user/entities/User";
import { useSelector } from "react-redux";
import { DataTableRowActions } from "./rowActions";

export const Custom = ({ row }) => {
    const rowUser = row.getValue("user") as User;
    const user = useSelector(selectCurrentUser);
    return rowUser.uuid === user.uuid ? <DataTableRowActions row={row} /> : "";
};

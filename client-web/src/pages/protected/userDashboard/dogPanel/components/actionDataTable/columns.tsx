import Dog from "@/app/api/features/dog/entities/Dog";
import User from "@/app/api/features/user/entities/User";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DogAction } from "./actionSchema";
import { DataTableColumnHeader } from "./columnHeader";
import { DataTableRowActions } from "./rowActions";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/api/features/auth/authSlice";
import { Custom } from "./Custom";

export const columns: ColumnDef<DogAction>[] = [
    {
        id: "actions",
        cell: ({ row }) => <Custom row={row} />,
    },
    {
        accessorKey: "user",
        header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {(row.getValue("user") as User).lastName}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "dog",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dog Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{(row.getValue("dog") as Dog).name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {format(new Date(row.getValue("date")), "PPP")}
                    </span>
                </div>
            );
        },
    },
];

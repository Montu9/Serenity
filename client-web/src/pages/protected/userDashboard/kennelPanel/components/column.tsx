import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./columnHeader";
import { Dog } from "./dogSchema";
import { Breed } from "@/app/api/features/common/breed/breedApiSlice";
import { formatDistanceToNowStrict } from "date-fns/esm";
import { DataTableRowActions } from "./rowActions";

export const columns: ColumnDef<Dog>[] = [
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("name")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "dateOfBirth",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Age" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {formatDistanceToNowStrict(new Date(row.getValue("dateOfBirth")))} old
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "microchip",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Microchip" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("microchip")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "gender",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("gender")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "dogCondition",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dog Condition" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("dogCondition")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "breed",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Breed" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{(row.getValue("breed") as Breed).name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "dogStatus",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dog status" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("dogStatus")}</span>
                </div>
            );
        },
    },
];

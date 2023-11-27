import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./columnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./rowActions";
import { Dog } from "./dogSchema";
import { Breed } from "@/app/api/features/common/breed/breedApiSlice";
import Kennel from "@/app/api/features/kennel/entities/Kennel";
import { format, formatDistanceToNowStrict } from "date-fns/esm";

export const columns: ColumnDef<Dog>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
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
        accessorKey: "intakeDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Intake Date" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {format(new Date(row.getValue("intakeDate")), "PPP")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "uuid",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dog ID" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("uuid")}</span>
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
        accessorKey: "kennel",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kennel" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{(row.getValue("kennel") as Kennel).no}</span>
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
    {
        accessorKey: "intake",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Intake" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("intake")}</span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];

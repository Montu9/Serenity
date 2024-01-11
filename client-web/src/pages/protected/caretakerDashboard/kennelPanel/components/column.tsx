import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./columnHeader";
import { Dog } from "./dogSchema";
import { Breed } from "@/app/api/features/common/breed/breedApiSlice";
import { formatDistanceToNowStrict } from "date-fns/esm";
import { DataTableRowActions } from "./rowActions";
import { MdMale, MdFemale } from "react-icons/md";

export const columns: ColumnDef<Dog>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex max-w-[50px]">
                    <DataTableRowActions row={row} />
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            const gender = row.original.gender;
            let icon: React.ReactNode | string = "";
            if (gender && gender.toUpperCase() === "MALE") {
                icon = <MdMale />;
            } else if (gender && gender.toUpperCase() === "FEMALE") {
                icon = <MdFemale />;
            }
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate text-xs md:text-base font-medium flex items-center">
                        {row.getValue("name")}
                        {icon}
                    </span>
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
                    <span className="max-w-[500px] truncate text-xs md:text-base font-medium">
                        {formatDistanceToNowStrict(new Date(row.getValue("dateOfBirth")))}
                    </span>
                </div>
            );
        },
    },
    // {
    //     accessorKey: "microchip",
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Microchip" />,
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-2">
    //                 <span className="max-w-[500px] truncate font-medium">{row.getValue("microchip")}</span>
    //             </div>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "gender",
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-2">
    //                 <span className="max-w-[500px] truncate text-xs md:text-base font-medium">
    //                     {row.getValue("gender")}
    //                 </span>
    //             </div>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "dogCondition",
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Dog Condition" />,
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-2">
    //                 <span className="max-w-[500px] truncate font-medium">{row.getValue("dogCondition")}</span>
    //             </div>
    //         );
    //     },
    // },
    {
        accessorKey: "breed",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Breed" />,
        cell: ({ row }) => {
            const inputString = (row.getValue("breed") as Breed).name;
            const resultString = inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate text-xs font-medium">{resultString}</span>
                </div>
            );
        },
    },
    // {
    //     accessorKey: "dogStatus",
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Dog status" />,
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-2">
    //                 <span className="max-w-[500px] truncate font-medium">{row.getValue("dogStatus")}</span>
    //             </div>
    //         );
    //     },
    // },
];

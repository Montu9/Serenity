import { Button } from "@/components/ui/button";

import { Row } from "@tanstack/react-table";

import { Link, useParams } from "react-router-dom";
import { Dog } from "./dogSchema";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const { shelterUuid } = useParams();
    const dog = row.original as Dog;
    return (
        <Link to={`/panel/${shelterUuid}/dog/${dog.uuid}`}>
            <Button className="w-full flex justify-between align-center text-xs ">
                <DoubleArrowRightIcon className="h-4" />
            </Button>
        </Link>
    );
}

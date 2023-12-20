import { Button } from "@/components/ui/button";

import { Row } from "@tanstack/react-table";

import { Link } from "react-router-dom";
import { Dog } from "./dogSchema";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const dog = row.original as Dog;
    return (
        <Button variant="secondary" asChild>
            <Link to={`dog/${dog.uuid}`}>Action {dog.name}</Link>
        </Button>
    );
}

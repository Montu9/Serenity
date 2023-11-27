import { useGetAllCaretakersQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { Separator } from "@/components/ui/separator";
import { useMatch } from "react-router-dom";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";

export const Caretakers = () => {
    const match = useMatch("/dashboard/:shelterUuid/:lastPart");
    const shelterUuid = match?.params.shelterUuid || "";
    const { data, isLoading, isSuccess } = useGetAllCaretakersQuery({ shelterUuid });

    let content;
    if (isLoading) {
        content = "Loading";
    } else if (isSuccess) {
        content = <DataTable data={data} columns={columns} />;
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Caretakers list</h2>
                    <p className="text-sm text-muted-foreground">
                        Praesent ut tincidunt justo. Proin ut purus diam. Sed fringilla odio nec gravida finibus.
                        Aliquam blandit, augue vulputate aliquam scelerisque, est lorem volutpat nisi, a facilisis quam
                        nisi et lectus. Donec in felis sed nisl congue ultrices eget at augue.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{content}</div>
        </>
    );
};

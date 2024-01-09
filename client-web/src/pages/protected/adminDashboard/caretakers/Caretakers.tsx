import { useGetAllCaretakersQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { Separator } from "@/components/ui/separator";
import { useMatch } from "react-router-dom";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { InputSkeleton, LoadingError, NothingHere } from "@/components";

export const Caretakers = () => {
    const match = useMatch("/dashboard/:shelterUuid/:lastPart");
    const shelterUuid = match?.params.shelterUuid || "";
    const { data, isLoading, isSuccess, isError } = useGetAllCaretakersQuery({ shelterUuid });

    let content = <InputSkeleton />;
    if (isLoading) {
        content = <InputSkeleton />;
    } else if (isSuccess) {
        content = data ? <DataTable data={data} columns={columns} /> : <NothingHere />;
    } else if (isError) {
        content = <LoadingError />;
    }

    return (
        <div>
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
            <div>{content}</div>
        </div>
    );
};

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
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Caretaker list</h2>
                    <p className="text-sm text-muted-foreground text-justify">
                        Explore the "Caretaker List" to see all contributors to your shelter. As an admin, you can
                        seamlessly manage caretaker details. Remove caretakers, adjust roles, or copy emails for
                        effective communication. Your dedication ensures a nurturing environment for all our dogs!
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{content}</div>
        </>
    );
};

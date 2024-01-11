import { useGetAllDogsQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { Separator } from "@/components/ui/separator";
import { useMatch } from "react-router-dom";
import { DogDataTable } from "./components/DogDataTable";
import { columns } from "./components/columns";
import { CardSkeleton, LoadingError, NothingHere } from "@/components";

export const Dogs = () => {
    const match = useMatch("/dashboard/:shelterUuid/:lastPart");
    const shelterUuid = match?.params.shelterUuid || "";
    const { data, isLoading, isSuccess, isError } = useGetAllDogsQuery({ shelterUuid });

    let content = <CardSkeleton />;
    if (isLoading) {
        content = <CardSkeleton />;
    } else if (isSuccess) {
        content = data ? <DogDataTable data={data} columns={columns} /> : <NothingHere />;
    } else if (isError) {
        content = <LoadingError />;
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Dog list</h2>
                    <p className="text-sm text-muted-foreground text-justify">
                        Explore the "Dog List" to view all dogs currently in the shelter. As an admin, you can
                        efficiently manage canine details. Remove dogs, update specific information, or copy unique
                        identifiers for seamless record-keeping. Your commitment ensures a well-maintained and caring
                        environment for our furry companions!
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{content}</div>
        </>
    );
};

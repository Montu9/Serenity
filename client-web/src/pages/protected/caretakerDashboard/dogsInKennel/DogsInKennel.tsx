import { useGetAllDogsInKennelQuery } from "@/app/api/features/kennel/kennelApiSlice";
import { InputSkeleton, LoadingError, NothingHere } from "@/components";
import { DogDataTable } from "../../adminDashboard/dogs/components/DogDataTable";
import { columns } from "../kennelPanel/components/column";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export const DogsInKennel = () => {
    const { kennelUuid } = useParams();

    const {
        data: dogData,
        isLoading: isLoadingDogData,
        isSuccess: isSuccessDogData,
        isError: isErrorDogData,
    } = useGetAllDogsInKennelQuery({ kennelUuid: kennelUuid || "" });

    let dogContent = <InputSkeleton />;
    if (isLoadingDogData) {
        dogContent = <InputSkeleton />;
    } else if (isSuccessDogData) {
        dogContent = dogData ? <DogDataTable data={dogData} columns={columns} /> : <NothingHere />;
    } else if (isErrorDogData) {
        dogContent = <LoadingError />;
    }
    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium">List of dogs</h2>
                    <p className="text-sm text-muted-foreground text-justify">
                        Within the "Dog List" section, caretakers can present a table containing information about all
                        dogs in the shelter. This functionality provides a comprehensive view, facilitating efficient
                        management and care coordination. Your meticulous attention to this dog list significantly
                        contributes to the well-being of our canine residents.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{dogContent}</div>
        </>
    );
};

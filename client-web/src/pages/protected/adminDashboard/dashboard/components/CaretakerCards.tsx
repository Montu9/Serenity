import { useGetAllCaretakersQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { InputSkeleton, LoadingError, NothingHere } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

export const CaretakerCards = () => {
    const { shelterUuid } = useParams();

    const { data, isLoading, isSuccess, isError } = useGetAllCaretakersQuery({ shelterUuid: shelterUuid || "" });

    let content = <InputSkeleton />;
    if (isLoading) {
        content = <InputSkeleton />;
    } else if (isSuccess) {
        content = data ? (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>No. of caretakers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col justify-center items-center">
                        <BsPersonFill size={64} />
                        <h1 className="font-bold text-6xl">{data?.length ? data.length : 0}</h1>
                    </div>
                </CardContent>
            </Card>
        ) : (
            <NothingHere />
        );
    } else if (isError) {
        content = <LoadingError />;
    }

    return content;
};

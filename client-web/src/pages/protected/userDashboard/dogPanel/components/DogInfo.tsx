import { useGetDogQuery } from "@/app/api/features/dog/dogApiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

export const DogInfo = () => {
    const { dogUuid } = useParams();
    const { data, isLoading, isSuccess } = useGetDogQuery({ dogUuid: dogUuid || "" });

    let content;
    if (isLoading) {
        content = "Loading .. ";
    } else if (isSuccess && data) {
        content = (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{data.name}</CardTitle>
                        <CardDescription>Add a new payment method to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <p>{data.breed.name}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return content;
};

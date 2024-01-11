import { useGetDogQuery } from "@/app/api/features/dog/dogApiSlice";
import dogImg from "@/assets/images/dogsImg.png";
import { CardSkeleton } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns/esm";
import { useParams } from "react-router-dom";

export const DogInfo = () => {
    const { dogUuid } = useParams();
    const { data, isLoading, isSuccess } = useGetDogQuery({ dogUuid: dogUuid || "" });

    let content;
    if (isLoading) {
        content = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>
        );
    } else if (isSuccess && data) {
        content = (
            <div>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <img className="h-28 w-28 rounded-xl" src={dogImg} alt="Dog image" />
                            <div>
                                <CardTitle className="text-4xl">{data.name}</CardTitle>
                                <div className="flex flex-col gap-1 text-xs">
                                    <h3>Added: {format(new Date(data.createdAt), "PPP")}</h3>{" "}
                                    <h3>Updated: {format(new Date(data.updatedAt), "PPP")}</h3>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="font-medium">
                            <p>
                                Kennel: <span className="text-sm font-light">#{data.kennel.no}</span>
                            </p>
                            <p>
                                Condition: <span className="text-sm font-light">{data.dogCondition}</span>
                            </p>
                            <p>
                                Status: <span className="text-sm font-light">{data.dogStatus}</span>
                            </p>
                            <p>
                                Gender: <span className="text-sm font-light">{data.gender}</span>
                            </p>
                            <p>
                                Microchip: <span className="text-sm font-light">{data.microchip}</span>
                            </p>
                        </div>
                        <div className="font-medium">
                            <p>
                                Breed: <span className="text-sm font-light">{data.breed.name}</span>
                            </p>
                            <p>
                                Birt date:{" "}
                                <span className="text-sm font-light">{format(new Date(data.dateOfBirth), "PPP")}</span>
                            </p>

                            <p>
                                Intake: <span className="text-sm font-light">{data.intake}</span>
                            </p>
                            <p>
                                Intake:{" "}
                                <span className="text-sm font-light">{format(new Date(data.intakeDate), "PPP")}</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return content;
};

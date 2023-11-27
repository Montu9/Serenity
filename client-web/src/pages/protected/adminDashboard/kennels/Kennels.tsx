import Kennel from "@/app/api/features/kennel/entities/Kennel";
import { useLazyGetAllDogsInKennelQuery } from "@/app/api/features/kennel/kennelApiSlice";
import { useGetAllKennelsQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMatch } from "react-router-dom";
import { DogDataTable } from "../dogs/components/DogDataTable";
import { columns } from "../dogs/components/columns";

export const Kennels = () => {
    const match = useMatch("/dashboard/:shelterUuid/:lastPart");
    const shelterUuid = match?.params.shelterUuid || "";
    const { data, isLoading, isSuccess } = useGetAllKennelsQuery({ shelterUuid });
    const [getAllDogs, { data: dogData, isLoading: isLoadingDogData, isSuccess: isSuccessDogData }] =
        useLazyGetAllDogsInKennelQuery();
    //const {} = useGetKennelQuery({ kennelUuid });
    const onSubmit = async (kennel: Kennel) => {
        console.log(kennel);
        try {
            await getAllDogs({ kennelUuid: kennel.uuid }).unwrap();
        } catch (error) {}
    };

    let content;
    if (isLoading) {
        content = "Loading";
    } else if (isSuccess) {
        content = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {data.map((kennel, i) => {
                    return (
                        <Card key={i} onClick={() => onSubmit(kennel)}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    <div className="flex flex-row items-center justify-between space-x-1">
                                        <h2>{kennel.uuid}</h2>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">#{kennel.no}</div>
                                <p className="text-xs text-muted-foreground">{kennel.desc}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Kennels list</h2>
                    <p className="text-sm text-muted-foreground">
                        Praesent ut tincidunt justo. Proin ut purus diam. Sed fringilla odio nec gravida finibus.
                        Aliquam blandit, augue vulputate aliquam scelerisque, est lorem volutpat nisi, a facilisis quam
                        nisi et lectus. Donec in felis sed nisl congue ultrices eget at augue.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{content}</div>
            <div>{dogData ? <DogDataTable data={dogData} columns={columns} /> : ""} </div>
        </>
    );
};

import Kennel from "@/app/api/features/kennel/entities/Kennel";
import { useLazyGetAllDogsInKennelQuery } from "@/app/api/features/kennel/kennelApiSlice";
import { useGetAllKennelsQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { CardSkeleton, InputSkeleton, LoadingError, NothingHere } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { DogDataTable } from "../../adminDashboard/dogs/components/DogDataTable";
import { columns } from "./components/column";

export const KennelPanel = () => {
    const { toast } = useToast();
    const { shelterUuid } = useParams();
    const { data, isLoading, isSuccess, isError } = useGetAllKennelsQuery({ shelterUuid: shelterUuid || "" });

    const [
        getAllDogs,
        { data: dogData, isLoading: isLoadingDogData, isSuccess: isSuccessDogData, isError: isErrorDogData },
    ] = useLazyGetAllDogsInKennelQuery();

    const onSubmit = async (kennel: Kennel) => {
        try {
            await getAllDogs({ kennelUuid: kennel.uuid }).unwrap();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "We were unable to retrieve the data from the server. Try again later.",
            });
        }
    };

    let dogContent = <InputSkeleton />;
    if (isLoadingDogData) {
        dogContent = <InputSkeleton />;
    } else if (isSuccessDogData) {
        dogContent = dogData ? <DogDataTable data={dogData} columns={columns} /> : <NothingHere />;
    } else if (isErrorDogData) {
        dogContent = <LoadingError />;
    }

    let content;
    if (isLoading) {
        content = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>
        );
    } else if (isSuccess) {
        content = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.length === 0 ? (
                    <NothingHere />
                ) : (
                    data.map((kennel) => {
                        return (
                            <Card key={kennel.uuid} onClick={() => onSubmit(kennel)}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        <div className="flex flex-row items-center justify-between space-x-1">
                                            <h2>{kennel.uuid}</h2>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">#{kennel.no}</div>
                                    <p className="text-xs text-muted-foreground">{kennel.desc}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Show dogs</Button>
                                        </DialogTrigger>
                                        <DialogContent className="container max-w-6xl block">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl flex items-center font-bold">
                                                    Kennel: {kennel.no} <DotFilledIcon />{" "}
                                                    <span className="text-xs font-light">{kennel.uuid}</span>
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="w-full py-4">{dogContent}</div>
                                            <DialogFooter className="sm:justify-end">
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        );
                    })
                )}
            </div>
        );
    } else if (isError) {
        content = <LoadingError />;
    }

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium">Kennel list</h2>
                    <p className="text-sm text-muted-foreground">
                        In this section, caretakers can display a table showcasing the dogs currently housed in each
                        kennel. This feature allows for a quick and organized overview, enhancing efficiency in managing
                        the well-being of our canine residents. Your attentive care makes a meaningful difference in the
                        lives of our dogs.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{content}</div>
        </>
    );
};

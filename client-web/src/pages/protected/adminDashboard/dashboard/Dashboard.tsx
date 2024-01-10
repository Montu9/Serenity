import { Separator } from "@/components/ui/separator";
import { CaretakerCards } from "./components/CaretakerCards";

export const Dashboard = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
                    <p className="text-sm text-muted-foreground">
                        In the kennels section, you'll find a comprehensive list of available spaces for our furry
                        friends. Explore the various kennels to view details and manage their occupancy, ensuring a
                        comfortable and organized environment for the dogs in our care.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CaretakerCards />
                </div>
            </div>
            {/* <div>{dogData ? <DogDataTable data={dogData} columns={columns} /> : ""} </div> */}
        </>
    );
};

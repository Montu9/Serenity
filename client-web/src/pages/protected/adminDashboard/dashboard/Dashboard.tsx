import { Separator } from "@/components/ui/separator";
import { CaretakerCards } from "./components/CaretakerCards";
import { DogCards } from "./components/DogCards";

export const Dashboard = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
                    <p className="text-sm text-muted-foreground text-justify">
                        Welcome to the Dashboard – your central hub for all things related to our shelter management
                        system. Here, you'll find a snapshot of critical information, including kennel occupancy, recent
                        activities, and important alerts. Navigate with ease, stay informed, and manage tasks
                        efficiently, all from the convenience of the Dashboard.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CaretakerCards />
                    <DogCards />
                </div>
            </div>
        </>
    );
};

import { Separator } from "@/components/ui/separator";
import { AddNewDogForm } from "./components/AddNewDogForm";

export const AddNewDog = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Add Dog</h2>
                    <p className="text-sm text-muted-foreground">Provide number and description for your new kennel</p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 lg:max-w-2xl">
                <AddNewDogForm />
            </div>
        </>
    );
};

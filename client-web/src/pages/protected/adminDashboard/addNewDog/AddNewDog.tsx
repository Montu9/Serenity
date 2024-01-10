import { Separator } from "@/components/ui/separator";
import { AddNewDogForm } from "./components/AddNewDogForm";

export const AddNewDog = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Add Dog</h2>
                    <p className="text-sm text-muted-foreground">
                        Ready to welcome a new furry friend? Simply share some essential details about the dog: their
                        name, breed, age, gender, and any special notes or a intake date you'd like to include. This
                        information helps us create a profile for the dog in your system, ensuring they receive the best
                        care possible.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 lg:max-w-2xl">
                <AddNewDogForm />
            </div>
        </>
    );
};

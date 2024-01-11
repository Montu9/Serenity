import { Separator } from "@/components/ui/separator";
import { AddNewKennelForm } from "./components/AddNewKennelForm";

export const AddNewKennel = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Add Kennel</h2>
                    <p className="text-sm text-muted-foreground text-justify">
                        Welcome to Kennel Creation! To get started, please provide the necessary details to set up your
                        new kennel. Once completed, you'll be all set to manage and organize your kennel space
                        efficiently. Thank you for joining us in providing comfort and care for furry friends!
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 lg:max-w-2xl">
                <AddNewKennelForm />
            </div>
        </>
    );
};

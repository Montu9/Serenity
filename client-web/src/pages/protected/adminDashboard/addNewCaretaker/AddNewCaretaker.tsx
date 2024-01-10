import { Separator } from "@/components/ui/separator";
import { AddNewCaretakerForm } from "./components/AddNewCaretakerForm";

export const AddNewCaretaker = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Add Caretaker</h2>
                    <p className="text-sm text-muted-foreground">
                        Here, you can easily integrate new caretakers into your shelter management system. Simply
                        provide the caretaker's email and specify their role. This will provide them with access and
                        responsibilities within the system. Thank you for your contribution to your furry friends'
                        well-being!{" "}
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 lg:max-w-2xl">
                <AddNewCaretakerForm />
            </div>
        </>
    );
};

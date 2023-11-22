import { Separator } from "@/components/ui/separator";
import { AddNewCaretakerForm } from "./components/AddNewCaretakerForm";

export const AddNewCaretaker = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Add Caretaker</h2>
                    <p className="text-sm text-muted-foreground">Provide email of caretaker that you want to add.</p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <AddNewCaretakerForm />
            </div>
        </>
    );
};

import { Separator } from "@/components/ui/separator";
import { SecurityForm } from "./components/SecurityForm";

export const SecuritySettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings. Set your basic information.
                </p>
            </div>
            <Separator />
            <SecurityForm />
        </div>
    );
};

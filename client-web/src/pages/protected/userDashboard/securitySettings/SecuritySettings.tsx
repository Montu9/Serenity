import { Separator } from "@/components/ui/separator";
import { SecurityForm } from "./components/SecurityForm";

export const SecuritySettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Security</h3>
                <p className="text-sm text-muted-foreground text-justify">
                    Within the Settings section, you can easily update your account password. This feature ensures the
                    security of your account by allowing you to create a new, personalized password.
                </p>
            </div>
            <Separator />
            <SecurityForm />
        </div>
    );
};

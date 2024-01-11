import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./components/ProfileForm";

export const ProfileSettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground text-justify">
                    In the profile settings, you have the ability to adjust and refine your account's information. This
                    includes personal details such as your name, email address, and gender information.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    );
};

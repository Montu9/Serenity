import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserShelterList } from "./components/UserShelterList";
import CreateShelter from "@/components/createShelter/CreateShelter";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/api/features/auth/authSlice";

export const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">{`Welcome ${user.firstName}!`}</h2>
                <p className="text-muted-foreground">
                    Good to see you! Our Dog Shelter Management System – the comprehensive solution tailored to
                    streamline the care and well-being of our four-legged friends! Our system is designed to simplify
                    shelter operations, offering a centralized platform for medical records, daily activities, and more.
                    From intake to adoption, every step of a dog's journey is tracked efficiently, ensuring their safety
                    and happiness.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Dialog>
                    <Button asChild>
                        <DialogTrigger>Create new Shelter MS</DialogTrigger>
                    </Button>
                    <CreateShelter />
                </Dialog>
            </div>
            <UserShelterList />
        </div>
    );
};

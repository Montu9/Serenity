import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserShelterList } from "./components/UserShelterList";
import CreateShelter from "@/components/createShelter/CreateShelter";

const Welcome = () => {
    return (
        <div className="h-fit w-fit flex items-center">
            <UserShelterList />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <CreateShelter />
            </Dialog>
        </div>
    );
};

export default Welcome;

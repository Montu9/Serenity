import { UserShelterList } from "./components/UserShelterList";

const Welcome = () => {
    return (
        <div className="h-fit w-fit flex items-center justify-center">
            <UserShelterList />
            {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger>
                <CreateShelter />
            </AlertDialog> */}
        </div>
    );
};

export default Welcome;

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DogInfo } from "./components/dogInfo/DogInfo";
import { CleaningPanel } from "./components/cleaningPanel/CleaningPanel";
import { FeedingPanel } from "./components/feedingPanel/FeedingPanel";
import { MedicatePanel } from "./components/medicatePanel/MedicatePanel";
import { WalkDialog } from "./components/walkPanel/WalkDialog";
import { WalkPanel } from "./components/walkPanel/WalkPanel";
import { MedicateDialog } from "./components/medicatePanel/MedicateDialog";
import { FeedingDialog } from "./components/feedingPanel/FeedingDialog";
import { CleaningDialog } from "./components/cleaningPanel/CleaningDialog";

export const DogPanel = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <DogInfo />
            </div>
            <div>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <WalkPanel />
                    </DialogTrigger>
                    <WalkDialog />
                </Dialog>
            </div>
            <div>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <FeedingPanel />
                    </DialogTrigger>
                    <FeedingDialog />
                </Dialog>
            </div>
            <div>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <CleaningPanel />
                    </DialogTrigger>
                    <CleaningDialog />
                </Dialog>
            </div>
            <div>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <MedicatePanel />
                    </DialogTrigger>
                    <MedicateDialog />
                </Dialog>
            </div>
        </div>
    );
};

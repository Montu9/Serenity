import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DogInfo } from "./components/DogInfo";
import { CleaningPanel } from "./components/cleaningPanel/CleaningPanel";
import { FeedingPanel } from "./components/feedingPanel/FeedingPanel";
import { MedicatePanel } from "./components/medicatePanel/MedicatePanel";
import { WalkPanel } from "./components/walkPanel/WalkPanel";
import { WalkDialog } from "./components/walkPanel/WalkDialog";

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
                <FeedingPanel />
            </div>
            <div>
                <CleaningPanel />
            </div>
            <div>
                <MedicatePanel />
            </div>
        </div>
    );
};

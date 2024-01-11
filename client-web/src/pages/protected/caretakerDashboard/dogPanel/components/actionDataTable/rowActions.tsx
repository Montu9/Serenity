import { useDeleteDogMutation } from "@/app/api/features/dog/dogApiSlice";
import Dog from "@/app/api/features/dog/entities/Dog";
import { useDeleteCleaningMutation } from "@/app/api/features/dogActions/cleaning/cleaningApiSlice";
import { useDeleteFeedingMutation } from "@/app/api/features/dogActions/feeding/feedingApiSlice";
import { useDeleteMedicateMutation } from "@/app/api/features/dogActions/medicate/medicateApiSlice";
import Walk from "@/app/api/features/dogActions/walk/entities/Walk";
import { useDeleteWalkMutation } from "@/app/api/features/dogActions/walk/walkApiSlice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    type: string;
}

export function DataTableRowActions<TData>({ type, row }: DataTableRowActionsProps<TData>) {
    const { toast } = useToast();
    const id = row.original.id;

    const [deleteWalk] = useDeleteWalkMutation();
    const [deleteFeeding] = useDeleteFeedingMutation();
    const [deleteCleaning] = useDeleteCleaningMutation();
    const [deleteMedicate] = useDeleteMedicateMutation();

    const onSubmit = async () => {
        if (type === "walk") {
            await deleteWalk({ actionId: id }).unwrap();
        } else if (type === "feeding") {
            await deleteFeeding({ actionId: id }).unwrap();
        } else if (type === "cleaning") {
            await deleteCleaning({ actionId: id }).unwrap();
        } else if (type === "medicate") {
            await deleteMedicate({ actionId: id }).unwrap();
        }

        try {
            toast({
                variant: "success",
                title: "You have successfully removed Action",
                description: "Action is no longer in your shelter system.",
            });
        } catch (err: unknown) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Try again later or refresh this page",
            });
        }
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSubmit}>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
}

import { useDeleteDogMutation } from "@/app/api/features/dog/dogApiSlice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Dog } from "../../dogs/components/dogSchema";
import { EditDog } from "../../dogs/components/editDog/EditDog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const { toast } = useToast();
    const dog = row.original as Dog;
    const [deleteDog] = useDeleteDogMutation();

    const onSubmit = async () => {
        try {
            await deleteDog({ dogUuid: dog.uuid }).unwrap();
            toast({
                variant: "success",
                title: "You have successfully removed caretaker",
                description: "Caretaker is no longer in your shelter system.",
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dog.uuid)}>
                        Copy Email
                    </DropdownMenuItem>
                    <DialogTrigger>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSubmit}>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="container max-w-4xl block">
                <EditDog dog={dog as Dog} />
            </DialogContent>
        </Dialog>
    );
}

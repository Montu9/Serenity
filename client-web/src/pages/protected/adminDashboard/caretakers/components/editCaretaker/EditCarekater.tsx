import { useUpdateCaretakerRoleMutation } from "@/app/api/features/caretaker/caretakerApiSlice";
import { useGetAllRolesQuery } from "@/app/api/features/common/role/roleApiSlice";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useMatch } from "react-router-dom";
import * as z from "zod";
import { Caretaker } from "../caretakerSchema";
import editCaretakerSchema from "./editCaretakerSchema";

interface EditCaretakerProps {
    caretaker: Caretaker;
}

export const EditCarekater = ({ caretaker }: EditCaretakerProps) => {
    const { toast } = useToast();
    const match = useMatch("/dashboard/:id/:lastPart");
    const pathnameLastPart = match?.params.id || "";

    const { data } = useGetAllRolesQuery();
    const [updateCaretakerRole, { isLoading: isLoadingUpdate, error }] = useUpdateCaretakerRoleMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof editCaretakerSchema>>({
        resolver: zodResolver(editCaretakerSchema),
        defaultValues: {
            role: caretaker.role,
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof editCaretakerSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof editCaretakerSchema>) => {
        try {
            await updateCaretakerRole({
                data: { role: values.role },
                caretakerUuid: caretaker.uuid,
                shelterUuid: pathnameLastPart,
            }).unwrap();

            toast({
                variant: "success",
                title: "You have changed your data successfully!",
                description: "Your data has been saved securly!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your credentials and try again..",
            });
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>{`Change role of ${caretaker.firstName} ${caretaker.lastName}`}</DialogTitle>
                <DialogDescription>
                    In this tab, effortlessly modify caretaker roles for effective management. Simply pick the new role
                    to assign for caretaker profile you have selected.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {data?.map((role) => (
                                            <SelectItem key={role.name} value={role.name}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="sm:justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoadingUpdate}>
                            {isLoadingUpdate && <BiLoaderCircle className="animate-spin" />}Update Role
                        </Button>
                        {errMsg && errMsg?.length > 0 ? (
                            <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                        ) : (
                            ""
                        )}
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};

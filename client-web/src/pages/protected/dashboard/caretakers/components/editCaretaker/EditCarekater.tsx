import { useGetAllRolesQuery } from "@/app/api/features/role/roleApiSlice";
import { useUpdateCaretakerRoleMutation } from "@/app/api/features/shelter/shelterApiSlice";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ErrorHandler } from "@/lib/ErrorHandler";
import PrepError from "@/types/PrepError";
import RetrivedError from "@/types/RetrivedError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
    const { data, isLoading, isSuccess } = useGetAllRolesQuery();
    const [updateCaretakerRole, { isLoading: isLoadingUpdate }] = useUpdateCaretakerRoleMutation();
    const [errMsg, setErrMsg] = useState<string>("");
    const form = useForm<z.infer<typeof editCaretakerSchema>>({
        resolver: zodResolver(editCaretakerSchema),
        defaultValues: {
            role: caretaker.role,
        },
    });

    const onSubmit = async (values: z.infer<typeof editCaretakerSchema>) => {
        try {
            await updateCaretakerRole({
                data: { userUuid: caretaker.uuid, role: values.role },
                id: pathnameLastPart,
            }).unwrap();

            toast({
                variant: "success",
                title: "You have changed your data successfully!",
                description: "Your data has been saved securly!",
            });
            setErrMsg("");
        } catch (err: unknown) {
            const error = new ErrorHandler(err as PrepError);
            const retrivedError: RetrivedError = error.getRetrivedError();
            if (retrivedError.message) {
                setErrMsg(retrivedError.message);
            } else {
                retrivedError.data?.map((error) => {
                    form.setError(error.property as keyof z.infer<typeof editCaretakerSchema>, {
                        type: "server",
                        message: error.constraints.join("\n"),
                    });
                });
            }
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your credentials and try again.",
            });
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>{`Change role for ${caretaker.firstName} ${caretaker.lastName}`}</DialogTitle>
                <DialogDescription>
                    Provide name for your dog shelter organization. Remember, you can only have 3 active dashboards for
                    your shelters.
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

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoadingUpdate}>
                            {isLoadingUpdate && <BiLoaderCircle className="animate-spin" />}Create
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

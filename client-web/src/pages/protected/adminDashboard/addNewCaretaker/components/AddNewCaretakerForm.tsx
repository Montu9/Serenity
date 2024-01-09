import { useAddCaretakerByEmailMutation } from "@/app/api/features/caretaker/caretakerApiSlice";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useMatch } from "react-router-dom";
import * as z from "zod";
import addNewCaretakerSchema from "./addNewCaretakerSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllRolesQuery } from "@/app/api/features/common/role/roleApiSlice";

export const AddNewCaretakerForm = () => {
    const match = useMatch("/dashboard/:id/:lastPart");
    const pathnameLastPart = match?.params.id || "";
    const { toast } = useToast();

    const { data } = useGetAllRolesQuery();
    const [addCaretakerByEmail, { isLoading: isLoadingAdd, error }] = useAddCaretakerByEmailMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof addNewCaretakerSchema>>({
        resolver: zodResolver(addNewCaretakerSchema),
        defaultValues: {
            email: "",
            role: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof addNewCaretakerSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof addNewCaretakerSchema>) => {
        try {
            await addCaretakerByEmail({
                shelterUuid: pathnameLastPart,
                data: { email: values.email, role: values.role },
            }).unwrap();

            toast({
                variant: "success",
                title: "You have added caretaker successfully!",
                description: "Your data has been saved securly!",
            });
        } catch (err: unknown) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your credentials and try again.",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <Button className="col-span-2" type="submit" disabled={isLoadingAdd}>
                        {isLoadingAdd && <BiLoaderCircle className="animate-spin" />}Add caretaker
                    </Button>
                </div>
                {errMsg && errMsg?.length > 0 ? (
                    <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                ) : (
                    ""
                )}
            </form>
        </Form>
    );
};

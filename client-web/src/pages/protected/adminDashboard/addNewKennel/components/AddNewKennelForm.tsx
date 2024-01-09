import { useCreateKennelMutation } from "@/app/api/features/kennel/kennelApiSlice";
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
import addNewKennelSchema from "./addNewKennelSchema";

export const AddNewKennelForm = () => {
    const match = useMatch("/dashboard/:id/:lastPart");
    const pathnameLastPart = match?.params.id || "";
    const { toast } = useToast();

    const [createKennel, { isLoading, error }] = useCreateKennelMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof addNewKennelSchema>>({
        resolver: zodResolver(addNewKennelSchema),
        defaultValues: {
            no: 0,
            desc: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof addNewKennelSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof addNewKennelSchema>) => {
        try {
            await createKennel({
                shelterUuid: pathnameLastPart,
                data: { no: values.no, desc: values.desc },
            }).unwrap();

            toast({
                variant: "success",
                title: "You have created new kennel successfully!",
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
                        name="no"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Numeric label for kennel</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="423" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description for kennel</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Lorem ipsum ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="col-span-2" type="submit" disabled={isLoading}>
                        {isLoading && <BiLoaderCircle className="animate-spin" />}Create kennel
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

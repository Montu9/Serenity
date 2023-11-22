import { useAddCaretakerByEmailMutation } from "@/app/api/features/shelter/shelterApiSlice";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ErrorHandler } from "@/lib/ErrorHandler";
import PrepError from "@/types/PrepError";
import RetrivedError from "@/types/RetrivedError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useMatch } from "react-router-dom";
import * as z from "zod";
import addNewCaretakerSchema from "./addNewCaretakerSchema";
import { useForm } from "react-hook-form";

export const AddNewCaretakerForm = () => {
    const match = useMatch("/dashboard/:id/:lastPart");
    const pathnameLastPart = match?.params.id || "";
    const { toast } = useToast();
    const [addCaretakerByEmail, { isLoading }] = useAddCaretakerByEmailMutation();
    const [errMsg, setErrMsg] = useState<string>("");

    const form = useForm<z.infer<typeof addNewCaretakerSchema>>({
        resolver: zodResolver(addNewCaretakerSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof addNewCaretakerSchema>) => {
        try {
            await addCaretakerByEmail({
                credentials: { email: values.email },
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
                    form.setError(error.property as keyof z.infer<typeof addNewCaretakerSchema>, {
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

                    <Button className="col-span-2" type="submit" disabled={isLoading}>
                        {isLoading && <BiLoaderCircle className="animate-spin" />}Update your profile
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

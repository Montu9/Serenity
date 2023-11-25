import { useUpdatePasswordMutation } from "@/app/api/features/auth/authApiSlice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import securitySchema from "./securitySchema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderCircle } from "react-icons/bi";
import { ErrorHandler } from "@/lib/ErrorHandler";
import PrepError from "@/types/PrepError";
import RetrivedError from "@/types/RetrivedError";
import UpdatePassword from "@/app/api/features/user/dto/UpdatePasswordDto";

export const SecurityForm = () => {
    const { toast } = useToast();
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const [errMsg, setErrMsg] = useState<string>("");

    const form = useForm<z.infer<typeof securitySchema>>({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            newPassword: "",
            newPasswordConfirm: "",
            oldPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof securitySchema>) => {
        try {
            await updatePassword({
                newPassword: values.newPassword,
                newPasswordConfirm: values.newPasswordConfirm,
                oldPassword: values.oldPassword,
            }).unwrap();

            toast({
                variant: "success",
                title: "You have successfully changed your password",
                description: "Your data has been saved securly!",
            });
            setErrMsg("");
        } catch (err) {
            console.log(err);
            const error = new ErrorHandler(err as PrepError);
            const retrivedError: RetrivedError = error.getRetrivedError();
            if (retrivedError.message) {
                setErrMsg(retrivedError.message);
            } else {
                retrivedError.data?.map((error) => {
                    form.setError(error.property as keyof UpdatePassword, {
                        type: "server",
                        message: error.constraints.join("\n"),
                    });
                });
            }
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your data and try again.",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="newPasswordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
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

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import * as z from "zod";
import { usePasswordResetMutation } from "@/app/api/features/auth/authApiSlice";
import forgotPasswordSchema from "./components/forgotPasswordSchema";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

type RouteParams = {
    confirmationToken: string;
    email: string;
};

export const ForgotPassword = () => {
    const { confirmationToken, email } = useParams<RouteParams>();
    const { toast } = useToast();
    const [resetPassword, { isLoading, error }] = usePasswordResetMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            newPassword: "",
            newPasswordConfirm: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof forgotPasswordSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        try {
            await resetPassword({
                confirmationToken: confirmationToken!,
                email: email!,
                data: {
                    newPassword: values.newPassword,
                    newPasswordConfirm: values.newPasswordConfirm,
                },
            }).unwrap();

            toast({
                variant: "success",
                title: "You have successfully changed your password",
                description:
                    "Password Reset Successful! Your password has been updated. You can now log in using your new credentials. If you need any further assistance, feel free to reach out to us. Thank you!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description:
                    "Please try again later or contact our support team for assistance. We apologize for any inconvenience caused. Check your data and try again.",
            });
        }
    };

    return (
        <div className="h-full w-full min-h-screen min-w-screen flex items-center justify-center">
            <Card className="w-[450px] h-full min-h-screen sm:h-fit sm:min-h-fit flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle className="py-2 text-2xl">Request password reset</CardTitle>
                    <CardDescription className="text-justify">
                        To change your password, please fill in both the 'New Password' and 'Confirm Password' fields.
                        Both fields are required to ensure the security of your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full">
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
                                <Button className="col-span-2" type="submit" disabled={isLoading}>
                                    {isLoading && <BiLoaderCircle className="animate-spin" />}Change password
                                </Button>
                            </div>

                            {errMsg && errMsg?.length > 0 ? (
                                <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                            ) : (
                                ""
                            )}
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="w-full flex justify-end">
                    <Link to="/">
                        <Button variant="outline">
                            <ArrowLeftIcon />
                            Back
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

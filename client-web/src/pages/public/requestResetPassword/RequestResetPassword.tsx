import { useRequestPasswordResetMutation } from "@/app/api/features/auth/authApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { useForm } from "react-hook-form";
import * as z from "zod";
import requestResetPasswordSchema from "./components/requestResetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BiLoaderCircle } from "react-icons/bi";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const RequestResetPassword = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [requestResetPassword, { isLoading, error }] = useRequestPasswordResetMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof requestResetPasswordSchema>>({
        resolver: zodResolver(requestResetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof requestResetPasswordSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof requestResetPasswordSchema>) => {
        try {
            await requestResetPassword({
                email: values.email,
            }).unwrap();

            toast({
                variant: "success",
                title: "You have request your reset link successfully!",
                description:
                    "Success! We've received your request to reset your password. Please check your email for further instructions. If you don't see an email from us within a few minutes, kindly check your spam folder.",
                action: (
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon />
                        Back
                    </Button>
                ),
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description:
                    "Please try again later or contact our support team for assistance. We apologize for any inconvenience caused.",
            });
        }
    };

    return (
        <div className="h-full w-full min-h-screen min-w-screen flex items-center justify-center">
            <Card className="w-[450px] h-full min-h-screen sm:h-fit sm:min-h-fit flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle className="py-2 text-2xl">Request password reset</CardTitle>
                    <CardDescription className="text-justify">
                        To reset your password, please enter the email address associated with your account below. We'll
                        send you a link to reset your password. If you don't receive an email within a few minutes,
                        please check your spam folder.
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full">
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
                                    {isLoading && <BiLoaderCircle className="animate-spin" />}Request Password Reset
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
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon />
                        Back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

import { useLoginMutation } from "@/app/api/features/auth/authApiSlice";
import { setCredentials } from "@/app/api/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import * as z from "zod";
import loginSchema from "./loginSchema";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const { toast } = useToast();
    const [login, { isLoading, error }] = useLoginMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);
    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof loginSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const userData = await login({ email: values.email, password: values.password }).unwrap();

            dispatch(
                setCredentials({
                    user: userData.userEntity,
                    accessToken: userData.accessToken,
                })
            );

            toast({
                variant: "success",
                title: `Hi ${userData.userEntity.firstName}! You have logged in successfully!`,
                description: "We are going to load your data now.",
            });
        } catch (error) {
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
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="*******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Link className="font-medium text-sm px-1 pt-1 pb-2" to="/forgot-password">
                        Forgot Password
                    </Link>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <BiLoaderCircle className="animate-spin" />}Sign In with Email
                    </Button>
                    {errMsg && errMsg?.length > 0 ? (
                        <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                    ) : (
                        ""
                    )}
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;

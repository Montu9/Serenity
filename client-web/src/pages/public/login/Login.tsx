import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import loginImg from "@/assets/images/login.png";
import logo from "@/assets/svg/logo.svg";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import loginSchema from "./components/loginSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { BiLoaderCircle } from "react-icons/bi";
import getErrorMessage from "@/lib/errorMessage";

export const Login = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const userData = await login({ email: values.email, password: values.password }).unwrap();

            dispatch(
                setCredentials({
                    user: userData.userEntity,
                    accessToken: userData.tokens.accessToken,
                    refreshToken: userData.tokens.refreshToken,
                })
            );
            setErrMsg("");
        } catch (err: unknown) {
            setErrMsg(getErrorMessage(err));
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="container relative lg:h-[700px] flex-col items-center justify-center grid h-screen lg:w-10/12 lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-zinc-900 bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${loginImg})` }}
                    />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img src={logo} alt="logo" className="h-20 w-20 rounded-full" />
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4">Serenity</h1>
                    </div>
                </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center items-center">
                            <img src={logo} alt="logo" className="h-20 w-20 rounded-full lg:hidden" />
                            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password to log in to your account
                            </p>
                        </div>
                        <div className="grid gap-6">
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

                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading && <BiLoaderCircle className="animate-spin" />}Sign In with Email
                                        </Button>
                                        {errMsg && errMsg?.length > 0 ? (
                                            <small className="text-sm font-medium leading-none text-destructive">
                                                {errMsg}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </form>
                            </Form>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" type="button">
                                Create Account
                            </Button>
                        </div>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

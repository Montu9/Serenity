import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import loginSchema from "./loginSchema";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { BiLoaderCircle } from "react-icons/bi";
import getErrorMessage from "@/lib/errorMessage";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginForm = () => {
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

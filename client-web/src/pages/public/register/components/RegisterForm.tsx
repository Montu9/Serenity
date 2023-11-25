import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import registerSchema from "./registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BiLoaderCircle } from "react-icons/bi";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import PrepError from "@/types/PrepError";
import { ErrorHandler } from "@/lib/ErrorHandler";
import RetrivedError from "@/types/RetrivedError";
import Register from "@/app/api/features/auth/dto/Register";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "@/app/api/features/auth/authApiSlice";

const RegisterForm = () => {
    const { toast } = useToast();
    const [register, { isLoading }] = useRegisterMutation();
    const [errMsg, setErrMsg] = useState<string>("");

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            firstName: "",
            lastName: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            await register({
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
            }).unwrap();

            toast({
                variant: "success",
                title: "You have sign up successfully!",
                description: "Now you can log in and set up your account.",
                action: (
                    <Link to="/login">
                        <ToastAction altText="Sign in" className="w-full">
                            Sign&nbsp;in
                        </ToastAction>
                    </Link>
                ),
            });
            setErrMsg("");
        } catch (err: unknown) {
            console.log(err);
            const error = new ErrorHandler(err as PrepError);
            const retrivedError: RetrivedError = error.getRetrivedError();
            if (retrivedError.message) {
                setErrMsg(retrivedError.message);
            } else {
                retrivedError.data?.map((error) => {
                    form.setError(error.property as keyof Register, {
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="col-span-2" type="submit" disabled={isLoading}>
                        {isLoading && <BiLoaderCircle className="animate-spin" />}Sign Up
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

export default RegisterForm;

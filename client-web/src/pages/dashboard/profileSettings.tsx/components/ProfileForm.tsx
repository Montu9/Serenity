import { useGetUserQuery, useUpdateUserMutation } from "@/app/api/features/auth/authApiSlice";
import { setUser } from "@/app/api/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ErrorHandler } from "@/lib/ErrorHandler";
import PrepError from "@/types/PrepError";
import RetrivedError from "@/types/RetrivedError";
import UpdateUser from "@/types/UpdateUser";
import User from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import * as z from "zod";
import profileSchema from "./profileSchema";

export const ProfileForm = () => {
    const { toast } = useToast();
    const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
    const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
    const [errMsg, setErrMsg] = useState<string>("");
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: data?.email || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            gender: data?.gender.name || "",
        },
    });

    useEffect(() => {
        const setFormValues = () => {
            form.setValue("email", data?.email || "");
            form.setValue("firstName", data?.firstName || "");
            form.setValue("lastName", data?.lastName || "");
            form.setValue("gender", data?.gender.name || "");
        };
        setFormValues();
    }, [form, data]);

    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        try {
            const updatedUser: User = await updateUser({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
            }).unwrap();

            dispatch(setUser(updatedUser));

            toast({
                variant: "success",
                title: "You have changed your data successfully!",
                description: "Your data has been saved secucly!",
            });
            setErrMsg("");
        } catch (err: unknown) {
            const error = new ErrorHandler(err as PrepError);
            const retrivedError: RetrivedError = error.getRetrivedError();
            if (retrivedError.message) {
                setErrMsg(retrivedError.message);
            } else {
                retrivedError.data?.map((error) => {
                    form.setError(error.property as keyof UpdateUser, {
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

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = (
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
    }

    return content;
};

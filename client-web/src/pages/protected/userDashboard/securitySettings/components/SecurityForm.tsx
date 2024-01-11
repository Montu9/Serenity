import { useUpdatePasswordMutation } from "@/app/api/features/user/userApiSlice";
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
import securitySchema from "./securitySchema";
import { useDeleteUserMutation } from "@/app/api/features/auth/authApiSlice";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

export const SecurityForm = () => {
    const { toast } = useToast();
    const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const [deleteUser, { isLoading: isLoadingDelete, error: errorDelete }] = useDeleteUserMutation();
    const { errorMessage: errMsgDelete } = useFetchError(errorDelete);

    const form = useForm<z.infer<typeof securitySchema>>({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            newPassword: "",
            newPasswordConfirm: "",
            oldPassword: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof securitySchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

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
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your data and try again.",
            });
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser().unwrap();
            toast({
                variant: "success",
                title: "You have removed your account successfully!",
                description: "Your data has been saved securly!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check provided data and try again.",
            });
        }
    };

    return (
        <>
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
                                <FormItem className="col-span-2">
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
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-2 items-center">
                <p className="col-span-2 px-2 py-4 text-sm text-justify leading-5 font-light">
                    Removing your account is a permanent action. By proceeding, all associated data and preferences will
                    be deleted. If you're certain about this decision, please be aware that it cannot be undone. Take a
                    moment to consider the implications before confirming the account removal.
                </p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="row-start-2">
                            <Button variant="destructive" className="w-full">
                                {isLoadingDelete && <BiLoaderCircle className="animate-spin" />}Delete account
                            </Button>
                            {errMsgDelete && errMsgDelete?.length > 0 ? (
                                <small className="text-sm font-medium leading-none text-destructive">
                                    {errMsgDelete}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
};

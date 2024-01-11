import {
    useDeleteKennelMutation,
    useGetKennelQuery,
    useUpdateKennelMutation,
} from "@/app/api/features/kennel/kennelApiSlice";
import { InputSkeleton, LoadingError } from "@/components";
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
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import * as z from "zod";
import editKennelSchema from "./editKennelSchema";

interface ChildProps {
    kennelUuid: string;
}

export const EditKennelForm: React.FC<ChildProps> = ({ kennelUuid }) => {
    const { toast } = useToast();
    const { data, isLoading, isSuccess, isError } = useGetKennelQuery({ kennelUuid });
    const [updateKennel, { isLoading: isLoadingUpdate, error }] = useUpdateKennelMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    // Remove kennel
    const [deleteKennel, { isLoading: isLoadingDelete, error: errorDelete }] = useDeleteKennelMutation();
    const { errorMessage: errMsgDelete } = useFetchError(errorDelete);

    const form = useForm<z.infer<typeof editKennelSchema>>({
        resolver: zodResolver(editKennelSchema),
        defaultValues: {
            no: 0,
            desc: "",
        },
    });

    useEffect(() => {
        const setFormValues = () => {
            form.setValue("no", data?.no || 0);
            form.setValue("desc", data?.desc || "");
        };
        setFormValues();
    }, [data, form, isSuccess]);

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof editKennelSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof editKennelSchema>) => {
        try {
            await updateKennel({
                kennelUuid: kennelUuid,
                data: {
                    no: values.no,
                    desc: values.desc,
                },
            }).unwrap();

            toast({
                variant: "success",
                title: "You have changed your data successfully!",
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

    const handleDelete = async () => {
        try {
            await deleteKennel({ kennelUuid }).unwrap();
            toast({
                variant: "success",
                title: "You have changed your data successfully!",
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

    let content;
    if (isLoading) {
        content = (
            <div className="flex flex-col gap-4">
                {[...Array(2)].map((_, index) => (
                    <InputSkeleton key={index} />
                ))}
            </div>
        );
    } else if (isSuccess) {
        content = (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <FormField
                            control={form.control}
                            name="no"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Numeric label for kennel</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="423" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Description for kennel</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Lorem ipsum ..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="col-span-2" type="submit" disabled={isLoading}>
                            {isLoadingUpdate && <BiLoaderCircle className="animate-spin" />}Edit kennel
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
    } else if (isError) {
        content = <LoadingError />;
    }

    return (
        <div className="w-full py-2">
            <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="delete">Delete</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <p className="px-2 py-4 text-sm text-justify leading-5 font-light">
                        In the kennel management section, you can easily edit kennel details. This allows you to modify
                        the description, update numeric name, and make any necessary adjustments to ensure accurate and
                        up-to-date information for each kennel in our system.
                    </p>
                    {content}
                </TabsContent>
                <TabsContent value="delete">
                    <div>
                        <p className="px-2 py-4 text-sm text-justify leading-5 font-light">
                            To delete a kennel, please note that all dogs currently residing in that kennel must be
                            moved to another kennel beforehand. Once all dogs have been relocated, you can proceed with
                            the deletion of the kennel. This process ensures the safety and proper management of our
                            furry companions, maintaining their comfort and security during any kennel changes.
                        </p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <div>
                                    <Button variant="destructive" className="w-full">
                                        {isLoadingDelete && <BiLoaderCircle className="animate-spin" />}Delete kennel
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
                                        This action cannot be undone. This will permanently delete this kennel and
                                        remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

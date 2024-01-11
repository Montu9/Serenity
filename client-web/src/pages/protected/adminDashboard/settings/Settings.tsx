import {
    useDeleteShelterMutation,
    useGetShelterByUuidQuery,
    useUpdateShelterMutation,
} from "@/app/api/features/shelter/shelterApiSlice";
import { InputSkeleton, LoadingError } from "@/components";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import * as z from "zod";
import editShelterSchema from "./components/editSchelterSchema";
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

export const Settings = () => {
    const { toast } = useToast();
    const { shelterUuid } = useParams();
    const { data, isLoading, isSuccess, isError } = useGetShelterByUuidQuery({ shelterUuid: shelterUuid || "" });

    const [updateShelter, { isLoading: isLoadingUpdate, error }] = useUpdateShelterMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const [deleteShelter, { isLoading: isLoadingDelete, error: errorDelete }] = useDeleteShelterMutation();
    const { errorMessage: errMsgDelete } = useFetchError(errorDelete);

    const form = useForm<z.infer<typeof editShelterSchema>>({
        resolver: zodResolver(editShelterSchema),
        defaultValues: {
            name: data?.name || "",
            description: data?.description || "",
        },
    });

    useEffect(() => {
        const setFormValues = () => {
            form.setValue("name", data?.name || "");
            form.setValue("description", data?.description || "");
        };
        setFormValues();
    }, [data, form, isSuccess]);

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof editShelterSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const handleDelete = async () => {
        try {
            await deleteShelter({ shelterUuid: shelterUuid || "" }).unwrap();
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

    const onSubmit = async (values: z.infer<typeof editShelterSchema>) => {
        try {
            await updateShelter({
                shelterUuid: shelterUuid || "",
                data: {
                    name: values.name,
                    description: values.description,
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
                description: "Check your information and try again.",
            });
        }
    };

    let content;
    if (isLoading) {
        content = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(4)].map((_, index) => (
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
                            name="name"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Name of the shelter" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Short description of shelter" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoadingUpdate}>
                            {isLoadingUpdate && <BiLoaderCircle className="animate-spin" />}Edit shelter
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
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Shelter settings</h2>
                    <p className="text-sm text-muted-foreground text-justify">
                        The Shelter Settings tab is your command center for tailoring the shelter's information. Easily
                        update the shelter's name and description to keep it current and reflective of your mission.
                        Additionally, efficiently manage your shelter by deleting unnecessary information. Your
                        settings, your control."
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">{content}</div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-2 items-center">
                <p className="px-2 py-4 text-sm text-justify leading-5 font-light">
                    Deleting the shelter is a significant action. Please note that choosing to delete the shelter will
                    result in the removal of all associated data, including dog records, volunteer information, and any
                    other stored data. See you soon!
                </p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="row-start-2">
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
                                This action cannot be undone. This will permanently delete this shelter and remove your
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

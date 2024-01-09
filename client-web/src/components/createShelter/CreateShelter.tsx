import { useCreateShelterMutation } from "@/app/api/features/shelter/shelterApiSlice";
import useFetchError from "@/hooks/useFetchError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import * as z from "zod";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import createShelterSchema from "./components/createSchelterSchema";

const CreateShelter = () => {
    const { toast } = useToast();
    const [createShelter, { isLoading, error }] = useCreateShelterMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof createShelterSchema>>({
        resolver: zodResolver(createShelterSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof createShelterSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof createShelterSchema>) => {
        try {
            await createShelter({ name: values.name, description: values.description }).unwrap();

            toast({
                variant: "success",
                title: `Success!`,
                description: "You have successfully created a new shelter management system!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your data and try again.",
            });
        }
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create space for your dog shelter</DialogTitle>
                <DialogDescription className="text-justify">
                    Welcome to the new shelter management system space creation! To get started, please provide the
                    following information. Once completed, you'll be all set to create and manage your shelter
                    effectively. Thank you for joining us in this journey to care for furry friends!
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Short description of shelter" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <BiLoaderCircle className="animate-spin" />}Create
                        </Button>
                        {errMsg && errMsg?.length > 0 ? (
                            <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                        ) : (
                            ""
                        )}
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default CreateShelter;

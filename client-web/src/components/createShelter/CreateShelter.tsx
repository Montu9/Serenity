import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import createShelterSchema from "./components/createSchelterSchema";
import * as z from "zod";
import { useCreateShelterMutation } from "@/app/api/features/shelter/shelterApiSlice";
import { ErrorHandler } from "@/lib/ErrorHandler";
import PrepError from "@/types/PrepError";
import RetrivedError from "@/types/RetrivedError";
import CreateShelterDto from "@/types/CreateShelterDto";

const CreateShelter = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [createShelter, { isLoading }] = useCreateShelterMutation();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createShelterSchema>>({
        resolver: zodResolver(createShelterSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof createShelterSchema>) => {
        try {
            await createShelter({ name: values.name, description: values.description });

            toast({
                variant: "success",
                title: `Success!`,
                description: "You have successfully created a new shelter management system!",
            });
            setErrMsg("");
        } catch (err: unknown) {
            const error = new ErrorHandler(err as PrepError);
            const retrivedError: RetrivedError = error.getRetrivedError();
            if (retrivedError.message) {
                setErrMsg(retrivedError.message);
            } else {
                retrivedError.data?.map((error) => {
                    form.setError(error.property as keyof CreateShelterDto, {
                        type: "server",
                        message: error.constraints.join("\n"),
                    });
                });
            }

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Dog shelter management system creation failed.",
            });
        }
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create space for your dog shelter</DialogTitle>
                <DialogDescription>
                    Provide name for your dog shelter organization. Remember, you can only have 3 active dashboards for
                    your shelters.
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
                        <DialogClose>
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

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import createShelterSchema from "./components/createSchelterSchema";
import { Form } from "react-router-dom";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { BiLoaderCircle } from "react-icons/bi";
import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreateShelter = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createShelterSchema>>({
        resolver: zodResolver(createShelterSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof createShelterSchema>) => {};

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Create space for your dog shelter</AlertDialogTitle>
                <AlertDialogDescription>
                    Provide name for your dog shelter organization. Remember, you can only have 3 active dashboards for
                    your shelters.
                </AlertDialogDescription>
            </AlertDialogHeader>
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
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <BiLoaderCircle className="animate-spin" />}Create
                        </Button>
                    </AlertDialogFooter>
                </form>
            </Form>
        </AlertDialogContent>
    );
};

export default CreateShelter;

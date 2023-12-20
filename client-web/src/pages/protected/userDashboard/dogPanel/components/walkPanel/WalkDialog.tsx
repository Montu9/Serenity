import { useCreateWalkMutation, useGetAllWalksQuery } from "@/app/api/features/dogActions/walk/walkApiSlice";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { ActionDataTable } from "../actionDataTable/ActionDataTable";
import { columns } from "../actionDataTable/columns";
import useFetchError from "@/hooks/useFetchError";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import walkSchema from "./components/walkSchema";
import { useEffect } from "react";
import Walk from "@/app/api/features/dogActions/walk/entities/Walk";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/api/features/auth/authSlice";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BiLoaderCircle } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export const WalkDialog = () => {
    const caretaker = useSelector(selectCurrentUser);
    const { toast } = useToast();
    const { dogUuid } = useParams();
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error: getAllWalksError,
    } = useGetAllWalksQuery({ dogId: dogUuid || "" });
    const [createWalk, { isLoading: isLoadingWalk, error }] = useCreateWalkMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof walkSchema>>({
        resolver: zodResolver(walkSchema),
        defaultValues: {
            actionDate: new Date(),
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof walkSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof walkSchema>) => {
        console.log(values.actionDate);
        try {
            const createdWalk: Walk = await createWalk({
                data: {
                    actionDate: values.actionDate,
                    dogUuid: dogUuid || "",
                    caretakerUuid: caretaker.uuid || "",
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
                description: "Check your credentials and try again.",
            });
        }
    };

    let content;
    if (isLoading) {
        content = "Loading";
    } else if (isSuccess) {
        console.log(data);
        content = <ActionDataTable data={data} columns={columns} />;
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create space for your dog shelter</DialogTitle>
                <DialogDescription>
                    Provide name for your dog shelter organization. Remember, you can only have 3 active dashboards for
                    your shelters.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <FormField
                            control={form.control}
                            name="actionDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Walk Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-2" type="submit" disabled={isLoadingWalk}>
                            {isLoadingWalk && <BiLoaderCircle className="animate-spin" />}Register Walk
                        </Button>
                    </div>
                    {errMsg && errMsg?.length > 0 ? (
                        <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                    ) : (
                        ""
                    )}
                </form>
            </Form>
            {content}
        </DialogContent>
    );
};

import { selectCurrentUser } from "@/app/api/features/auth/authSlice";
import { useCreateWalkMutation, useGetAllWalksQuery } from "@/app/api/features/dogActions/walk/walkApiSlice";
import { CardSkeleton, LoadingError, NothingHere } from "@/components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { ActionDataTable } from "../actionDataTable/ActionDataTable";
import { columns } from "../actionDataTable/columns";
import walkSchema from "./components/walkSchema";

export const WalkDialog = () => {
    const caretaker = useSelector(selectCurrentUser);
    const { toast } = useToast();
    const { dogUuid } = useParams();
    const { data, isLoading, isSuccess, isError } = useGetAllWalksQuery({ dogId: dogUuid || "" });

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
        try {
            await createWalk({
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
        content = <CardSkeleton />;
    } else if (isSuccess) {
        content = data ? <ActionDataTable data={data} columns={columns} /> : <NothingHere />;
    } else if (isError) {
        content = <LoadingError />;
    }

    return (
        <DialogContent className="container max-w-2xl block">
            <DialogHeader>
                <DialogTitle className="text-xl flex items-center font-bold">Register new walk</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 w-full">
                <div className="w-full py-2">
                    <Tabs defaultValue="register" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="register">Register new walk</TabsTrigger>
                            <TabsTrigger value="list">Walk list</TabsTrigger>
                        </TabsList>
                        <TabsContent value="register">
                            <p className="px-2 py-4 text-sm text-justify leading-5 font-light">
                                You now have the ability to create new entries in the "Walk Log" by providing the date
                                of the walk. Simply select the date you'd like to share about the stroll.
                            </p>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-2 items-center">
                                        <FormField
                                            control={form.control}
                                            name="actionDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col col-span-2">
                                                    <FormLabel>Walk Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
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
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="col-span-2" type="submit" disabled={isLoadingWalk}>
                                            {isLoadingWalk && <BiLoaderCircle className="animate-spin" />}Register Walk
                                        </Button>
                                    </div>
                                    {errMsg && errMsg?.length > 0 ? (
                                        <small className="text-sm font-medium leading-none text-destructive">
                                            {errMsg}
                                        </small>
                                    ) : (
                                        ""
                                    )}
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="list">
                            <div>
                                <p className="px-2 py-4 text-sm text-justify leading-5 font-light">
                                    Here, you can find a comprehensive list detailing who took each dog on a walk and
                                    when. If you find an entry in the register that corresponds to your session, you
                                    have the ability to manage the log by deleting entries.
                                </p>
                                {content}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DialogContent>
    );
};

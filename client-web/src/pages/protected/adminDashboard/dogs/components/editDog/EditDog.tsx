import { useGetDogQuery, useUpdateDogMutation } from "@/app/api/features/dog/dogApiSlice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns/esm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useMatch } from "react-router-dom";
import * as z from "zod";
import { BreedSelect } from "../../../addNewDog/components/BreedSelect";
import { DogConditionSelect } from "../../../addNewDog/components/DogConditionSelect";
import { DogIntakeTypeSelect } from "../../../addNewDog/components/DogIntakeTypeSelect";
import { DogStatusSelect } from "../../../addNewDog/components/DogStatusSelect";
import { KennelSelect } from "../../../addNewDog/components/KennelSelect";
import { Dog } from "../dogSchema";
import editDogSchema from "./editDogSchema";

interface EditDogProps {
    dog: Dog;
}

export const EditDog = ({ dog }: EditDogProps) => {
    const { toast } = useToast();
    const match = useMatch("/dashboard/:id/:lastPart");
    const shelterUuid = match?.params.id || "";

    const { data, isLoadingDog, isSuccess, isError } = useGetDogQuery({ dogUuid: dog.uuid });

    const [updateDog, { isLoading, error }] = useUpdateDogMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof editDogSchema>>({
        resolver: zodResolver(editDogSchema),
        defaultValues: {
            name: data?.name || "",
            dateOfBirth: new Date(data?.dateOfBirth || new Date()),
            gender: data?.gender || "",
            microchip: data?.microchip || "",
            intakeDate: new Date(data?.intakeDate || new Date()),
            dogCondition: data?.dogCondition || "",
            breed: data?.breed.name || "",
            kennel: data?.kennel.uuid || "",
            dogStatus: data?.dogStatus || "",
            intakeType: data?.intake || "",
        },
    });

    useEffect(() => {
        const setFormValues = () => {
            form.setValue("name", data?.name || "");
            form.setValue("dateOfBirth", new Date(data?.dateOfBirth || new Date()));
            form.setValue("gender", data?.gender || "");
            form.setValue("microchip", data?.microchip || "");
            form.setValue("intakeDate", new Date(data?.intakeDate || new Date()));
            form.setValue("dogCondition", data?.dogCondition || "");
            form.setValue("breed", data?.breed.name || "");
            form.setValue("kennel", data?.kennel.uuid || "");
            form.setValue("dogStatus", data?.dogStatus || "");
            form.setValue("intakeType", data?.intake || "");
        };
        setFormValues();
    }, [data, form, isSuccess]);

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof editDogSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof editDogSchema>) => {
        try {
            await updateDog({
                dogUuid: dog.uuid,
                data: {
                    name: values.name,
                    dateOfBirth: values.dateOfBirth,
                    gender: values.gender, // select
                    microchip: values.microchip,
                    intakeDate: values.intakeDate,
                    dogCondition: values.dogCondition, //select
                    breed: values.breed, //select
                    kennel: values.kennel, // select
                    dogStatus: values.dogStatus, // select
                    intakeType: values.intakeType, //select
                },
            }).unwrap();

            toast({
                variant: "success",
                title: "You have created new kennel successfully!",
                description: "Your data has been saved securly!",
            });
        } catch (err: unknown) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Check your credentials and try again.",
            });
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-xl flex items-center font-bold">
                    Dog: {dog.name} <DotFilledIcon /> <span className="text-xs font-light">{dog.uuid}</span>
                </DialogTitle>
                <DialogDescription>
                    Provide name for your dog shelter organization. Remember, you can only have 3 active dashboards for
                    your shelters.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-4 gap-2 items-start py-8">
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Dog name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Bob" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* dateOfBirth */}
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem className="flex flex-col col-span-2">
                                    <FormLabel>Date of birth</FormLabel>
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
                                                        // format(parseISO(field.value), "PPP")
                                                        format(new Date(field.value), "PPP")
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
                        {/* gender */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Gender</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* microchip */}
                        <FormField
                            control={form.control}
                            name="microchip"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Microchip</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="E0239AS02311" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* intakeDate */}
                        <FormField
                            control={form.control}
                            name="intakeDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col col-span-2">
                                    <FormLabel>Intake Date</FormLabel>
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
                                                        format(new Date(field.value), "PPP")
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
                        {/* dogCondition */}
                        <DogConditionSelect className="col-span-2" />
                        {/* breed */}
                        <BreedSelect className="col-span-2" />
                        {/* kennel */}
                        <KennelSelect className="col-span-2" shelterUuid={shelterUuid} />
                        {/* dogStatus */}
                        <DogStatusSelect className="col-span-2" />
                        {/* intakeType */}
                        <DogIntakeTypeSelect className="col-span-2" />

                        <Button className="col-span-2" type="submit" disabled={isLoading}>
                            {isLoading && <BiLoaderCircle className="animate-spin" />}Create dog
                        </Button>
                    </div>
                    {errMsg && errMsg?.length > 0 ? (
                        <small className="text-sm font-medium leading-none text-destructive">{errMsg}</small>
                    ) : (
                        ""
                    )}
                </form>
            </Form>
        </>
    );
};

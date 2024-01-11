import { useCreateDogMutation } from "@/app/api/features/dog/dogApiSlice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useFetchError from "@/hooks/useFetchError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import format from "date-fns/format";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useMatch } from "react-router-dom";
import * as z from "zod";
import { BreedSelect } from "./BreedSelect";
import { DogConditionSelect } from "./DogConditionSelect";
import { DogIntakeTypeSelect } from "./DogIntakeTypeSelect";
import { DogStatusSelect } from "./DogStatusSelect";
import { KennelSelect } from "./KennelSelect";
import addNewDogSchema from "./addNewDogSchema";

export const AddNewDogForm = () => {
    const { toast } = useToast();
    const match = useMatch("/dashboard/:id/:lastPart");
    const shelterUuid = match?.params.id || "";

    const [createDog, { isLoading, error }] = useCreateDogMutation();
    const { errorMessage: errMsg, errorData } = useFetchError(error);

    const form = useForm<z.infer<typeof addNewDogSchema>>({
        resolver: zodResolver(addNewDogSchema),
        defaultValues: {
            name: "",
            dateOfBirth: new Date(),
            gender: "",
            microchip: "",
            intakeDate: new Date(),
            dogCondition: "",
            breed: "",
            kennel: "",
            dogStatus: "",
            intakeType: "",
        },
    });

    useEffect(() => {
        if (errorData) {
            errorData.map((error) => {
                form.setError(error.property as keyof z.infer<typeof addNewDogSchema>, {
                    type: "server",
                    message: error.constraints.join("\n"),
                });
            });
        }
    }, [errorData, form]);

    const onSubmit = async (values: z.infer<typeof addNewDogSchema>) => {
        try {
            await createDog({
                name: values.name,
                dateOfBirth: new Date(format(values.dateOfBirth!, "yyyy-MM-dd")),
                gender: values.gender, // select
                microchip: values.microchip,
                intakeDate: new Date(format(values.intakeDate!, "yyyy-MM-dd")),
                dogCondition: values.dogCondition, //select
                breed: values.breed, //select
                kennel: values.kennel, // select
                dogStatus: values.dogStatus, // select
                intakeType: values.intakeType, //select
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col gap-4">
                    {/* name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem className="flex flex-col">
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
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                                <FormDescription>
                                    Approximate date of dog birth used to calculate his age.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* gender */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange}>
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
                            <FormItem>
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
                            <FormItem className="flex flex-col">
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
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                                <FormDescription>The date when the dog came to the shelter</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* dogCondition */}
                    <DogConditionSelect />
                    {/* breed */}
                    <BreedSelect />
                    {/* kennel */}
                    <KennelSelect shelterUuid={shelterUuid} />
                    {/* dogStatus */}
                    <DogStatusSelect />
                    {/* intakeType */}
                    <DogIntakeTypeSelect />

                    <Button type="submit" disabled={isLoading}>
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
    );
};

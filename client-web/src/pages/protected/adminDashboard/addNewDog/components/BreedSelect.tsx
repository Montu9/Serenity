import { useGetAllbreedsQuery } from "@/app/api/features/common/breed/breedApiSlice";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";

export const BreedSelect = () => {
    const { control, setValue } = useFormContext();

    const { data: breeds, isLoading: isLoadingBreeds, isSuccess: isSuccessBreeds } = useGetAllbreedsQuery();

    return (
        <>
            {isLoadingBreeds && <div>Loading ...</div>}
            {isSuccessBreeds && (
                <>
                    <FormField
                        control={control}
                        name="breed"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Breed</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}>
                                                {field.value
                                                    ? breeds.find((breed) => breed.name === field.value)?.name
                                                    : "Select breed"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search language..." />
                                            <CommandEmpty>No language found.</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-72 w-48 rounded-md border">
                                                    {breeds.map((breed) => (
                                                        <CommandItem
                                                            value={breed.name}
                                                            key={breed.name}
                                                            onSelect={() => {
                                                                setValue("breed", breed.name);
                                                            }}>
                                                            <CheckIcon
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    breed.name === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {breed.name}
                                                        </CommandItem>
                                                    ))}
                                                </ScrollArea>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    This is the language that will be used in the dashboard.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}
        </>
    );
};

import { useGetAlldogConditionsQuery } from "@/app/api/features/common/dogCondition/dogConditionApiSlice";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export const DogConditionSelect = () => {
    const { control } = useFormContext();
    const {
        data: dogConditions,
        isLoading: isLoadingDogConditions,
        isSuccess: isSuccessDogConditions,
    } = useGetAlldogConditionsQuery();

    return (
        <>
            {isLoadingDogConditions && <div>Loading ...</div>}
            {isSuccessDogConditions && (
                <FormField
                    control={control}
                    name="dogCondition"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Dog condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a dog condition" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {dogConditions?.map((dogCondition) => (
                                        <SelectItem key={dogCondition.name} value={dogCondition.name}>
                                            {dogCondition.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </>
    );
};

import { useGetAllIntakeTypesQuery } from "@/app/api/features/common/intakeType/intakeTypeApiSlice";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export const DogIntakeTypeSelect = () => {
    const { control } = useFormContext();
    const {
        data: dogIntakeTypes,
        isLoading: isLoadingDogIntakeTypes,
        isSuccess: isSuccessDogIntakeTypes,
    } = useGetAllIntakeTypesQuery();

    return (
        <>
            {isLoadingDogIntakeTypes && <div>Loading ...</div>}
            {isSuccessDogIntakeTypes && (
                <FormField
                    control={control}
                    name="intakeType"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Intake Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a dog intake type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {dogIntakeTypes?.map((dogIntakeType) => (
                                        <SelectItem key={dogIntakeType.name} value={dogIntakeType.name}>
                                            {dogIntakeType.name}
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

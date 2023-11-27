import { useGetAlldogStatusesQuery } from "@/app/api/features/common/dogStatus/dogStatusApiSlice";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export const DogStatusSelect = () => {
    const { control } = useFormContext();

    const {
        data: dogStatuses,
        isLoading: isLoadingDogStatuses,
        isSuccess: isSuccessDogStatuses,
    } = useGetAlldogStatusesQuery();

    return (
        <>
            {isLoadingDogStatuses && <div>Loading ...</div>}
            {isSuccessDogStatuses && (
                <FormField
                    control={control}
                    name="dogStatus"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Dog Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a dog status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {dogStatuses?.map((dogStatus) => (
                                        <SelectItem key={dogStatus.name} value={dogStatus.name}>
                                            {dogStatus.name}
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

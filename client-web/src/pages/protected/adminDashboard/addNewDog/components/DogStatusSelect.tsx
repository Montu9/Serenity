import { useGetAlldogStatusesQuery } from "@/app/api/features/common/dogStatus/dogStatusApiSlice";
import { InputSkeleton } from "@/components";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface ChildProps {
    className?: string; // Optional className prop
}

export const DogStatusSelect: React.FC<ChildProps> = ({ className }) => {
    const { control } = useFormContext();

    const {
        data: dogStatuses,
        isLoading: isLoadingDogStatuses,
        isSuccess: isSuccessDogStatuses,
    } = useGetAlldogStatusesQuery();

    return (
        <div className={className}>
            {isLoadingDogStatuses && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(4)].map((_, index) => (
                        <InputSkeleton key={index} />
                    ))}
                </div>
            )}
            {isSuccessDogStatuses && (
                <FormField
                    control={control}
                    name="dogStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dog Status</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
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
        </div>
    );
};

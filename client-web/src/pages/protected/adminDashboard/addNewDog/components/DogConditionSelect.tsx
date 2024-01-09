import { useGetAlldogConditionsQuery } from "@/app/api/features/common/dogCondition/dogConditionApiSlice";
import { InputSkeleton } from "@/components";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface ChildProps {
    className?: string; // Optional className prop
}

export const DogConditionSelect: React.FC<ChildProps> = ({ className }) => {
    const { control } = useFormContext();
    const {
        data: dogConditions,
        isLoading: isLoadingDogConditions,
        isSuccess: isSuccessDogConditions,
    } = useGetAlldogConditionsQuery();

    return (
        <div className={className}>
            {isLoadingDogConditions && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(4)].map((_, index) => (
                        <InputSkeleton key={index} />
                    ))}
                </div>
            )}
            {isSuccessDogConditions && (
                <FormField
                    control={control}
                    name="dogCondition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dog condition</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
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
        </div>
    );
};

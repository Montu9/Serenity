import { useGetAllIntakeTypesQuery } from "@/app/api/features/common/intakeType/intakeTypeApiSlice";
import { InputSkeleton } from "@/components";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface ChildProps {
    className?: string; // Optional className prop
}

export const DogIntakeTypeSelect: React.FC<ChildProps> = ({ className }) => {
    const { control } = useFormContext();
    const {
        data: dogIntakeTypes,
        isLoading: isLoadingDogIntakeTypes,
        isSuccess: isSuccessDogIntakeTypes,
    } = useGetAllIntakeTypesQuery();

    return (
        <div className={className}>
            {isLoadingDogIntakeTypes && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(4)].map((_, index) => (
                        <InputSkeleton key={index} />
                    ))}
                </div>
            )}
            {isSuccessDogIntakeTypes && (
                <FormField
                    control={control}
                    name="intakeType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Intake Type</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
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
        </div>
    );
};

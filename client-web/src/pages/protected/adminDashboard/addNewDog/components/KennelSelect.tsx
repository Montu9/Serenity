import { useGetAllKennelsQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { InputSkeleton } from "@/components";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface KennelSelectPrep {
    className?: string;
    shelterUuid: string;
}

export const KennelSelect = ({ className, shelterUuid }: KennelSelectPrep) => {
    const { control } = useFormContext();

    const {
        data: kennels,
        isLoading: isLoadingKennels,
        isSuccess: isSuccessKennels,
    } = useGetAllKennelsQuery({ shelterUuid: shelterUuid });

    return (
        <div className={className}>
            {isLoadingKennels && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(4)].map((_, index) => (
                        <InputSkeleton key={index} />
                    ))}
                </div>
            )}
            {isSuccessKennels && (
                <FormField
                    control={control}
                    name="kennel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kennel</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a dog kennel" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {kennels?.map((kennel) => (
                                        <SelectItem key={kennel.uuid} value={kennel.uuid}>
                                            #{kennel.no}
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

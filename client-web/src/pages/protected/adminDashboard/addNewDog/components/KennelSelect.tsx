import { useGetAllKennelsQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface KennelSelectPrep {
    shelterUuid: string;
}

export const KennelSelect = ({ shelterUuid }: KennelSelectPrep) => {
    const { control } = useFormContext();

    const {
        data: kennels,
        isLoading: isLoadingKennels,
        isSuccess: isSuccessKennels,
    } = useGetAllKennelsQuery({ shelterUuid: shelterUuid });

    return (
        <>
            {isLoadingKennels && <div>Loading ...</div>}
            {isSuccessKennels && (
                <FormField
                    control={control}
                    name="kennel"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Kennel</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        </>
    );
};

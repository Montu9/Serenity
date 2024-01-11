import * as z from "zod";

const medicateSchema = z.object({
    actionDate: z
        .date({
            required_error: "Medicate date is required",
            invalid_type_error: "Medicate date must be a string",
        })
        .optional(),
});

export default medicateSchema;

import * as z from "zod";

const feedingSchema = z.object({
    actionDate: z
        .date({
            required_error: "Feeding date is required",
            invalid_type_error: "Feeding date must be a string",
        })
        .optional(),
});

export default feedingSchema;

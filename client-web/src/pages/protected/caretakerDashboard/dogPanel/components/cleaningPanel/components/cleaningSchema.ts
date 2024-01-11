import * as z from "zod";

const cleaningSchema = z.object({
    actionDate: z
        .date({
            required_error: "Cleaning date is required",
            invalid_type_error: "Cleaning date must be a string",
        })
        .optional(),
});

export default cleaningSchema;

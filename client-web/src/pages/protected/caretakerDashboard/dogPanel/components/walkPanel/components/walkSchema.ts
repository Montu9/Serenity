import * as z from "zod";

const walkSchema = z.object({
    actionDate: z
        .date({
            required_error: "Walk date is required",
            invalid_type_error: "Walk date must be a string",
        })
        .optional(),
});

export default walkSchema;

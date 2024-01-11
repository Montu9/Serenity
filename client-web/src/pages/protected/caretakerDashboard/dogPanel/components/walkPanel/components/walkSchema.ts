import * as z from "zod";

const walkSchema = z.object({
    actionDate: z
        .date({
            required_error: "Intake date is required",
            invalid_type_error: "Intake date must be a string",
        })
        .refine((date) => !!date, {
            message: "Intake date is required and must be a valid date.",
        })
        .optional(),
});

export default walkSchema;

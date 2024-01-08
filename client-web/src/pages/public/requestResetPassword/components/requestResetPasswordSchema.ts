import * as z from "zod";

const requestResetPasswordSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .trim()
        .min(3, { message: "Email is required" })
        .email("Email must be a valid email address"),
});

export default requestResetPasswordSchema;

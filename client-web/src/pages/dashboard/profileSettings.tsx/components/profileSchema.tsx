import * as z from "zod";

const profileSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .trim()
        .min(3, { message: "Email is required" })
        .email("Email must be a valid email address"),
    firstName: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .trim()
        .min(2, { message: "Firstname is required" }),
    lastName: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .trim()
        .min(2, { message: "Firstname is required" }),
    gender: z
        .string({ required_error: "Gender is required", invalid_type_error: "Email must be a string" })
        .trim()
        .min(1, { message: "Gender is required" }),
});

export default profileSchema;

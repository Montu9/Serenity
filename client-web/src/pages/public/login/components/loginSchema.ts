import * as z from "zod";

const loginSchema = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .trim()
            .min(1, { message: "Email is required" })
            .email("Email must be a valid email address"),
        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            })
            .trim()
            .min(4, { message: "Password is required" }),
    })
    .required();

export default loginSchema;

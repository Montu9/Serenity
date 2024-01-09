import * as z from "zod";

const loginSchema = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .trim()
            .min(3, { message: "Email must be at least 3 characters long" })
            .email("Email must be a valid email address"),
        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            })
            .trim()
            .min(4, { message: "Password must be at least 4 characters long" })
            .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), {
                message:
                    "Password should have at least 8 characters (upper, lower case letter, digits, and special characters).",
            }),
        passwordConfirm: z
            .string({
                required_error: "Password confirmation is required",
                invalid_type_error: "Password confirmation must be a string",
            })
            .trim()
            .min(4, { message: "Password confirmation must be at least 4 characters long" }),
        firstName: z
            .string({
                required_error: "First name is required",
                invalid_type_error: "First name must be a string",
            })
            .trim()
            .min(2, { message: "First name must be at least 2 characters long" }),
        lastName: z
            .string({
                required_error: "Last name is required",
                invalid_type_error: "Last name must be a string",
            })
            .trim()
            .min(2, { message: "Last name must be at least 2 characters long" }),
        gender: z
            .string({ required_error: "Gender is required", invalid_type_error: "Gender must be a string" })
            .trim()
            .min(1, { message: "Gender is required" }),
    })
    .required()
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
    });

export default loginSchema;

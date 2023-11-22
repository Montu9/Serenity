import * as z from "zod";

const loginSchema = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .trim()
            .min(3, { message: "Email is required" })
            .email("Email must be a valid email address"),
        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            })
            .trim()
            .min(4, { message: "Password is required" })
            .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), {
                message: "Password should have at least 8 characters (upper, lower case letter, digits and special).",
            }),
        passwordConfirm: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            })
            .trim()
            .min(4, { message: "Password is required" }),
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
    })
    .required()
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
    });

export default loginSchema;

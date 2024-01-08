import * as z from "zod";

const forgotPasswordSchema = z
    .object({
        newPassword: z
            .string({
                required_error: "New assword is required",
                invalid_type_error: "Password must be a string",
            })
            .trim()
            .min(4, { message: "New password is required" })
            .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), {
                message:
                    "New password should have at least 8 characters (upper, lower case letter, digits and special).",
            }),
        newPasswordConfirm: z
            .string({
                required_error: "Confirmation password is required",
                invalid_type_error: "Confirmation password must be a string",
            })
            .trim()
            .min(4, { message: "Confirmation password is required" }),
    })
    .required()
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
        message: "Passwords don't match",
        path: ["newPasswordConfirm"],
    });

export default forgotPasswordSchema;

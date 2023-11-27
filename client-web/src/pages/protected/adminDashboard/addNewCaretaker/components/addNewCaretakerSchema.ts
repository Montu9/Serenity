import * as z from "zod";

const addNewCaretakerSchema = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .trim()
            .min(1, { message: "Email is required" })
            .email("Email must be a valid email address"),
        role: z
            .string({
                required_error: "Role is required",
                invalid_type_error: "Role must be a string",
            })
            .trim()
            .min(1, { message: "Role is required" }),
    })
    .required();

export default addNewCaretakerSchema;

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
    })
    .required();

export default addNewCaretakerSchema;

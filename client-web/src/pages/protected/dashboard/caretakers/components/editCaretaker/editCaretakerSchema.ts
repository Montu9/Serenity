import * as z from "zod";

const editCaretakerSchema = z
    .object({
        role: z
            .string({ required_error: "Role is required", invalid_type_error: "Role must be a string" })
            .trim()
            .min(1, { message: "Role is required" }),
    })
    .required();

export default editCaretakerSchema;

import * as z from "zod";

const editKennelSchema = z
    .object({
        no: z.coerce
            .number({
                required_error: "Number is required",
                invalid_type_error: "Value must be numeric",
            })
            .positive()
            .min(1),
        desc: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string",
            })
            .trim()
            .min(5, { message: "Description is required" }),
    })
    .required();

export default editKennelSchema;

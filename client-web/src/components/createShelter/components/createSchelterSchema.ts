import * as z from "zod";

const createShelterSchema = z
    .object({
        name: z
            .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a string",
            })
            .trim()
            .min(4, { message: "Name is required" }),
        description: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string",
            })
            .trim()
            .min(4, { message: "Password is required" }),
    })
    .required();

export default createShelterSchema;

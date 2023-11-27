import * as z from "zod";

const editDogSchema = z
    .object({
        name: z
            .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a string",
            })
            .trim()
            .min(1, "Name is required and must be a string."),
        dateOfBirth: z
            .date({
                required_error: "Date of birth is required",
                invalid_type_error: "Date of birth must be a string",
            })
            .refine((date) => !!date, {
                message: "Date of birth is required and must be a valid date.",
            }),
        gender: z
            .string({
                required_error: "Gender is required",
                invalid_type_error: "Gender must be a string",
            })
            .trim()
            .min(1, "Gender is required and must be a string."),
        microchip: z
            .string({
                required_error: "Microchip is required",
                invalid_type_error: "Microchip must be a string",
            })
            .trim()
            .min(1, "Microchip is required and must be a string."),
        intakeDate: z
            .date({
                required_error: "Intake date is required",
                invalid_type_error: "Intake date must be a string",
            })
            .refine((date) => !!date, {
                message: "Intake date is required and must be a valid date.",
            }),
        dogCondition: z
            .string({
                required_error: "Dog condition is required",
                invalid_type_error: "Dog condition must be a string",
            })
            .trim()
            .min(1, "Dog condition is required and must be a string."),
        breed: z
            .string({
                required_error: "Breed is required",
                invalid_type_error: "Breed must be a string",
            })
            .trim()
            .min(1, "Breed is required and must be a string."),
        kennel: z
            .string({
                required_error: "Kennel is required",
                invalid_type_error: "Kennel must be a string",
            })
            .trim()
            .min(1, "Kennel is required and must be a string."),
        dogStatus: z
            .string({
                required_error: "Dog status is required",
                invalid_type_error: "Dog status must be a string",
            })
            .trim()
            .min(1, "Dog status is required and must be a string."),
        intakeType: z
            .string({
                required_error: "Intake type is required",
                invalid_type_error: "Intake type must be a string",
            })
            .trim()
            .min(1, "Intake type is required and must be a string."),
    })
    .required();

export default editDogSchema;

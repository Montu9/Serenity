import Kennel from "@/app/api/features/kennel/entities/Kennel";
import { Breed } from "@/app/api/features/common/breed/breedApiSlice";
import * as z from "zod";

export const dogSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    uuid: z.string(),
    dateOfBirth: z.date(),
    gender: z.string(),
    microchip: z.string(),
    intakeDate: z.date(),
    dogCondition: z.string(),
    breed: z.custom<Breed>(),
    kennel: z.custom<Kennel>(),
    dogStatus: z.string(),
    intake: z.string(),
});

export type Dog = z.infer<typeof dogSchema>;

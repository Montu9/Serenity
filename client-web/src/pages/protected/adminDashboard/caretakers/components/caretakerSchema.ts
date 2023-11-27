import * as z from "zod";

export const caretakerSchema = z.object({
    role: z.string(),
    uuid: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
});

export type Caretaker = z.infer<typeof caretakerSchema>;

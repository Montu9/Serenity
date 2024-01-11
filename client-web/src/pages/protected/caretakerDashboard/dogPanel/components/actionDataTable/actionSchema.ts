import Dog from "@/app/api/features/dog/entities/Dog";
import User from "@/app/api/features/user/entities/User";
import * as z from "zod";

export const actionSchema = z.object({
    date: z.date(),
    id: z.number(),
    user: z.custom<User>(),
    dog: z.custom<Dog>(),
});

export type DogAction = z.infer<typeof actionSchema>;

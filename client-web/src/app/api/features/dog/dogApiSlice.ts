import { apiSlice } from "../../apiSlice";
import CreateDogDto from "./dto/CreateDogDto";
import UpdateDogDto from "./dto/UpdateDogDto";
import Dog from "./entities/Dog";

interface DogPrep<DataType = unknown> {
    dogUuid: string;
    data?: DataType;
}

export const dogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDog: builder.mutation<Dog, CreateDogDto>({
            query: (data) => ({
                url: "/dogs",
                method: "POST",
                body: { ...data },
            }),
        }),
        // getDog: builder.query<Dog, KennelPrep>({
        //     query: ({ kennelUuid }) => ({ url: `kennels/${kennelUuid}` }),
        // }),
        updateDog: builder.mutation<Dog, DogPrep<UpdateDogDto>>({
            query: ({ dogUuid, data }) => ({
                url: `dogs/${dogUuid}`,
                method: "PATCH",
                body: { ...data },
            }),
        }),
        deleteDog: builder.mutation<Dog, DogPrep>({
            query: ({ dogUuid }) => ({
                url: `dogs/${dogUuid}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useCreateDogMutation, useDeleteDogMutation, useUpdateDogMutation } = dogApiSlice;

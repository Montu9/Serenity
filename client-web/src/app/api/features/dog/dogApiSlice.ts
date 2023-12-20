import { apiSlice } from "../../apiSlice";
import CreateDogDto from "./dto/CreateDogDto";
import UpdateDogDto from "./dto/UpdateDogDto";
import Dog from "./entities/Dog";

interface DogPrep<DataType = unknown> {
    dogUuid: string;
    data?: DataType;
    shelterUuid?: string;
}

export const dogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDog: builder.mutation<Dog, CreateDogDto>({
            query: (data) => ({
                url: "/dogs",
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: ["Dog"],
        }),
        getDog: builder.query<Dog, DogPrep>({
            query: ({ dogUuid }) => ({ url: `dogs/${dogUuid}` }),
        }),
        updateDog: builder.mutation<Dog, DogPrep<UpdateDogDto>>({
            query: ({ dogUuid, data }) => ({
                url: `dogs/${dogUuid}`,
                method: "PATCH",
                body: { ...data },
            }),
            invalidatesTags: ["Dog"],
        }),
        deleteDog: builder.mutation<Dog, DogPrep>({
            query: ({ dogUuid }) => ({
                url: `dogs/${dogUuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Dog"],
        }),
    }),
});

export const { useGetDogQuery, useLazyGetDogQuery, useCreateDogMutation, useDeleteDogMutation, useUpdateDogMutation } =
    dogApiSlice;

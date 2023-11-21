import { apiSlice } from "@/app/api/apiSlice";
import CreateShelterDto from "@/types/CreateShelterDto";
import UserShelterDto from "@/types/UserShelterDto";

export const shelterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserSchelters: builder.query<UserShelterDto[], void>({
            query: () => "/shelters/getUserShelters",
            keepUnusedDataFor: 5,
        }),
        createShelter: builder.mutation<CreateShelterDto, CreateShelterDto>({
            query: (credentials) => ({
                url: "/shelters",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useGetUserScheltersQuery, useCreateShelterMutation } = shelterApiSlice;

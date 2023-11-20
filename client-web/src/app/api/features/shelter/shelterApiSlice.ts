import { apiSlice } from "@/app/api/apiSlice";
import UserShelterDto from "@/types/UserShelterDto";

export const shelterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserSchelters: builder.query<UserShelterDto[], void>({
            query: () => "/shelters/getUserShelters",
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetUserScheltersQuery } = shelterApiSlice;

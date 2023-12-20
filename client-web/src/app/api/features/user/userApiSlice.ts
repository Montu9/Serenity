import UserShelterDto from "@/app/api/features/user/dto/UserShelterDto";
import UpdatePasswordDto from "@/app/api/features/user/dto/UpdatePasswordDto";
import { apiSlice } from "../../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserSchelters: builder.query<UserShelterDto[], void>({
            query: () => "/users/getUserShelters",
            keepUnusedDataFor: 5,
        }),
        updatePassword: builder.mutation<string, UpdatePasswordDto>({
            query: (credential) => ({
                url: "/users/password",
                method: "PATCH",
                body: { ...credential },
            }),
        }),
    }),
});

export const { useGetUserScheltersQuery, useLazyGetUserScheltersQuery, useUpdatePasswordMutation } = userApiSlice;

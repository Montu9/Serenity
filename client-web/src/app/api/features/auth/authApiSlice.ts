import { apiSlice } from "@/app/api/apiSlice";

import Login from "@/types/Login";
import Register from "@/types/Register";
import Tokens from "@/types/Tokens";
import User from "@/types/User";

interface UserLoginDto {
    tokens: Tokens;
    userEntity: User;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserLoginDto, Login>({
            query: (credentials) => ({
                url: "/auth/signin",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        register: builder.mutation<string, Register>({
            query: (credentials) => ({
                url: "/auth/signup",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.query<void, void>({
            query: () => "/auth/logout",
        }),
        getUser: builder.query<User, void>({
            query: () => "/users",
        }),
        updateUser: builder.mutation<User, Partial<Register>>({
            query: (credential) => ({
                url: "/users",
                method: "PATCH",
                body: { ...credential },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyLogoutQuery,
    useLogoutQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} = authApiSlice;

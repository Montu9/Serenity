import { apiSlice } from "@/app/api/apiSlice";

import Login from "@/app/api/features/auth/dto/Login";
import Register from "@/app/api/features/auth/dto/Register";
import Tokens from "@/app/api/features/auth/entities/Tokens";
import UpdateUser from "@/app/api/features/auth/dto/UpdateUser";
import User from "@/app/api/features/user/entities/User";

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
        logout: builder.query<string, void>({
            query: () => "/auth/logout",
        }),
        getUser: builder.query<User, void>({
            query: () => "/users",
        }),
        updateUser: builder.mutation<User, UpdateUser>({
            query: (credential) => ({
                url: "/users",
                method: "PATCH",
                body: { ...credential },
            }),
        }),
        deleteUser: builder.mutation<User, void>({
            query: () => ({
                url: "/users",
                method: "DELETE",
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

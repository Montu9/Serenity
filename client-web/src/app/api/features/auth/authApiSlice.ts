import { apiSlice } from "@/app/api/apiSlice";

import Login from "@/app/api/features/auth/dto/Login";
import Register from "@/app/api/features/auth/dto/Register";
import UpdateUser from "@/app/api/features/auth/dto/UpdateUser";
import User from "@/app/api/features/user/entities/User";
import ResetPasswordDto from "./dto/ResetPasswordDto";
import RequestResetPasswordDto from "./dto/RequestResetPasswordSchema";

interface UserLoginDto {
    accessToken: string;
    userEntity: User;
}

interface ResetPasswordPrep<DataType> {
    confirmationToken: string;
    email: string;
    data: DataType;
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
        requestPasswordReset: builder.mutation<string, RequestResetPasswordDto>({
            query: (credential) => ({
                url: "/auth/password-reset",
                method: "POST",
                body: { ...credential },
            }),
        }),
        passwordReset: builder.mutation<string, ResetPasswordPrep<ResetPasswordDto>>({
            query: ({ confirmationToken, email, data }) => ({
                url: `/auth/password-reset/${confirmationToken}/${email}`,
                method: "PATCH",
                body: { ...data },
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
    usePasswordResetMutation,
    useRequestPasswordResetMutation,
    useDeleteUserMutation,
    useLazyGetUserQuery,
} = authApiSlice;

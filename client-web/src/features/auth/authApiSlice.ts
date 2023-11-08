import { apiSlice } from "@/app/api/apiSlice";

import Login from "@/types/Login";
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
    }),
});

export const { useLoginMutation } = authApiSlice;

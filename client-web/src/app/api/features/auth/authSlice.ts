import { type RootState } from "@/app/store";
import User from "@/app/api/features/user/entities/User";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AccessToken from "./entities/AccessToken";

interface Auth {
    user: User;
    accessToken: string;
}

const initialState: Auth = {
    user: {} as User,
    accessToken: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<Auth>) => {
            state.user = action.payload.user as User;
            state.accessToken = action.payload.accessToken;
        },
        setTokens: (state, action: PayloadAction<AccessToken>) => {
            console.log(action.payload);
            state.accessToken = action.payload.accessToken;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload as User;
        },
        logOut: (state) => {
            state.user = {} as User;
            state.accessToken = "";
        },
    },
});

export const { setCredentials, setTokens, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;

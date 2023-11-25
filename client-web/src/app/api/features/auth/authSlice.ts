import { type RootState } from "@/app/store";
import User from "@/app/api/features/user/entities/User";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    user: User;
    accessToken: string;
    refreshToken: string;
}
interface Tokens {
    accessToken: string;
    refreshToken: string;
}

const initialState: Auth = {
    user: {} as User,
    accessToken: "",
    refreshToken: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<Auth>) => {
            state.user = action.payload.user as User;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setTokens: (state, action: PayloadAction<Tokens>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload as User;
        },
        logOut: (state) => {
            state.user = {} as User;
            state.accessToken = "";
            state.refreshToken = "";
        },
    },
});

export const { setCredentials, setTokens, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;

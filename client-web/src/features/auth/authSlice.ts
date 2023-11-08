import User from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

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
        logOut: (state) => {
            state.user = {} as User;
            state.accessToken = "";
            state.refreshToken = "";
        },
    },
});

export const { setCredentials, setTokens, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;

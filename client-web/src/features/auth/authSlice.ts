import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        setCredentials: (state, action) => {},
    },
});

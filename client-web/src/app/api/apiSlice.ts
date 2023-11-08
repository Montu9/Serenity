import {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setTokens } from "@/features/auth/authSlice";
import { RootState } from "../store";
import { Mutex } from "async-mutex";
import Tokens from "@/types/Tokens";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
        const accessToken: string = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const refreshBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
        const refreshToken: string = (getState() as RootState).auth.refreshToken;
        if (refreshToken) {
            headers.set("Authorization", `Bearer ${refreshToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: { shout?: boolean }
) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await refreshBaseQuery("/auth/refresh", api, extraOptions);
                if (refreshResult.data) {
                    api.dispatch(setTokens(refreshResult.data as Tokens));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logOut());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

import {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Mutex } from "async-mutex";
import AccessToken from "@/app/api/features/auth/entities/AccessToken";
import { logOut, setTokens } from "./features/auth/authSlice";

const BASE_URL = "http://localhost:3001";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const accessToken: string = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const refreshBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
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
                console.log(refreshResult);
                if (refreshResult.data) {
                    api.dispatch(setTokens(refreshResult.data as AccessToken));
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
    tagTypes: ["Dog", "Kennel", "Shelter", "Caretaker", "Walk", "Cleaning", "Medicate", "Feeding"],
    refetchOnMountOrArgChange: 30,
    endpoints: () => ({}),
});

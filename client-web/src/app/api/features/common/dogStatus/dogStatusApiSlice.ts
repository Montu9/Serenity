import { apiSlice } from "../../../apiSlice";

export interface DogStatus {
    name: string;
}

export const dogStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAlldogStatuses: builder.query<DogStatus[], void>({
            query: () => "/dogStatuses",
        }),
    }),
});

export const { useGetAlldogStatusesQuery, useLazyGetAlldogStatusesQuery } = dogStatusApiSlice;

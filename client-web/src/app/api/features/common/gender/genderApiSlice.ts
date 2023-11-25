import { apiSlice } from "../../../apiSlice";

export interface Gender {
    name: string;
}

export const genderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGenders: builder.query<Gender[], void>({
            query: () => "/genders",
        }),
    }),
});

export const { useGetAllGendersQuery, useLazyGetAllGendersQuery } = genderApiSlice;

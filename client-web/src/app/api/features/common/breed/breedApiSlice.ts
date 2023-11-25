import { apiSlice } from "../../../apiSlice";

export interface Breed {
    url: string;
    image: string;
    pdf: string;
    name: string;
}

export const breedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllbreeds: builder.query<Breed[], void>({
            query: () => "/breeds",
        }),
    }),
});

export const { useGetAllbreedsQuery, useLazyGetAllbreedsQuery } = breedApiSlice;

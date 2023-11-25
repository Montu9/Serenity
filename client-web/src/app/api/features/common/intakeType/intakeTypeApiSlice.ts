import { apiSlice } from "../../../apiSlice";

export interface IntakeType {
    name: string;
}

export const intakeTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllIntakeTypes: builder.query<IntakeType[], void>({
            query: () => "/intakeTypes",
        }),
    }),
});

export const { useGetAllIntakeTypesQuery, useLazyGetAllIntakeTypesQuery } = intakeTypeApiSlice;

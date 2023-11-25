import { apiSlice } from "../../../apiSlice";

export interface DogCondition {
    name: string;
}

export const dogConditionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAlldogConditions: builder.query<DogCondition[], void>({
            query: () => "/dogConditions",
        }),
    }),
});

export const { useGetAlldogConditionsQuery, useLazyGetAlldogConditionsQuery } = dogConditionApiSlice;

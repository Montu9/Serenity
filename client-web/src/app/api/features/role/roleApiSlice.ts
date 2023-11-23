import { apiSlice } from "../../apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query<{ name: string }[], void>({
            query: () => "/role",
        }),
    }),
});

export const { useGetAllRolesQuery } = roleApiSlice;

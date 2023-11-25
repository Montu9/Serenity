import { apiSlice } from "../../../apiSlice";

export interface Role {
    name: string;
}

export const roleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query<Role[], void>({
            query: () => "/role",
        }),
    }),
});

export const { useGetAllRolesQuery, useLazyGetAllRolesQuery } = roleApiSlice;

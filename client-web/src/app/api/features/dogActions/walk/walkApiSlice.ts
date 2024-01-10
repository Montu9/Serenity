import { apiSlice } from "@/app/api/apiSlice";
import Walk from "./entities/Walk";
import CreateWalkDto from "./dto/CreateWalkDto";
import UpdateWalkDto from "./dto/UpdateWalkDto";

interface WalkPrep<DataType = unknown> {
    actionId?: number;
    dogId?: string;
    data?: DataType;
}

export const walkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createWalk: builder.mutation<Walk, WalkPrep<CreateWalkDto>>({
            query: ({ data }) => ({
                url: `walks`,
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: ["Walk"],
        }),
        getWalk: builder.query<Walk, WalkPrep>({
            query: ({ actionId }) => ({ url: `/walks/${actionId}` }),
            providesTags: ["Walk"],
        }),
        getAllWalks: builder.query<Walk[], WalkPrep>({
            query: ({ dogId }) => ({ url: `/dogs/${dogId}/walks` }),
            providesTags: ["Walk"],
        }),
        updateWalk: builder.mutation<Walk, WalkPrep<UpdateWalkDto>>({
            query: ({ actionId, data }) => ({
                url: `walks/${actionId}`,
                method: "PATCH",
                body: { ...data },
            }),
            invalidatesTags: ["Walk"],
        }),
        deleteWalk: builder.mutation<Walk, WalkPrep>({
            query: ({ actionId }) => ({
                url: `walks/${actionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Walk"],
        }),
    }),
});

export const {
    useCreateWalkMutation,
    useDeleteWalkMutation,
    useGetWalkQuery,
    useLazyGetWalkQuery,
    useUpdateWalkMutation,
    useGetAllWalksQuery,
    useLazyGetAllWalksQuery,
} = walkApiSlice;

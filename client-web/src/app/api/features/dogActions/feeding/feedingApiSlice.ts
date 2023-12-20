import { apiSlice } from "@/app/api/apiSlice";
import Feeding from "./entities/Feeding";
import CreateFeedingDto from "./dto/CreateFeedingDto";
import UpdateFeedingDto from "./dto/UpdateFeedingDto";

interface FeedingPrep<DataType = unknown> {
    actionId?: number;
    dogId?: string;
    data?: DataType;
}

export const feedingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createFeeding: builder.mutation<Feeding, FeedingPrep<CreateFeedingDto>>({
            query: ({ data }) => ({
                url: `feedings`,
                method: "POST",
                body: { ...data },
            }),
        }),
        getFeeding: builder.query<Feeding, FeedingPrep>({
            query: ({ actionId }) => ({ url: `/feedings/${actionId}` }),
        }),
        getAllFeedings: builder.query<Feeding[], FeedingPrep>({
            query: ({ dogId }) => ({ url: `/gods/${dogId}/getALlFeedings` }),
        }),
        updateFeeding: builder.mutation<Feeding, FeedingPrep<UpdateFeedingDto>>({
            query: ({ actionId, data }) => ({
                url: `feedings/${actionId}`,
                method: "PATCH",
                body: { ...data },
            }),
        }),
        deleteFeeding: builder.mutation<Feeding, FeedingPrep>({
            query: ({ actionId }) => ({
                url: `feedings/${actionId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateFeedingMutation,
    useDeleteFeedingMutation,
    useUpdateFeedingMutation,
    useGetFeedingQuery,
    useLazyGetFeedingQuery,
    useGetAllFeedingsQuery,
    useLazyGetAllFeedingsQuery,
} = feedingApiSlice;

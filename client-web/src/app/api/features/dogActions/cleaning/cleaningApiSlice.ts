import { apiSlice } from "@/app/api/apiSlice";
import Cleaning from "./entities/Cleaning";
import CreateCleaningDto from "./dto/CreateCleaningDto";
import UpdateCleaningDto from "./dto/UpdateCleaningDto";

interface CleaningPrep<DataType = unknown> {
    actionId?: number;
    dogId?: string;
    data?: DataType;
}

export const cleaningApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCleaning: builder.mutation<Cleaning, CleaningPrep<CreateCleaningDto>>({
            query: ({ data }) => ({
                url: `cleanings`,
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: ["Cleaning"],
        }),
        getCleaning: builder.query<Cleaning, CleaningPrep>({
            query: ({ actionId }) => ({ url: `/cleanings/${actionId}` }),
            providesTags: ["Cleaning"],
        }),
        getAllCleanings: builder.query<Cleaning[], CleaningPrep>({
            query: ({ dogId }) => ({ url: `/dogs/${dogId}/cleanings` }),
            providesTags: ["Cleaning"],
        }),
        updateCleaning: builder.mutation<Cleaning, CleaningPrep<UpdateCleaningDto>>({
            query: ({ actionId, data }) => ({
                url: `cleanings/${actionId}`,
                method: "PATCH",
                body: { ...data },
            }),
            invalidatesTags: ["Cleaning"],
        }),
        deleteCleaning: builder.mutation<Cleaning, CleaningPrep>({
            query: ({ actionId }) => ({
                url: `cleanings/${actionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cleaning"],
        }),
    }),
});

export const {
    useCreateCleaningMutation,
    useUpdateCleaningMutation,
    useDeleteCleaningMutation,
    useGetCleaningQuery,
    useLazyGetCleaningQuery,
    useGetAllCleaningsQuery,
    useLazyGetAllCleaningsQuery,
} = cleaningApiSlice;

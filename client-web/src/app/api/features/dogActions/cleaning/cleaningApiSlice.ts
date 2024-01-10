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
        }),
        getCleaning: builder.query<Cleaning, CleaningPrep>({
            query: ({ actionId }) => ({ url: `/cleanings/${actionId}` }),
        }),
        getAllCleanings: builder.query<Cleaning[], CleaningPrep>({
            query: ({ dogId }) => ({ url: `/dogs/${dogId}/cleanings` }),
        }),
        updateCleaning: builder.mutation<Cleaning, CleaningPrep<UpdateCleaningDto>>({
            query: ({ actionId, data }) => ({
                url: `cleanings/${actionId}`,
                method: "PATCH",
                body: { ...data },
            }),
        }),
        deleteCleaning: builder.mutation<Cleaning, CleaningPrep>({
            query: ({ actionId }) => ({
                url: `cleanings/${actionId}`,
                method: "DELETE",
            }),
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

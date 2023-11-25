import { apiSlice } from "../../apiSlice";
import CreateKennelDto from "./dto/CreateKennelDto";
import UpdateKennelDto from "./dto/UpdateKennelDto";
import Kennel from "./entities/Kennel";

interface KennelPrep<DataType = unknown> {
    kennelUuid: string;
    data?: DataType;
}

export const kennelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createKennel: builder.mutation<Kennel, CreateKennelDto>({
            query: (data) => ({
                url: "/kennels",
                method: "POST",
                body: { ...data },
            }),
        }),
        getKennel: builder.query<Kennel, KennelPrep>({
            query: ({ kennelUuid }) => ({ url: `kennels/${kennelUuid}` }),
        }),
        updateKennel: builder.mutation<Kennel, KennelPrep<UpdateKennelDto>>({
            query: ({ kennelUuid, data }) => ({
                url: `kennels/${kennelUuid}`,
                method: "PATCH",
                body: { ...data },
            }),
        }),
        deleteKennel: builder.mutation<Kennel, KennelPrep>({
            query: ({ kennelUuid }) => ({
                url: `kennels/${kennelUuid}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateKennelMutation,
    useDeleteKennelMutation,
    useGetKennelQuery,
    useLazyGetKennelQuery,
    useUpdateKennelMutation,
} = kennelApiSlice;

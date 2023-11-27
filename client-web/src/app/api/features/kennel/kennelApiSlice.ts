import { apiSlice } from "../../apiSlice";
import Dog from "../dog/entities/Dog";
import CreateKennelDto from "./dto/CreateKennelDto";
import UpdateKennelDto from "./dto/UpdateKennelDto";
import Kennel from "./entities/Kennel";

interface KennelPrep<DataType = unknown> {
    shelterUuid?: string;
    kennelUuid?: string;
    data?: DataType;
}

export const kennelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createKennel: builder.mutation<Kennel, KennelPrep<CreateKennelDto>>({
            query: ({ shelterUuid, data }) => ({
                url: `/kennels/${shelterUuid}`,
                method: "POST",
                body: { ...data },
            }),
        }),
        getKennel: builder.query<Kennel, KennelPrep>({
            query: ({ kennelUuid }) => ({ url: `kennels/${kennelUuid}` }),
        }),
        getAllDogsInKennel: builder.query<Dog[], KennelPrep>({
            query: ({ kennelUuid }) => ({ url: `kennels/getAllDogs/${kennelUuid}` }),
            providesTags: ["Dog"],
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
    useGetAllDogsInKennelQuery,
    useLazyGetAllDogsInKennelQuery,
} = kennelApiSlice;

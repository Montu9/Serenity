import { apiSlice } from "@/app/api/apiSlice";
import AddCaretakerByEmail from "@/types/AddCaretakerByEmailDto";
import CreateShelterDto from "@/types/CreateShelterDto";
import GetAllCaretakers from "@/types/GetAllCaretakersDto";
import UpdateCaretakerRole from "@/types/UpdateCaretakerRoleDto";
import UserShelterDto from "@/types/UserShelterDto";

export const shelterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserSchelters: builder.query<UserShelterDto[], void>({
            query: () => "/shelters/getUserShelters",
            keepUnusedDataFor: 5,
        }),
        createShelter: builder.mutation<CreateShelterDto, CreateShelterDto>({
            query: (credentials) => ({
                url: "/shelters",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        getAllCaretakers: builder.query<GetAllCaretakers[], string>({
            query: (uuid) => ({ url: `/shelters/getAllCaretakers/${uuid}` }),
        }),
        addCaretakerByEmail: builder.mutation<void, { credentials: AddCaretakerByEmail; id: string }>({
            query: ({ credentials, id }) => ({
                url: `/shelters/addCaretakerByEmail/${id}`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        updateCaretakerRole: builder.mutation<void, { data: UpdateCaretakerRole; id: string }>({
            query: ({ data, id }) => ({
                url: `/shelters/${id}/updateCaretakerRole`,
                method: "POST",
                body: { ...data },
            }),
        }),
        removeCaretakerByUuid: builder.mutation<void, { id: string; uuid: string }>({
            query: ({ id, uuid }) => ({
                url: `/shelters/${id}/removeCaretakerByEmail/${uuid}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useAddCaretakerByEmailMutation,
    useGetUserScheltersQuery,
    useCreateShelterMutation,
    useGetAllCaretakersQuery,
    useUpdateCaretakerRoleMutation,
    useLazyGetAllCaretakersQuery,
    useRemoveCaretakerByUuidMutation,
} = shelterApiSlice;

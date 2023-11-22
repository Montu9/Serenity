import { apiSlice } from "@/app/api/apiSlice";
import AddCaretakerByEmail from "@/types/AddCaretakerByEmailDto";
import CreateShelterDto from "@/types/CreateShelterDto";
import GetAllCaretakers from "@/types/GetAllCaretakersDto";
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
    }),
});

export const {
    useAddCaretakerByEmailMutation,
    useGetUserScheltersQuery,
    useCreateShelterMutation,
    useGetAllCaretakersQuery,
} = shelterApiSlice;

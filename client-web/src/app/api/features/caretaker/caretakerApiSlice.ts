import Caretaker from "@/app/api/features/caretaker/entities/Caretaker";
import { apiSlice } from "../../apiSlice";
import AddCaretakerByEmail from "./dto/AddCaretakerByEmailDto";
import UpdateCaretakerRole from "./dto/UpdateCaretakerRoleDto";

interface CaretakerPrep<DataType = unknown> {
    caretakerUuid?: string;
    shelterUuid: string;
    data?: DataType;
}

export const caretakerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCaretakerByEmail: builder.mutation<void, CaretakerPrep<AddCaretakerByEmail>>({
            query: ({ shelterUuid, data }) => ({
                url: `/caretakers/${shelterUuid}`,
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: ["Caretaker"],
        }),
        getByUuid: builder.query<Caretaker[], CaretakerPrep>({
            query: ({ shelterUuid, caretakerUuid }) => ({
                url: `/caretakers/${caretakerUuid}/getByUuid/${shelterUuid}`,
            }),
        }),
        updateCaretakerRole: builder.mutation<string, CaretakerPrep<UpdateCaretakerRole>>({
            query: ({ caretakerUuid, shelterUuid, data }) => ({
                url: `/caretakers/${caretakerUuid}/updateByUuid/${shelterUuid}`,
                method: "PATCH",
                body: { ...data },
            }),
            invalidatesTags: ["Caretaker"],
        }),
        removeCaretakerByUuid: builder.mutation<string, CaretakerPrep>({
            query: ({ caretakerUuid, shelterUuid }) => ({
                url: `/caretakers/${caretakerUuid}/removeByUuid/${shelterUuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Caretaker"],
        }),
    }),
});

export const {
    useAddCaretakerByEmailMutation,
    useGetByUuidQuery,
    useLazyGetByUuidQuery,
    useRemoveCaretakerByUuidMutation,
    useUpdateCaretakerRoleMutation,
} = caretakerApiSlice;

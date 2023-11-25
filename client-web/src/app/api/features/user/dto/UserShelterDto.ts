interface UserShelterDto {
    role: {
        name: string;
    };
    shelter: {
        name: string;
        uuid: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
export default UserShelterDto;

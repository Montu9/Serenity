interface UserShelter {
  role: {
    name: string;
  };
  Shelter: {
    name: string;
    uuid: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export class GetUserShelters {
  shelters: UserShelter[];
}

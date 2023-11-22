interface ShelterCaretaker {
  role: {
    name: string;
  };
  User: {
    uuid: string;
    email: string;
    firstname: string;
    lastName: string;
    gender: {
      name: string;
    };
  };
}

export class GetAllCaretakers {
  shelters: ShelterCaretaker[];
}

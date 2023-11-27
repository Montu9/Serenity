import { Breed } from "../../common/breed/breedApiSlice";
import Kennel from "../../kennel/entities/Kennel";

interface Dog {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    uuid: string;
    dateOfBirth: Date;
    gender: string;
    microchip: string;
    intakeDate: Date;
    dogCondition: string;
    breed: Breed;
    kennel: Kennel;
    dogStatus: string;
    intake: string;
}

export default Dog;

import Dog from "../../../dog/entities/Dog";
import User from "../../../user/entities/User";

interface Walk {
    id: number;
    date: Date;
    dog: Dog;
    user: User;
}

export default Walk;

interface User {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: { name: string };
}

export default User;

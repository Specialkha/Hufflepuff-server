export class User {
    _id?: string;
    name: string;
    firstName: string;
    email: string;
    phone: {
        mobile: string;
        work: string;
    }
}
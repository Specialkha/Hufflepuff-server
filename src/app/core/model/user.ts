export class User {
    _id?: string;
    genre: string;
    lastName: string;
    firstName: string;
    email: string;
    mobile?: string;
    phone?: string;
    password: string;
    adress?: string;
    zipCode?: number;
    city?: string;
    adminLevel: string;
    blogsId?: string[];
    postsId?: string[];
    commentsId?: string[];
}
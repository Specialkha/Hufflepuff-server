import { Post } from "./post";
import { User } from "./user";

export class Blog {
    _id?: string;
    authorId: string;
    title: string;
    content: string;
    posts?: Post[];
}

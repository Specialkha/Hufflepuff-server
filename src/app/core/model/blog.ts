import { Post } from "./post";

export class Blog {
    _id?: string;
    authorId?: string;
    title: string;
    content: string;
    posts?: Post[];
}

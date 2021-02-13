import { Comment } from "./comment";

export class Post {
    _id?: string;
    author: string;
    title: string;
    content: string;
    date?: Date;
    comments?: Comment[]
}
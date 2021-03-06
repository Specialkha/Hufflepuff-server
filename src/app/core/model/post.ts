import { Comment } from "./comment";

export class Post {
    _id?: string;
    title: string;
    content: string;
    date?: Date;
    comments?: Comment[];
}

export class Comment {
    _id?: string;
    author: string;
    content: string;
    date?: Date;
    comment?: Comment[];
}
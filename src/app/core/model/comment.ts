export class Comment {
    _id?: string;
    author: string;
    authorId:string;
    content: string;
    date?: Date;
    comment?: Comment[];
}

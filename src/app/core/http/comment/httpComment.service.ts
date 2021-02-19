import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCommentService {

  private API_URL = '/api';

  constructor(private http: HttpClient) { }

  //create a post in a blog
  createComment(blogId: string, postId: string, commentId: string, payload: any) {
    return this.http.post(this.API_URL + "/blog/" + blogId + "/post/" + postId + "/comment/" + commentId, payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCommentService {

  private API_URL = '/api';

  constructor(private http: HttpClient) { }

  //create a post in a blog
  createComment(blogId: string, postId: string, payload: any) {
    return this.http.put(this.API_URL + "/blogs/" + blogId + "/post/" + postId + "/comment", payload);
  }

  getComment(blogId: string, postId: string) {
    return this.http.get(this.API_URL + '/blogs/' + blogId + '/post/' + postId + '/comment');
  }
}

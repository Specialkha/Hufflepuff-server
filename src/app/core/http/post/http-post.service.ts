import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../model/post';

@Injectable({
  providedIn: 'root'
})
export class HttpPostService {

  private API_URL = '/api/post/';

  constructor(private http: HttpClient) { }

  //create a post in a blog
  createPostInBlog(blogId: string, payload: any) {
    return this.http.post(this.API_URL + blogId, payload);
  }

  // get a post from userId
  getSinglePost(blogId: string, postId: string) {
    return this.http.get('/api/blogs/' + blogId + "/post/" + postId);
  }

  updatePost(blogId: string, postId: string, payload: Post) {
    return this.http.put('/api/blogs/' + blogId + "/post/" + postId, payload);
  }
}

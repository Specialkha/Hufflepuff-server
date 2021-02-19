import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../../model/blog';

@Injectable({
  providedIn: 'root'
})
export class HttpBlogService {

  private API_URL = '/api/blogs';

  constructor(private http: HttpClient) { }

  // get("/api/Blogs")
  getBlogs() {
    return this.http.get<Blog[]>(this.API_URL);
  }

  // post("/api/Blogs")
  createNewBlog(newBlog: Blog) {
    return this.http.post(this.API_URL, newBlog);
  }

  // get a blog from userId
  getSingleBlog(blogId: string) {
    return this.http.get(this.API_URL + '/' + blogId);
  }

  // delete("/api/Blogs/:id")
  deleteBlog(delBlogId: String): Promise<void | String> {
    return this.http.delete(this.API_URL + '/' + delBlogId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  // put("/api/Blogs/:id")
  updateBlog(putBlog: Blog): Promise<void | Blog> {
    var putUrl = this.API_URL + '/' + putBlog._id;
    return this.http.put(putUrl, putBlog)
      .toPromise()
      .then(response => response as Blog)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

 
}

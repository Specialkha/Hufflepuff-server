import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../../model/blog';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_URL = '/api';

  constructor(private http: HttpClient) { }

  // get("/api/Blogs")
  getBlogs(): Promise<Blog[]> {
    return this.http.get<Blog[]>(this.API_URL + "/Blogs").toPromise();
  }


  // post("/api/Blogs")
  createNewBlog(newBlog: Blog): Promise<void | Blog> {
    return this.http.post(this.API_URL + "/Blogs", newBlog)
      .toPromise()
      .then(response => response as Blog)
      .catch(this.handleError);
  }

  // delete("/api/Blogs/:id")
  deleteBlog(delBlogId: String): Promise<void | String> {
    return this.http.delete(this.API_URL + "/Blogs" + '/' + delBlogId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  // put("/api/Blogs/:id")
  updateBlog(putBlog: Blog): Promise<void | Blog> {
    var putUrl = this.API_URL + "/Blogs" + '/' + putBlog._id;
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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // private blogsUrl = '/api/blogs';

  idBlog$: any = new BehaviorSubject<string>('');
  dataFromBlogObservable = this.idBlog$.asObservable();

  blogId: string;
  postId: string;

  constructor() { }

  public notifyBlogObservable(data: any) {
    if (data) {
      this.idBlog$.next(data);
    };
  }

  set setBlogId(value: string) {
    this.blogId = value;
  }

  get getBlogId() {
    return this.blogId;
  }

  set setPostId(value: string) {
    this.postId = value;
  }

  get getPostId() {
    return this.postId;
  }

  // // get("/api/blogs")
  // getBlogs(): Promise<void | Blog[]> {
  //   return this.http.get(this.blogsUrl)
  //     .toPromise()
  //     .then(response => response as Blog[])
  //     .catch(this.handleError);
  // }

  // // post("/api/blogs")
  // createBlog(newBlog: Blog): Promise<void | Blog> {
  //   return this.http.post(this.blogsUrl, newBlog)
  //     .toPromise()
  //     .then(response => response as Blog)
  //     .catch(this.handleError);
  // }

  // // get("/api/blogs/:id") endpoint not used by Angular app

  // // delete("/api/blogs/:id")
  // deleteBlog(delBlogId: String): Promise<void | String> {
  //   return this.http.delete(this.blogsUrl + '/' + delBlogId)
  //     .toPromise()
  //     .then(response => response as String)
  //     .catch(this.handleError);
  // }

  // // put("/api/blogs/:id")
  // updateBlog(putBlog: Blog): Promise<void | Blog> {
  //   var putUrl = this.blogsUrl + '/' + putBlog._id;
  //   return this.http.put(putUrl, putBlog)
  //     .toPromise()
  //     .then(response => response as Blog)
  //     .catch(this.handleError);
  // }

  // private handleError(error: any) {
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  // }
}
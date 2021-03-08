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
}
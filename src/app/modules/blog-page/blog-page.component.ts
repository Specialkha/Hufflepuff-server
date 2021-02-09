import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../activities/services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class Blog {

  @Input()
  blog: Blog;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private blogService: BlogService) { }

  createBlog(blog: Blog) {
    this.blogService.createBlog(blog).then((newBlog: Blog) => {
      this.createHandler(newBlog);
    });
  }

  updateBlog(blog: Blog) {
    this.blogService.createBlog(blog).then((newBlog: Blog) => {
      this.updateHandler(newBlog);
    });
  }

  deleteBlog(blogId: String): void {
    this.blogService.deleteBlog(blogId).then((deletedblogId: String) => {
      this.deleteHandler(deletedblogId);
    });
  }

}

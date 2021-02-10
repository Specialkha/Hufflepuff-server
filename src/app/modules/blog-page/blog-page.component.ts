import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/model/blog';
import { BlogService } from '../activities/services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  blog: any;

  constructor(private blogService: BlogService) { }

  createNewBlog(blog: Blog) {
    // this.blogService.createBlog(blog).then((newBlog: Blog) => {
    //   this.createHandler(newBlog);
    // });
  }

  updateBlog(blog: Blog) {
    // this.blogService.createBlog(blog).then((newBlog: Blog) => {
    //   this.updateHandler(newBlog);
    // });
  }

  deleteBlog(blogId: String): void {
    // this.blogService.deleteBlog(blogId).then((deletedblogId: String) => {
    //   this.deleteHandler(deletedblogId);
    // });
  }

}

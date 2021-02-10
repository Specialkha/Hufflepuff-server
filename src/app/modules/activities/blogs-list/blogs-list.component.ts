import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../core/model/blog';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {

  blogs: Blog[];
  selectedBlog: Blog;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService
      .getBlogs()
      .then((blogs: Blog[]) => {
        this.blogs = blogs.map((blog) => {
          return blog;
        });
      });
  }

  private getIndexOfBlog = (blogId: String) => {
    return this.blogs.findIndex((blog) => {
      return blog._id === blogId;
    });
  }

  selectBlog(blog: Blog) {
    this.selectedBlog = blog
  }

  createNewBlog() {
    var blog: Blog = {
      _id: '0',
      title: '',
      content: ''
    };

    // By default, a newly-created blog will have the selected state.
    this.selectBlog(blog);
  }

  deleteBlog = (blogId: String) => {
    var idx = this.getIndexOfBlog(blogId);
    if (idx !== -1) {
      this.blogs.splice(idx, 1);
      this.selectBlog(null);
    }
    return this.blogs;
  }

  addBlog = (blog: Blog) => {
    this.blogs.push(blog);
    this.selectBlog(blog);
    return this.blogs;
  }

  updateBlog = (blog: Blog) => {
    var idx = this.getIndexOfBlog(blog._id);
    if (idx !== -1) {
      this.blogs[idx] = blog;
      this.selectBlog(blog);
    }
    return this.blogs;
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Blog } from '../../core/model/blog';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {

  blogs: Blog[];
  selectedBlog: Blog;

  constructor(private httpBlog: HttpBlogService, private httpUser: HttpUserService, public auth: AuthService) { }

  ngOnInit() {
    this.httpBlog.getBlogs().subscribe((data) => {
      console.log(data, 'data')
      this.blogs = data;
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

  // createNewBlog() {
  // this.blogService.createBlog(blog).then((newBlog: Blog) => {
  //   this.createHandler(newBlog);
  // });
  // }

  // createNewBlog() {
  //   var blog: Blog = {
  //     _id: '0',
  //     title: '',
  //     content: ''
  //   };

  //   // By default, a newly-created blog will have the selected state.
  //   this.selectBlog(blog);
  // }

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

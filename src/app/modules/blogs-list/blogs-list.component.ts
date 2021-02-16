import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Blog } from '../../core/model/blog';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {

  blogs: Blog[];
  selectedBlog: Blog;
  searchText: string;

  constructor(private httpBlog: HttpBlogService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.httpBlog.getBlogs().subscribe((data) => {
      console.log(data, 'data');
      this.blogs = data;
    });

  }

  onNavigate(blog) {
    this.router.navigate(['/blog', blog._id]);
  }

}

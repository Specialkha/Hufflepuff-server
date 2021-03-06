import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Blog } from '../../core/model/blog';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {

  faSearch = faSearch;

  blogs: Blog[];
  selectedBlog: Blog;
  searchText: string;

  constructor(private httpBlog: HttpBlogService, public auth: AuthService, private router: Router) {
    this.httpBlog.getBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  ngOnInit() {
   }

  onNavigate(blog) {
    this.router.navigate(['/blog', blog._id]);
  }

}

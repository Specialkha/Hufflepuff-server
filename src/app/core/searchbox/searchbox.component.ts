import { Component, OnInit } from '@angular/core';
import { HttpBlogService } from '../http/blog/httpBlog.service';
import { HttpUserService } from '../http/user/httpUser.service';
import { Blog } from '../model/blog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})

export class SearchboxComponent implements OnInit {

  constructor(private httpBlog: HttpBlogService, private httpUser: HttpUserService, public auth: AuthService) { }

  blogs: Blog[];

  searchText: string;



  ngOnInit() {
    this.httpBlog.getBlogs().subscribe((data) => {
      console.log(data, 'data')
      this.blogs = data;
    });


  }
}

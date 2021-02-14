import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { Blog } from 'src/app/core/model/blog';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  blog: Blog;

  constructor(private route: ActivatedRoute, private blogHttp: HttpBlogService, public auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.blogHttp.getSingleBlog(params.blogId).subscribe((data: Blog) => {
          this.blog = data;
        })
      }
    })
  }

}

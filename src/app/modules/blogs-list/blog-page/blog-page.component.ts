import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { Blog } from 'src/app/core/model/blog';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  constructor(private route: ActivatedRoute, private blogHttp: HttpBlogService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params, 'params')
      if (params) {
        this.blogHttp.getSingleBlog(params.blogId).subscribe((data:Blog) => {
          console.log(data);
        })
      }
    })
  }

}

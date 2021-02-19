import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { Blog } from 'src/app/core/model/blog';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  blog: Blog;
  blogId: string;
  isBlogOwner: boolean = false;

  constructor(private route: ActivatedRoute, private blogHttp: HttpBlogService, public auth: AuthService, private router: Router, private userHttp: HttpUserService) {

  }

  public async ngOnInit() {
    await this.route.params.subscribe((params) => {
      if (params) {
        this.blogId = params.blogId;
        this.blogHttp.getSingleBlog(this.blogId).subscribe((data: Blog) => {
          this.blog = data;
          this.userHttp.getSingleUserWithId(localStorage.getItem('userId')).subscribe((user: User) => {
            if (data.authorId === user._id) {
              this.isBlogOwner = true;
            }
          });
        });
      }
    });
  }

  onCreatePost() {
    this.router.navigate(['/post-creation', this.blogId]);
  }

  onNavigate(post){
    this.router.navigate(['/post', post._id]);
  }

}

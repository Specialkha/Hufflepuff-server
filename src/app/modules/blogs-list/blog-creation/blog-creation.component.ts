import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blog-creation',
  templateUrl: './blog-creation.component.html',
  styleUrls: ['./blog-creation.component.scss']
})
export class BlogCreationComponent implements OnInit {

  blogCreationForm: FormGroup;

  constructor(private userHttp: HttpUserService, private httpBlog: HttpBlogService, private httpUser: HttpUserService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.blogCreationForm = this.createNewBlogFormGroup();
  }

  createNewBlogFormGroup() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      headline: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  async createNewBlog() {
    let userId: string;
    await this.userHttp.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
      userId = user._id;
      const payload = {
        title: this.blogCreationForm.value.title,
        headline: this.blogCreationForm.value.headline,
        description: this.blogCreationForm.value.description,
        authorId: userId
      }
      this.httpBlog.createNewBlog(payload).subscribe((data: any) => {
        if (data) {
          console.log(data,'data')
          this.router.navigate(['/blog', data._id]);
        }
      });
    });
  }

}

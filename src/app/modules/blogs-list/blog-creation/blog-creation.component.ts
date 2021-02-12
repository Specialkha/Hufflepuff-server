import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blog-creation',
  templateUrl: './blog-creation.component.html',
  styleUrls: ['./blog-creation.component.scss']
})
export class BlogCreationComponent implements OnInit {

  blogCreationForm: FormGroup;

  constructor(private httpBlog: HttpBlogService, private httpUser: HttpUserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.blogCreationForm = this.createNewBlogFormGroup();
  }

  createNewBlogFormGroup() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  createNewBlog() {
    let payload = {
      title: this.blogCreationForm.value.title,
      content: this.blogCreationForm.value.content,
      id: ""
    }

    let username: string;

    this.auth.dataFromUserObservable.subscribe((user: any) => {
      username = user;
    });
    
    payload.id = username;
    this.httpBlog.createNewBlog(payload).subscribe((data: any) => {
      console.log(data);
    });
  }

}

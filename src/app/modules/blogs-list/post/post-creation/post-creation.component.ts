import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  postCreationForm: FormGroup;

  idBlog: string;

  constructor(private httpBlog: HttpBlogService, private httpUser: HttpUserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idBlog = params.blogId;
      console.log(this.idBlog, 'idBlog')
    });
    this.postCreationForm = this.newFormGroupForPostCreation();
    // this.httpUser.getSingleUser('Voir Observable pour stocker user data').subscribe((data: User) => {
    //   console.log(data);
    // });
  }

  newFormGroupForPostCreation() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    const postToCreate = {
      title: this.postCreationForm.value.title,
      content: this.postCreationForm.value.content,
      date: new Date
    }
    this.httpBlog.getSingleBlog(this.idBlog).subscribe((data: any) => {
      this.httpBlog.createPostInBlog(data._id, postToCreate).subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/blog', this.idBlog]);
        }
      });
    });

  }

}

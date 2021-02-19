import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpPostService } from 'src/app/core/http/post/http-post.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { BlogService } from 'src/app/core/services/blog.service';
import { RandomGeneratorService } from 'src/app/core/services/random-generator.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  postCreationForm: FormGroup;

  idBlog: string;

  constructor(private random: RandomGeneratorService,private httpPost: HttpPostService, private httpBlog: HttpBlogService, private httpUser: HttpUserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idBlog = params.blogId;
      console.log(this.idBlog, 'idBlog')
    });
    this.postCreationForm = this.newFormGroupForPostCreation();
  }

  newFormGroupForPostCreation() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    const postToCreate = {
      _id: this.random.guidGenerator(),
      title: this.postCreationForm.value.title,
      content: this.postCreationForm.value.content,
      date: new Date
    }
    this.httpBlog.getSingleBlog(this.idBlog).subscribe((data: any) => {
      this.httpPost.createPostInBlog(data._id, postToCreate).subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/blog', this.idBlog]);
        }
      });
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/model/post';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpPostService } from 'src/app/core/http/post/http-post.service';
import { BlogService } from 'src/app/core/services/blog.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postCreationForm: FormGroup;

  post: Post;
  postId: string;

  constructor(private blogService: BlogService, public auth: AuthService, private route: ActivatedRoute, private postHttp: HttpPostService) { }

  ngOnInit(): void {
    this.postCreationForm = this.createNewFormGroup();
    this.route.params.subscribe((params) => {
      this.postId = params.postId;
      this.postHttp.getSinglePost(this.blogService.getBlogId, this.postId).subscribe((data: Post) => {
        this.post = data;
      });
    });
  }

  createNewFormGroup() {
    return new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

  onCreateComment() {

  }

}

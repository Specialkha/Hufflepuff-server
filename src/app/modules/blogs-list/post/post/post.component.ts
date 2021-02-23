import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/model/post';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpPostService } from 'src/app/core/http/post/http-post.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { HttpCommentService } from 'src/app/core/http/comment/httpComment.service';
import { Comment } from 'src/app/core/model/comment';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  editPostForm: FormGroup;
  commentCreationForm: FormGroup;

  post: Post;
  postId: string;

  isPostOwner: boolean = false;

  constructor(private httpUser: HttpUserService, private httpComment: HttpCommentService, private blogService: BlogService, public auth: AuthService, private route: ActivatedRoute, private postHttp: HttpPostService) { }

  ngOnInit(): void {
    this.commentCreationForm = this.createNewFormGroup();
    this.editPostForm = this.createNewFormGroupForPostEditing();
    this.route.params.subscribe((params) => {
      this.postId = params.postId;
      this.postHttp.getSinglePost(this.blogService.getBlogId, this.postId).subscribe((data: any) => {
        this.post = data[0];
        console.log(this.post)
      });
    });
  }

  createNewFormGroup() {
    return new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

  createNewFormGroupForPostEditing() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  onEditPost() {

  }

  async onCreateComment() {
    let userName: string;
    let userId:string
    await this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
      userName = user.lastName + ' ' + user.firstName;
      userId = user._id;
    });
    const payload: Comment = {
      author: userName,
      authorId: userId,
      content: this.commentCreationForm.value.content,
      date: new Date
    }
    this.httpComment.createComment(this.blogService.getBlogId, this.postId, payload).subscribe((data) => {
      console.log(data);
    });
  }

}

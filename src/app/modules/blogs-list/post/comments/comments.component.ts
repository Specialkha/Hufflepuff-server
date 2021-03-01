import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpCommentService } from 'src/app/core/http/comment/httpComment.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { Comment } from 'src/app/core/model/comment';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comment: Comment;
  @Input() postId: string;

  commentCreationForm: FormGroup;

  onOpenAnswer: boolean = false;

  constructor(public auth: AuthService, private httpComment: HttpCommentService, private httpUser: HttpUserService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.commentCreationForm = this.createNewFormGroup();
    console.log(this.comment)
  }

  createNewFormGroup() {
    return new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

  async onCreateComment() {
    this.onOpenAnswer = false;
    let userName: string;
    let userId: string
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

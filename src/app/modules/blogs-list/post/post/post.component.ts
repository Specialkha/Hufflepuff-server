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
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { Blog } from 'src/app/core/model/blog';


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
  isLoaded: boolean = false;

  isPostOwner: boolean = false;
  onEdit: boolean = false;
  userWriter: User;

  constructor(private httpBlog: HttpBlogService, private httpUser: HttpUserService, private httpComment: HttpCommentService, private blogService: BlogService, public auth: AuthService, private route: ActivatedRoute, private postHttp: HttpPostService) {
    this.route.params.subscribe((params) => {
      this.postId = params.postId;
      this.postHttp.getSinglePost(this.blogService.getBlogId, this.postId).subscribe((data: any) => {
        this.post = data[0];
        this.httpBlog.getSingleBlog(this.blogService.getBlogId).subscribe((blog: Blog) => {
          this.isLoaded = true;
          this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
            this.userWriter = user;
            if (blog.authorId === user._id) {
              this.isPostOwner = true;
            }
          }, err => {
            console.error(err)
          });
        });
      });
    });
  }

  ngOnInit() {
    this.commentCreationForm = this.createNewFormGroup();
    this.editPostForm = this.createNewFormGroupForPostEditing();
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
    let userId: string
    await this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
      userName = user.lastName + ' ' + user.firstName;
      userId = user._id;
    });
    const payload: Comment = {
      author: this.userWriter.lastName + ' ' + this.userWriter.firstName,
      authorId: this.userWriter._id,
      content: this.commentCreationForm.value.content,
      date: new Date
    }
    await this.httpComment.createComment(this.blogService.getBlogId, this.postId, payload).subscribe((data) => {
      if (data) {
        this.commentCreationForm.reset();
        this.postHttp.getSinglePost(this.blogService.getBlogId, this.postId).subscribe((data: any) => {
          this.post = data[0];
        });
      }
    });
  }

}

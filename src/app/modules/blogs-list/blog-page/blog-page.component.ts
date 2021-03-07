import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EditBlogSuccessComponent } from 'src/app/core/components/snack-bar/edit-blog-success/edit-blog-success.component';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { Blog } from 'src/app/core/model/blog';
import { Post } from 'src/app/core/model/post';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  durationInSeconds: number = 3;

  blog: Blog;
  blogId: string;
  isBlogOwner: boolean = false;

  onEdit: boolean = false;
  editBlogForm: FormGroup;

  constructor(private _snackBar: MatSnackBar, private blogService: BlogService, private route: ActivatedRoute, private blogHttp: HttpBlogService, public auth: AuthService, private router: Router, private userHttp: HttpUserService) {
    this.editBlogForm = this.createNewFormGroupForEditingBlog();
  }

  public async ngOnInit() {
    await this.route.params.subscribe((params) => {
      if (params) {
        this.blogId = params.blogId;
        this.blogHttp.getSingleBlog(this.blogId).subscribe((data: Blog) => {
          this.blog = data;
          this.userHttp.getSingleUserWithId(this.blog.authorId).subscribe((e: User) => {
            this.userHttp.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
              if (data.authorId === user._id) {
                this.isBlogOwner = true;
              }
              this.blog.authorId = e.lastName + ' ' + e.firstName;
              this.editBlogForm.patchValue({
                title: this.blog.title,
                headline: this.blog.headline,
                description: this.blog.description
              });
            }, err => {
              this.blog.authorId = e.lastName + ' ' + e.firstName;
              console.error(err);
            });
          });
        });
      }
    });
  }

  createNewFormGroupForEditingBlog() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      headline: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onCreatePost() {
    this.router.navigate(['/post-creation', this.blogId]);
  }

  onNavigate(blogId: string, post: Post) {
    this.blogService.blogId = blogId;
    this.router.navigate(['/post', post._id]);
  }

  get f() {
    return this.editBlogForm.value;
  }

  onEditBlog() {
    const payload = {
      _id: this.blog._id,
      title: this.f.title,
      headline: this.f.headline,
      description: this.f.description
    }
    this.blogHttp.updateBlog(payload).subscribe((data) => {
      this.onEdit = false;
      this.blog.title = this.f.title;
      this.blog.headline = this.f.headline;
      this.blog.description = this.f.description;
      this._snackBar.openFromComponent(EditBlogSuccessComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: "list-group-item-success",
        verticalPosition: "top",
      });
    });
  }

  onDeleteBlog() {
    this.blogHttp.deleteBlog(this.blog._id).subscribe(data => {
      this.router.navigate(['/liste-des-blogs']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  postCreationForm: FormGroup;

  idBlog: string;

  constructor(private httpBlog: HttpBlogService, private blog: BlogService) { }

  ngOnInit(): void {
    this.postCreationForm = this.newFormGroupForPostCreation();
  }

  newFormGroupForPostCreation() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    console.log(this.postCreationForm);

    this.httpBlog.getSingleBlog(this.idBlog).subscribe((data: any) => {
      this.httpBlog.createPostInBlog(data._id, this.postCreationForm).subscribe((data: any) => {
        console.log(data);
      });
    });

  }

}

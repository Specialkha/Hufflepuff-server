import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http/blog/http.service';

@Component({
  selector: 'app-blog-creation',
  templateUrl: './blog-creation.component.html',
  styleUrls: ['./blog-creation.component.scss']
})
export class BlogCreationComponent implements OnInit {

  blogCreationForm: FormGroup;

  constructor(private http: HttpService) { }

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
    const payload = {
      title: this.blogCreationForm.value.title,
      content: this.blogCreationForm.value.content
    }
    this.http.createNewBlog(payload);
  }

}

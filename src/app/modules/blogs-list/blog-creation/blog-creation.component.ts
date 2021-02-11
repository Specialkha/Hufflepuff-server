import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-creation',
  templateUrl: './blog-creation.component.html',
  styleUrls: ['./blog-creation.component.scss']
})
export class BlogCreationComponent implements OnInit {

  blogCreationForm: FormGroup;

  constructor() { }

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

    }
  }

}

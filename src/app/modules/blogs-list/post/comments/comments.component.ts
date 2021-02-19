import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/model/comment';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comment: Comment;

  postCreationForm:FormGroup;

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.postCreationForm = this.createNewFormGroup();
  }

  createNewFormGroup() {
    return new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

  onCreateComment(){
    
  }

}

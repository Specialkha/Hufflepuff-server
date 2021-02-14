import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comment: Comment;

  constructor() { }

  ngOnInit(): void {
  }

}

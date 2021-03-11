import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-edit-blog-success',
  templateUrl: './edit-blog-success.component.html',
  styleUrls: ['./edit-blog-success.component.scss']
})
export class EditBlogSuccessComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

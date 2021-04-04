import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-edit-post-success',
  templateUrl: './edit-post-success.component.html',
  styleUrls: ['./edit-post-success.component.scss']
})
export class EditPostSuccessComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

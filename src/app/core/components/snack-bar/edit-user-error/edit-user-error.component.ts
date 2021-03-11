import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-edit-user-error',
  templateUrl: './edit-user-error.component.html',
  styleUrls: ['./edit-user-error.component.scss']
})
export class EditUserErrorComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

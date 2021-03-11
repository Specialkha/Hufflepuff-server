import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-edit-user-success',
  templateUrl: './edit-user-success.component.html',
  styleUrls: ['./edit-user-success.component.scss']
})
export class EditUserSuccessComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

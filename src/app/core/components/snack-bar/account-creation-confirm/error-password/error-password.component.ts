import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-error-password',
  templateUrl: './error-password.component.html',
  styleUrls: ['./error-password.component.scss']
})
export class ErrorPasswordComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

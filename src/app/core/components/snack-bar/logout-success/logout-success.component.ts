import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-logout-success',
  templateUrl: './logout-success.component.html',
  styleUrls: ['./logout-success.component.scss']
})
export class LogoutSuccessComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

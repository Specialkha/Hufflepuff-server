import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-account-creation-email',
  templateUrl: './account-creation-email.component.html',
  styleUrls: ['./account-creation-email.component.scss']
})
export class AccountCreationEmailComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {
  }

}

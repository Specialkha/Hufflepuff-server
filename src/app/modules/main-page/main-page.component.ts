import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  userLogin: any;

  constructor(public auth: AuthService) {
    console.log(this.userLogin,'userlogin')
    this.userLogin = auth.currentUser;
  }

  ngOnInit(): void {
  }

}

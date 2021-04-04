import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  userId: string;

  constructor(private router: Router, private httpUser: HttpUserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.httpUser.getUserWithToken(this.auth.authToken).subscribe((data: User) => {
      this.userId = data._id;
    });
  }

  onDeleteAccount() {
    this.httpUser.deleteUser(this.userId).subscribe(data => {
      this.router.navigate(['/']);
    });
  }

}

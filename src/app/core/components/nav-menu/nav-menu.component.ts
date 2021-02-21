import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { HttpUserService } from '../../http/user/httpUser.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  faUser = faUser;

  closeResult = '';
  loginOpen: boolean = false;

  loginForm: FormGroup;

  constructor(private httpUser: HttpUserService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.createNewFormGroupLogIn();
  }

  createNewFormGroupLogIn() {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    const payload = {
      username: this.loginForm.value.login,
      password: this.loginForm.value.password
    }
    this.httpUser.userLogin(payload).subscribe((e: any) => {
      this.auth.notifyObservable(e.accessToken);
      this.auth.dataFromObservable.subscribe((authToken: string) => {
        this.auth.authToken = authToken;
        localStorage.setItem('token', authToken);
        this.auth.notifyUserObservable(payload.username);
        this.httpUser.getSingleUser(this.loginForm.value.login).subscribe((userId: string) => {
          localStorage.setItem('userId', userId);
        });
      });
    }, err => {
      console.log(err)
    });
  }

  onLogout() {
    let userCredential: any = {};
    this.auth.dataFromUserObservable.subscribe((user: any) => {
      userCredential.user = user;
    });
    userCredential.token = localStorage.getItem('token');
    this.httpUser.userLogout(userCredential).subscribe((data: string) => {
    });
    localStorage.removeItem('token');
    this.auth.dataFromObservable.subscribe(() => {
      this.auth.authToken = null;
    });
  }

  onNavigate() {
    this.router.navigate(['/accountUser']);
  }

}

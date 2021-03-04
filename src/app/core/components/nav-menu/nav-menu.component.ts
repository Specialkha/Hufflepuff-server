import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { HttpUserService } from '../../http/user/httpUser.service';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { ErrorLoginComponent } from '../snack-bar/error-login/error-login.component';
import { SuccessLoginComponent } from '../snack-bar/success-login/success-login.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  durationInSeconds: number = 5;

  faUser = faUser;

  closeResult = '';
  loginOpen: boolean = false;

  loginForm: FormGroup;

  constructor(private httpUser: HttpUserService, public auth: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.createNewFormGroupLogIn();
    if (this.auth.authToken)
      this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
        this.auth.notifyUserObservable(user);
        this.auth.notifyObservable(this.auth.authToken);
      }, err => {
        if (err) {
          this.httpUser.userLogout('').subscribe((data) => {
            if (data) {
              this.auth.authToken = undefined;
              console.log('Vous avez été déconnecté');
            }
          });
        }
      });
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
      this._snackBar.openFromComponent(SuccessLoginComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: "list-group-item-success",
        verticalPosition: "top",
      });
    }, err => {
      this._snackBar.openFromComponent(ErrorLoginComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: "list-group-item-danger",
        verticalPosition: "top",
      });
    });
  }

  onLogout() {
    let userCredential: any = {};
    this.auth.dataFromUserObservable.subscribe((user: any) => {
      userCredential.user = user;
    });
    userCredential.token = localStorage.getItem('token');
    this.httpUser.userLogout(userCredential).subscribe((data: string) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.auth.dataFromObservable.subscribe(() => {
        this.auth.authToken = null;
      });
    });
  }

  onNavigate() {
    this.router.navigate(['/accountUser']);
  }

  onCreateAccount() {
    this.loginOpen = false;
    this.router.navigate(['/accountCreation']);
  }

}

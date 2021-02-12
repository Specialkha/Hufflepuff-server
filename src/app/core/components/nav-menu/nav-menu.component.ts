import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http/user/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  closeResult = '';
  loginOpen: boolean = false;

  loginForm: FormGroup;

  constructor(private http: HttpService, public auth: AuthService) { }

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

    this.http.userLogin(payload).subscribe((e: any) => {
      this.auth.notifyObservable(e.accessToken);
      this.auth.dataFromObservable.subscribe((authToken: string) => {
        this.auth.authToken = authToken;
        localStorage.setItem('token', authToken);
      });
    }, err => {
      console.log(err)
    });
  }

  onLogout() {
    this.http.userLogout(localStorage.getItem('token')).subscribe((data: string) => {
      console.log(data);
    })
    localStorage.removeItem('token');
    this.auth.dataFromObservable.subscribe(() => {
      this.auth.authToken = null;
    });
  }

}

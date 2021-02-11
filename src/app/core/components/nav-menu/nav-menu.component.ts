import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http/user/http.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  closeResult = '';
  loginOpen:boolean = false;

  loginForm: FormGroup;

  constructor(private http:HttpService) { }

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
    console.log(this.loginForm);
    const payload = {
      username: this.loginForm.value.login,
      password: this.loginForm.value.password
    }

    this.http.userLogin(payload).subscribe((e:any)=> {
      console.log(e);
    })
  }

}

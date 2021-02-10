import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  closeResult = '';
  loginOpen:boolean = false;

  loginForm: FormGroup;

  constructor() { }

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
  }

}

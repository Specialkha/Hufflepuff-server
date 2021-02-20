import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss']
})
export class AccountCreationComponent implements OnInit {

  creationForm: FormGroup;

  constructor(private httpUser: HttpUserService) { }

  ngOnInit(): void {
    this.creationForm = this.createNewAccount();
  }

  createNewAccount() {
    return new FormGroup({
      genre: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl(''),
      zipCode: new FormControl(''),
      city: new FormControl(''),
      phone: new FormControl(''),
      mobile: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    const userToCreate: User = {
      genre: this.creationForm.value.genre,
      lastName: this.creationForm.value.lastName,
      firstName: this.creationForm.value.firstName,
      email: this.creationForm.value.email,
      mobile: this.creationForm.value.mobile,
      phone: this.creationForm.value.phone,
      adress: this.creationForm.value.adress,
      zipCode: this.creationForm.value.zipCode,
      city: this.creationForm.value.city,
      password: this.creationForm.value.password,
      adminLevel: 'citoyen',
    }
    this.httpUser.createUser(userToCreate).subscribe(account => {
      console.log(account);
    });
  }

}

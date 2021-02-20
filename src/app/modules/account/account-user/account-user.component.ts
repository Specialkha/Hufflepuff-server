import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss']
})
export class AccountUserComponent implements OnInit {

  accountForm: FormGroup;
  user: User;

  constructor(private httpUser: HttpUserService, private auth: AuthService) {
    this.accountForm = this.createNewFormGroup();
  }

  async ngOnInit() {
    this.httpUser.getUserWithToken(this.auth.authToken).subscribe((data: User) => {
      this.user = data;
      console.log(this.user, 'user')
      this.accountForm.patchValue({
        genre:this.user.genre,
        lastName: this.user.lastName,
        firstName: this.user.firstName,
        password: this.user.password,
        email: this.user.email,
        adress: this.user.adress,
        zipCode: this.user.zipCode,
        city: this.user.city,
        phone: this.user.phone,
        mobile: this.user.mobile
      });
    });
  }

  createNewFormGroup() {
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

  get f (){
    return this.accountForm.value;
  }

  onSubmit() {
    const payload = {
      genre: this.f.genre,
      lastName: this.f.lastName,
      firstName: this.f.firstName,
      password: this.f.password,
      email: this.f.email,
      adress: this.f.adress,
      zipCode: this.f.zipCode,
      city: this.f.city,
      phone: this.f.phone,
      mobile: this.f.mobile
    };
    this.httpUser.updateUser(this.user._id, payload).subscribe((data) => {
      console.log(data);
    });
  }

}

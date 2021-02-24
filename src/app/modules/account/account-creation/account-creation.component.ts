import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorPasswordComponent } from 'src/app/core/components/snack-bar/account-creation-confirm/error-password/error-password.component';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss']
})
export class AccountCreationComponent implements OnInit {

  creationForm: FormGroup;

  durationInSeconds: number = 5;

  constructor(private httpUser: HttpUserService, private router: Router, private auth: AuthService, private _snackBar: MatSnackBar) { }

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

  get f() {
    return this.creationForm.value;
  }

  onCreate() {
    if (this.f.password === this.f.confirm) {
      const userToCreate: User = {
        genre: this.f.genre,
        lastName: this.f.lastName,
        firstName: this.f.firstName,
        email: this.f.email,
        mobile: this.f.mobile,
        phone: this.f.phone,
        adress: this.f.adress,
        zipCode: this.f.zipCode,
        city: this.f.city,
        password: this.f.password,
        adminLevel: 'citoyen',
      }
      this.httpUser.createUser(userToCreate).subscribe((account: any) => {
        const payload = {
          username: account.email,
          password: this.creationForm.value.password
        };
        this.httpUser.userLogin(payload).subscribe((data: any) => {
          this.auth.notifyObservable(data.accessToken);
          this.auth.dataFromObservable.subscribe((authToken: string) => {
            this.auth.authToken = authToken;
            localStorage.setItem('token', authToken);
            this.auth.notifyUserObservable(payload.username);
            this.httpUser.getSingleUser(payload.username).subscribe((userId: string) => {
              localStorage.setItem('userId', userId);
              this.router.navigate(['/accueil']);
            });
          });
        })
      });
    } else {
      this._snackBar.openFromComponent(ErrorPasswordComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: "list-group-item-danger",
        verticalPosition: "top",
      });
    }

  }

}

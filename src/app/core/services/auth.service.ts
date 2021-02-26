import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpUserService } from '../http/user/httpUser.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken$ = new BehaviorSubject<string>('');
  dataFromObservable = this.authToken$.asObservable();
  authToken: any;

  private user$ = new BehaviorSubject<User>({
    genre: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    adminLevel: ""
  });
  dataFromUserObservable = this.user$.asObservable();
  user: string;

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('token'));
  public currentUser: Observable<any>;

  constructor() {
    if (localStorage.getItem('token')) {
      this.authToken = localStorage.getItem('token');
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserSubjectValue() {
    return this.currentUserSubject.value;
  }

  public get currentauthTokenValue() {
    return this.authToken$.value;
  }

  public get currentUserValue() {
    return this.user$.value;
  }

  public notifyObservable(data: string) {
    if (data) {
      this.authToken$.next(data);
    };
  }

  public notifyUserObservable(data: any) {
    if (data) {
      this.user$.next(data);
    };
  }
}

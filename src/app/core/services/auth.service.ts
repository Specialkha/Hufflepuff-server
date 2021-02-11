import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/user/http.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User>;

  constructor(private userHttp: HttpService) {
  }
}

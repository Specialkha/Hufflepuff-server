import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  private API_URL = '/api';

  constructor(private http: HttpClient) { }

  // get("/api/users")
  getUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.API_URL + "/users").toPromise();
  }

  // post("/api/users")
  createUser(newUser: User) {
    return this.http.post(this.API_URL + "/auth/signup", newUser);
  }

  // get("/api/users/:id")to get a single user from database
  getSingleUser(username: string) {
    return this.http.get(this.API_URL + '/users/' + username);
  }

  // get("/api/users/:id")to get a single user from database
  getSingleUserWithId(id: string) {
    return this.http.get(this.API_URL + '/singleusers/' + id);
  }

  getUserWithToken(token: string) {
    return this.http.get(this.API_URL + '/token/users/' + token);
  }

  // delete("/api/users/:id")
  deleteUser(delUserId: String) {
    return this.http.delete(this.API_URL + "/users" + '/' + delUserId)
  }

  // put("/api/users/:id")
  updateUser(putUserId: string, payload: any) {
    var putUrl = this.API_URL + "/users" + '/' + putUserId;
    return this.http.put(putUrl, payload);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

  userLogin(requestedPayload: any) {
    return this.http.post(this.API_URL + '/auth/signin', requestedPayload);
  }

  userLogout(payload: any) {
    return this.http.post(this.API_URL + '/auth/logout', payload, { responseType: 'text' });
  }
}

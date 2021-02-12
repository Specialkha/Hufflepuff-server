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
  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.API_URL + "/users", newUser)
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  // get("/api/users/:id")to get a single user from database
  getSingleUser(username: string) {
    return this.http.get(this.API_URL + '/users/' + username);
  }

  // delete("/api/users/:id")
  deleteUser(delUserId: String): Promise<void | String> {
    return this.http.delete(this.API_URL + "/users" + '/' + delUserId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  // put("/api/users/:id")
  updateUser(putUser: User): Promise<void | User> {
    var putUrl = this.API_URL + "/users" + '/' + putUser._id;
    return this.http.put(putUrl, putUser)
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

  userLogin(requestedPayload: any) {
    return this.http.post(this.API_URL + '/login', requestedPayload);
  }

  userLogout(payload: any) {
    return this.http.post(this.API_URL + '/logout', payload, { responseType: 'text' });
  }
}

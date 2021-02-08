import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_URL = '/api';

  constructor(private http: HttpClient) { }


  // get("/api/contacts")
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(this.API_URL + "/users")
      .toPromise()
      .then(response => response as Contact[])
      .catch(this.handleError);
  }

  // post("/api/contacts")
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.API_URL + "/users", newContact)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deleteContact(delContactId: String): Promise<void | String> {
    return this.http.delete(this.API_URL + "/users" + '/' + delContactId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putContact: Contact): Promise<void | Contact> {
    var putUrl = this.API_URL + "/users" + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  private snackBar: any = {
    errorPassword: 'Le mot de passe et la confirmation ne sont pas identiques'
  }

  getSnackBar() {
    return this.snackBar;
  }
}

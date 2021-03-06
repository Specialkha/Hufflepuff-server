import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  private snackBar: any = {
    errorPassword: 'Le mot de passe et la confirmation ne sont pas identiques',
    errorLogin: 'L\'utilisateur ou le mot de passe n\'est pas correct',
    successLogin: 'Vous avez été correctement identifié',
    accountEmail: 'Cet email est déjà utilisé'
  }

  getSnackBar() {
    return this.snackBar;
  }
}

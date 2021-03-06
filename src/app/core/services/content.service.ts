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
    accountEmail: 'Cet email est déjà utilisé',
    logoutSuccess: 'Vous avez été correctement déconnecté',
    editBlogSuccess: 'Votre blog a bien été mis à jour',
    editPostSuccess:'Votre post a bien été mis à jour',
    editUserSuccess: 'Votre profil a bien été mis à jour',
    editUserError: 'Erreur lors de la mise à jour de votre profil'
  }

  getSnackBar() {
    return this.snackBar;
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './app/modules/account-creation/account-creation.component';
import { ActivitiesComponent } from './app/modules/activities/activities.component';
import { BlogCreationComponent } from './app/modules/blogs-list/blog-creation/blog-creation.component';
import { BlogsListComponent } from './app/modules/blogs-list/blogs-list.component';
import { ContactComponent } from './app/modules/contact/contact.component';
import { MainPageComponent } from './app/modules/main-page/main-page.component';
import { TosComponent } from './app/modules/tos/tos.component';

const routes: Routes = [
  { path: 'accueil', component: MainPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogsListComponent },
  { path: 'blog-creation', component: BlogCreationComponent },
  { path: 'activites', component: ActivitiesComponent },
  { path: 'tos', component: TosComponent },
  { path: 'accountCreation', component: AccountCreationComponent },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

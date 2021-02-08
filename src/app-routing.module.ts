import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './app/modules/activities/activities.component';
import { BlogPageComponent } from './app/modules/blog-page/blog-page.component';
import { ContactComponent } from './app/modules/contact/contact.component';
import { MainPageComponent } from './app/modules/main-page/main-page.component';
import { TosComponent } from './app/modules/tos/tos.component';

const routes: Routes = [
  { path: 'accueil', component: MainPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'activités', component: ActivitiesComponent },
  { path: 'tos', component: TosComponent },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

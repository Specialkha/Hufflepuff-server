import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app/core/auth-guard/auth.guard';
import { AccountCreationComponent } from './app/modules/account-creation/account-creation.component';
import { ActivitiesComponent } from './app/modules/activities/activities.component';
import { BlogCreationComponent } from './app/modules/blogs-list/blog-creation/blog-creation.component';
import { BlogPageComponent } from './app/modules/blogs-list/blog-page/blog-page.component';
import { BlogsListComponent } from './app/modules/blogs-list/blogs-list.component';
import { PostCreationComponent } from './app/modules/blogs-list/post/post-creation/post-creation.component';
import { PostComponent } from './app/modules/blogs-list/post/post/post.component';
import { ContactComponent } from './app/modules/contact/contact.component';
import { MainPageComponent } from './app/modules/main-page/main-page.component';
import { NewsCreationComponent } from './app/modules/main-page/news-creation/news-creation.component';
import { TosComponent } from './app/modules/tos/tos.component';

const routes: Routes = [
  { path: 'accueil', component: MainPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'liste-des-blogs', component: BlogsListComponent },
  { path: 'blog/:blogId', component: BlogPageComponent },
  { path: 'blog-creation', component: BlogCreationComponent, canActivate: [AuthGuard] },
  { path: 'post-creation', component: PostCreationComponent, canActivate: [AuthGuard] },
  { path: 'news-creation', component: NewsCreationComponent, canActivate: [AuthGuard] },
  { path: 'blog/:blogId/post/:postId', component: PostComponent },
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

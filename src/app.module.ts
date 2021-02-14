import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TosComponent } from './app/modules/tos/tos.component';
import { MainPageComponent } from './app/modules/main-page/main-page.component';
import { ContactComponent } from './app/modules/contact/contact.component';
import { BlogPageComponent } from './app/modules/blogs-list/blog-page/blog-page.component';
import { ActivitiesComponent } from './app/modules/activities/activities.component';
import { NavMenuComponent } from './app/core/components/nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogsListComponent } from './app/modules/blogs-list/blogs-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AccountCreationComponent } from './app/modules/account-creation/account-creation.component';
import { httpInterceptorProviders } from './app/core/http/interceptor';
import { BlogCreationComponent } from './app/modules/blogs-list/blog-creation/blog-creation.component';
import { PostCreationComponent } from './app/modules/blogs-list/post/post-creation/post-creation.component';
import { PostComponent } from './app/modules/blogs-list/post/post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from './app/core/pipes/filter.pipe';
import { QuillModule } from 'ngx-quill';
import { FooterComponent } from './app/core/components/footer/footer.component';
import { CommentsComponent } from './app/modules/blogs-list/post/comments/comments.component';
import { NewsCreationComponent } from './app/modules/main-page/news-creation/news-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    TosComponent,
    MainPageComponent,
    ContactComponent,
    BlogPageComponent,
    ActivitiesComponent,
    NavMenuComponent,
    BlogsListComponent,
    AccountCreationComponent,
    BlogCreationComponent,
    PostCreationComponent,
    PostComponent,
    FilterPipe,
    FooterComponent,
    CommentsComponent,
    NewsCreationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    QuillModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
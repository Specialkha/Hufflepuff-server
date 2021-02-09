import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './app/contacts/contact-details/contact-details.component';
import { ContactListComponent } from './app/contacts/contact-list/contact-list.component';
import { TosComponent } from './app/modules/tos/tos.component';
import { MainPageComponent } from './app/modules/main-page/main-page.component';
import { ContactComponent } from './app/modules/contact/contact.component';
import { BlogPageComponent } from './app/modules/blog-page/blog-page.component';
import { ActivitiesComponent } from './app/modules/activities/activities.component';
import { NavMenuComponent } from './app/core/components/nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogsListComponent } from './app/modules/activities/blogs-list/blogs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    TosComponent,
    MainPageComponent,
    ContactComponent,
    BlogPageComponent,
    ActivitiesComponent,
    NavMenuComponent,
    BlogsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
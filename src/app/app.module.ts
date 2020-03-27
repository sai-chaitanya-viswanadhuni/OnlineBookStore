import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Others/home/home.component';
import { BooksComponent } from './Book/books/books.component';
import { AddBookComponent } from './Book/add-book/add-book.component';
import { PageNotFoundComponent } from './Others/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookService } from './Services/book.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './Others/header/header.component';
import { FooterComponent } from './Others/footer/footer.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { AuthenticationService } from './Services/authentication.service';
import { LogoutComponent } from './Authentication/logout/logout.component';
import { UpdateBookDetailsComponent } from './Book/update-book-details/update-book-details.component';
import { BasicAuthHtppInterceptorService } from './Services/basic-auth-htpp-interceptor.service';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    AddBookComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    UpdateBookDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    CodeHighlighterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  providers: [
    BookService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

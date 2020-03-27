import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './Book/books/books.component';
import { AddBookComponent } from './Book/add-book/add-book.component';
import { PageNotFoundComponent } from './Others/page-not-found/page-not-found.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { LogoutComponent } from './Authentication/logout/logout.component';
import { AuthGaurdService } from './Services/auth-gaurd.service';
import { UpdateBookDetailsComponent } from './Book/update-book-details/update-book-details.component';
import { HomeComponent } from './Others/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'signup', component: SignupComponent },
  { path: 'bookslist', component: BooksComponent, canActivate: [AuthGaurdService] },
  { path: 'update/:id', component: UpdateBookDetailsComponent, canActivate: [AuthGaurdService] },
  { path: 'addBook', component: AddBookComponent, canActivate: [AuthGaurdService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { Book } from '../Models/book';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable()
export class BookService {

    baseUrl = 'http://localhost:8080/';
    apiUrl = 'http://localhost:8080/api/book'

    constructor(private _httpService: HttpClient) { }

    // Handle API errors
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(error)
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    getAllBooks(): Observable<any> {
        return this._httpService.get(this.apiUrl + 's')
            .pipe(
                catchError(this.handleError)
            );
    }

    addBook(book: Book) {
        let body = JSON.parse(JSON.stringify(book));
        return this._httpService.post(this.apiUrl + '/add', body, { responseType: 'text' });
    }

    deleteBook(id): Observable<any> {
        return this._httpService.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    getBookDetailByID(id): Observable<any> {
        return this._httpService.get(this.apiUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateBookDetails(id: number, value: any): Observable<Object> {
        return this._httpService.put(`${this.apiUrl}/${id}`, value);
    }

    registerUser(user: User) {
        let body = JSON.parse(JSON.stringify(user));
        //console.log("User Detais:",body.mobilenumber,typeof(body.mobilenumber));
        body.mobilenumber = parseInt(body.mobilenumber);
        //console.log("User Detais:",body.mobilenumber,typeof(body.mobilenumber));
        console.log("User----->",user);
        return this._httpService.post(this.baseUrl + 'register', body, { responseType: 'text' });
    }


    saveData(formData: FormData): Observable <any>{
        return this._httpService.post('http://localhost:8080/api/saveData', formData);
    }

    getAllBooksData(): Observable<any> {
        return this._httpService.get(this.apiUrl + '/allBooks')
            .pipe(
                catchError(this.handleError)
            );
    }

}


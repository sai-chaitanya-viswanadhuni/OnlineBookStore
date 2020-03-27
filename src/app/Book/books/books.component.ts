import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[];
  statusMessage: string;
  retrievedImage: any;
  retrieveResonse: any;
  base64Data: any;


  selectedBook: Book;
  displayDialog: boolean;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  sortOptions: { label: string; value: string; }[];

  constructor(
    private _bookService: BookService,
    private _router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllBooksData();
    this.sortOptions = [
      { label: 'Name', value: 'title' },
      { label: 'Author', value: 'author' }
    ];
  }

  getAllBooksData() {
    this._bookService.getAllBooksData()
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse[0].picture;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.books = res; // Getting Books List
      },
        (error) => {
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        }
      );
  }

  //Delete item in Student data
  deleteBook(id: number) {
    this._bookService.deleteBook(id)
      .subscribe(
        data => {
          //console.log(data);
          this.getAllBooksData();
        },
        error => console.log(error));
  }

  getBookDetail(id: number) {
    this._bookService.getBookDetailByID(id)
      .subscribe(
        data => {
          alert(JSON.stringify(data));
        },
        error => console.log(error));
  }

  updateBook(id: number) {
    this._router.navigate(['update', id]);
  }

  selectBook(event: Event, book: Book) {
    this.selectedBook = book;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event: { value: any; }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedBook = null;
  }

}

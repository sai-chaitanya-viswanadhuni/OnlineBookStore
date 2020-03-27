import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-book-details',
  templateUrl: './update-book-details.component.html',
  styleUrls: ['./update-book-details.component.scss']
})
export class UpdateBookDetailsComponent implements OnInit {

  id: number;
  bookData: Book;
  bookForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private book_service: BookService
  ) { }

  ngOnInit() {
    this.bookFormInit();
    this.getBookDetailsByID();
  }

  bookFormInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
    this.bookData = new Book();
  }

  getBookDetailsByID() {
    this.id = this.route.snapshot.params['id'];
    this.book_service.getBookDetailByID(this.id)
      .subscribe(
        data => {
          console.log(data);
          this.bookData = data;
        },
        error => console.log(error)
      );
  }

  updateBookDetails() {
    this.book_service.updateBookDetails(this.id, this.bookData)
      .subscribe(
        data => console.log(data),
        error => console.log(error),
        () => this.gotoList()
      );
    this.bookData = new Book();
  }

  updateBook() {
    this.updateBookDetails();
  }

  gotoList() {
    this.router.navigate(['/bookslist']);
  }

}

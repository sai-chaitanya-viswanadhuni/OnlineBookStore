import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpData: any = {
    username: '',
    password: '',
    email: '',
    mobilenumber: ''
  };

  signUpForm: FormGroup;
  statusMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private _bookService: BookService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      mobilenumber: ['', Validators.required]
    });
  }

  signUp(){
    console.log(this.signUpForm.value);
    if (this.signUpForm.invalid) {
      alert('Please Enter the Data !!!!')
      return;
    }
    else
    {
      this._bookService.registerUser(this.signUpForm.value)
        .subscribe(
          (response) => {
            console.log(response)
            alert("You have registered successfully !!");
          },
          (error) => {
            console.log(error);
            this.statusMessage = "Problem with service. Please try again later!";
          },
          () => this._router.navigate(['/bookslist'])
        );
    }
  }

}


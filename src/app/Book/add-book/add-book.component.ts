import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Car {
  vin: any;
  year: any;
  brand: any;
  color: any;
}


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {


  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;


  cars: Car[];
  bookForm: FormGroup;
  statusMessage: string;
  selectedCar: Car;

  displayDialog: boolean;

  sortKey: string;

  sortField: string;

  sortOrder: number;

  sortOptions: { label: string; value: string; }[];

  constructor(
    private formBuilder: FormBuilder,
    private _bookService: BookService,
    private _router: Router,
    private httpClient: HttpClient
  ) { }

  public bookData: any = {
    title: '',
    author: '',
  }; // initialize to empty user . 


  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
    this.cars = [
      { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
      { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
      { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
      { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
      { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
      { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
      { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
      { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
      { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
    ];
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' },
      { label: 'Brand', value: 'brand' }
    ];

  }

  selectCar(event: Event, car: Car) {
    this.selectedCar = car;
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
    this.selectedCar = null;
  }


  addBook(): void {
    if (this.bookForm.invalid) {
      alert('Please Enter the Data !!!!')
      return;
    }
    else {
      const user = this.bookForm.value;
      const formData =  new FormData();
      formData.append('user',JSON.stringify(user));
      formData.append('file',this.selectedFile);
      console.log(formData);
      this._bookService.saveData(formData).subscribe(
        (response) => {
          console.log(response);
        }
      );
      // this._bookService.addBook(this.bookForm.value)
      //   .subscribe(
      //     (response: any) => {
      //       console.log(response)
      //       alert("Book added Successfully !!");
      //     },
      //     (error: any) => {
      //       console.log(error);
      //       this.statusMessage = "Problem with service. Please try again later!";
      //     },
      //     () => this._router.navigate(['/bookslist'])
      //   );
    }
  }

  //Gets called when the user selects an image
  public onFileChanged(event: { target: { files: File[]; }; }) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        console.log("In Loop")
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}

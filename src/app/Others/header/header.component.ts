import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  title : string = "Book Store"
  constructor(
    route: ActivatedRoute,
    private auth_service: AuthenticationService
    ) {
    const id: string = route.snapshot.params.id;
    const url: string = route.snapshot.url.join('');
    const user = route.snapshot.data.user;
  }

  ngOnInit() {
  }

}

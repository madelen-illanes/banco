import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';


@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  username = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')!;
  }

}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";

@Component({
  selector: 'app-main-page-user',
  templateUrl: './main-page-user.component.html',
  styleUrls: ['./main-page-user.component.css']
})
export class MainPageUserComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}

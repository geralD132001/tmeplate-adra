import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../providers/services/auth.service";

@Component({
  selector: 'app-footeruno',
  templateUrl: './footeruno.component.html',
  styleUrls: ['./footeruno.component.css']
})
export class FooterunoComponent implements OnInit {
  test : Date = new Date();
  constructor(private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
  }
  getPath(){
    return this.router.url;
  }
}

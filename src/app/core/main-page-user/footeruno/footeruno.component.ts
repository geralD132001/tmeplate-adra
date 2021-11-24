import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footeruno',
  templateUrl: './footeruno.component.html',
  styleUrls: ['./footeruno.component.css']
})
export class FooterunoComponent implements OnInit {
  test : Date = new Date();
  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  getPath(){
    return this.router.url;
  }
}

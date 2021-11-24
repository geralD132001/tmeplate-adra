import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../providers/services/auth.service";

@Component({
  selector: 'app-headeruno',
  templateUrl: './headeruno.component.html',
  styleUrls: ['./headeruno.component.css']
})
export class HeaderunoComponent implements OnInit {
  public isCollapsed = true;
  focus: any;
  focus1: any;
  constructor( private authService: AuthService,) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor() { }

  public userList:boolean = false;
  public messageList: boolean = true;

  ngOnInit(): void {
    this.navBar();
  }

  navBar(): void {
    $(function(){
      $(".btn-toggle-menu").click(function() {
          $("#wrapper").toggleClass("toggled");
      });
    });
  }

  usList(): void{
    this.userList = false;
    this.messageList = true;
  }

  msList(): void{
    this.messageList = false;
    this.userList = true;
  }

}

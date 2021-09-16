import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModel } from 'src/Models/MessageModel';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.displayUserDetails();
    this.displayMessages();
    this.displayUserFriends();
    this.displayUserFriendRequests();
  }
  private id: any = this.route.snapshot.paramMap.get('id');

  public user = new UserModel();
  public friends: UserModel[];
  public requests: UserModel[];
  public messages: MessageModel[];

  public pop = new Popups();


  public name: boolean = false;
  public mob: boolean = false;
  public addr: boolean = false;
  public about: boolean = false;

  public web: boolean = false;
  public git: boolean = false;
  public twit: boolean = false;
  public insta: boolean = false;
  public face: boolean = false;

  public linkPatten = "[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?";
  public gitUrl = "https?://github.com/.+";
  public twitUrl = "http://twitter.com/.+"
  public instaUrl = "http://instagram.com/.+";
  public facebookUrl = "http://facebook.com/.+";

  userAccess(): boolean{
    if(this.userService.LoggedIn() && this.userService.getAuth() === 'admin') {
      return true;
    }else {
      return false;
    }
  }

  goBack(): any{
    return this.location.back();
  }

  goId(id: string): any{
    return location.href = `/display-user/${id}`;
  }

  displayUserDetails(): void {
    try {
      this.userService
      .displayUserById(this.id)
      .subscribe(
        data => {
          this.user = data;
        }, error => {
          console.log(error);
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  displayUserFriends(): void{
    try {
      this.userService
      .displayFriends(this.id)
      .subscribe(
        data => this.friends = data,
        error => console.log(error)
      )
    } catch (error) {
      console.log(error);
    }
  }

  displayUserFriendRequests(): void{
    try {
      this.userService
      .displayFriendRequests(this.id)
      .subscribe(
        data => this.requests = data,
        error => console.log(error)
      );     
    } catch (error) {
      console.log(error);
    }
  }

  displayMessages(): void{
    try {
      this.userService
      .displayUserMessages(this.id)
      .subscribe(
        data => this.messages = data,
        error => console.log(error)
      );
    } catch (error) {
      console.log(error)
    }
  }

  editName(): boolean{
    return this.name = true;
  }

  cancelName(): boolean{
    return this.name = false;
  }

  editMobile(): boolean{
    return this.mob = true;
  }

  cancelMobile(): boolean{
    return this.mob = false;
  }

  editAddress(): boolean{
    return this.addr = true;
  }

  cancelAddress(): boolean{
    return this.addr = false;
  }

  editAboutme(): boolean{
    return this.about = true;
  }

  cancelAboutme(): boolean{
    return this.about = false;
  }

  editWebsite(): boolean {
    return this.web = true;
  }

  cancelWebsite(): boolean {
    return this.web = false;
  }

  editGithub(): boolean {
    return this.git = true;
  }

  cancelGithub(): boolean {
    return this.git = false;
  }

  editTwitter(): boolean {
    return this.twit = true;
  }

  cancelTwitter(): boolean {
    return this.twit = false;
  }

  editInstagram(): boolean {
    return this.insta = true;
  }

  cancelInstagram(): boolean {
    return this.insta = false;
  }

  editFacebook(): boolean {
    return this.face = true;
  }

  cancelFacebook(): boolean {
    return this.face = false;
  }

  onSubmit(): void{
    this.name = false;
    this.mob = false;
    this.addr = false;
    this.about = false;
    this.web = false;
    this.git = false;
    this.twit = false;
    this.insta = false;
    this.face = false;
    this.updateUser();
  }

  updateUser(): void{
    try {
      this.userService
      .updateUser(this.userService.getId(), this.user)
      .subscribe(
        res => {
          if(res.status === 200) {
            // this.successAlert();
          }
        }, error => {
          if(error.status === 404 || 400) {
            // this.failedAlert();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(): void{
    this.pop.tostTimeAlert(
      'Success!!!',
      'Account updated successfully',
      'success',
      5000
    );
  }

  failedAlert(): void{
    this.pop.tostTimeAlert(
      'Failed!!!',
      'Account updated failed, please try again',
      'warning',
      5000
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public user = new UserModel();
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

  public selectedFile: File;
  public url: any;

  public formData = new FormData();

  ngOnInit(): void {
    this.displayUserDetails();
  }

  userAccess(): boolean{
    if(this.userService.LoggedIn() && this.userService.getId() === this.user._id) {
      return true;
    }else {
      return false;
    }
  }

  displayUserDetails(): void {
    try {
      this.userService
      .displayUserById(this.userService.getId())
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

  editName(): boolean{
    return this.name = true;
  }

  editMobile(): boolean{
    return this.mob = true;
  }

  editAddress(): boolean{
    return this.addr = true;
  }

  editAboutme(): boolean{
    return this.about = true;
  }

  editWebsite(): boolean {
    return this.web = true;
  }

  editGithub(): boolean {
    return this.git = true;
  }

  editTwitter(): boolean {
    return this.twit = true;
  }

  editInstagram(): boolean {
    return this.insta = true;
  }

  editFacebook(): boolean {
    return this.face = true;
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

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		
		const mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
    this.updateUser();
  }

  assignValue(): void{
    if(this.selectedFile){
      this.formData.append('avtar', this.selectedFile);
    }else {
      this.formData.append('avtar', this.user.avtar);
    }
    if(this.user.userName){
      this.formData.append('userName', this.user.userName);
    }
    if(this.user.mobile){
      this.formData.append('mobile', this.user.mobile);
    }
    if(this.user.aboutme){
      this.formData.append('aboutme', this.user.aboutme);
    }
    if(this.user.address){
      this.formData.append('address', this.user.address);
    }
    if(this.user.website){
      this.formData.append('website', this.user.website);
    }
    if(this.user.github){
      this.formData.append('github', this.user.github);
    }
    if(this.user.twitter){
      this.formData.append('twitter', this.user.twitter);
    }
    if(this.user.instagram){
      this.formData.append('instagram', this.user.instagram);
    }
    if(this.user.facebook){
      this.formData.append('facebook', this.user.facebook);
    }
  }

  updateUser(): void{
    this.assignValue();
    try {
      this.userService
      .updateUserData(this.user._id, this.formData)
      .subscribe(
        res => {
          if(res.status === 200) {
            this.successAlert();
          }
        }, error => {
          if(error.status === 200) {
            this.successAlert();
          }else{
            this.failedAlert();
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

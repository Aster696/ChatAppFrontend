import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { EmailModel } from 'src/Models/EmailModel';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { formPasswordValidator } from 'src/Services/FormValidators/formValidators';
import { MailServicesService } from 'src/Services/MailService/mail-services.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mailService: MailServicesService,
  ) { }

  ngOnInit(): void {
    this.tokenExtrator();
  }

  private user = new UserModel();
  private mail = new EmailModel();

  private resetToken: any;
  private jwtHelperService = new JwtHelperService();
  private pop = new Popups();

  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,18}';

  formValidation = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    conPassword: ['', [Validators.required]],
  }, {
    validator: formPasswordValidator
  });

  get password() {
    return this.formValidation.get('password');
  }

  get conPassword() {
    return this.formValidation.get('conPassword');
  }

  tokenExtrator(): void{
    try {
      const token:any = this.route.snapshot.paramMap.get('token');
      this.resetToken = jwtDecode(token);
      let isExpired = this.jwtHelperService.isTokenExpired(token);
      console.log(isExpired)
      if(isExpired){
        this.pop.basicAlert(
          'Link Expired! :(',
          'Please try again',
          'info'
        );
        this.router.navigate(['/forgot-password']);
      }else{
        this.displayUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  displayUser(): void{
    try {
      this.userService
      .displayUserById(this.resetToken.id)
      .subscribe(
        data => this.user = data,
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }

  assignValues(): void{
    this.user.password = this.formValidation.value.password;
  }

  changePassword(): void{
    this.assignValues();
    console.log(this.user);
    try {
      this.userService
      .changePassword(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.sendGmail();
          this.successAlert();
        }, error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  sendGmail(): void{
    this.mail.to = this.user.email;
    this.mail.subject = 'Password was reseted successfully!!';
    this.mail.text = `Your password was changed on your request`;
    try {
      this.mailService
      .Gmail(this.mail)
      .subscribe(
        res => {
          // console.log(res);
          this.router.navigate(['/login']);
        }, error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(): void{
    this.pop.basicAlert(
      'Password changed successfull!',
      'Your password has been changed successfully, please try login again',
      'success'
    );
  }

}

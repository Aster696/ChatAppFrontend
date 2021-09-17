import { Component, OnInit } from '@angular/core';
import { EmailModel } from 'src/Models/EmailModel';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { MailServicesService } from 'src/Services/MailService/mail-services.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';
import { routes } from 'src/environments/routes';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private mailService: MailServicesService
  ) { }

  ngOnInit(): void {
  }

  public user = new UserModel();
  public mail = new EmailModel();
  public popUp = new Popups();
  public ro = new routes();

  forgotPassword(): void{
    try {
      this.userService
      .forgotPassword(this.user)
      .subscribe(
        res => {
          this.sendGmail(this.user.email, res.token);
          this.successAlert();
          // console.log(res)
        }, error => {
          console.log(error);
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  sendGmail(email: string, token: string): void{
    this.mail.to = email;
    this.mail.subject = 'Reset password link';
    this.mail.text = `your reset password link is given below \n`
    // +`Link is only valid for 5 minutes ➡ http://localhost:4200/reset-password/${token}`;
    +`Link is only valid for 5 minutes ➡ ${this.ro.webLink}/reset-password/${token}`;
    try {
      this.mailService
      .Gmail(this.mail)
      .subscribe(
        res => {
          // console.log(res);
          email = '';
        }, error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(): void{
    this.popUp.basicAlert(
      'Success!!!',
      'A password reset link is send on your email',
      'success'
    )
  }

}

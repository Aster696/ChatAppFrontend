import { Component, OnInit } from '@angular/core';
import { EmailModel } from 'src/Models/EmailModel';
import { UserModel } from 'src/Models/UserModel';
import { MailServicesService } from 'src/Services/MailService/mail-services.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { validate } from 'json-schema';
import { routes } from 'src/environments/routes';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private mailService: MailServicesService,
    private userService: UserServiceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.displayUserDetails();
  }

  public mail = new EmailModel();
  public user = new UserModel();
  public ro = new routes();

  formValidation = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    text: ['', [Validators.required, Validators.minLength(5)]]
  });

  get name(){
    return this.formValidation.get('name');
  }

  get email(){
    return this.formValidation.get('email');
  }

  get subject(){
    return this.formValidation.get('subject');
  }

  get text(){
    return this.formValidation.get('text');
  }

  displayUserDetails(): void{
    try {
      this.userService
      .displayUserById(this.userService.getId())
      .subscribe(
        data => this.user = data,
        error => console.log(error.message)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  onSubmit(): void{
    this.mail.to = this.ro.mail;
    this.mail.subject = `Chat App Feedback by ${this.formValidation.value.name}`;
    this.mail.text = `Name - ${this.formValidation.value.name} \n`
    +`Email - ${this.formValidation.value.email} \n`
    +`Subject - ${this.formValidation.value.subject} \n`
    +`Message - ${this.formValidation.value.text} \n`;
    try {
      this.mailService
      .Gmail(this.mail)
      .subscribe(
        res => {
          this.formValidation.reset();
          // console.log(res)
        }, error => {
          console.log(error.message);
        }
      );
    } catch (error) {
      console.log(error.message)
    }
  }

}

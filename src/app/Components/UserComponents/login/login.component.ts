import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  public user = new UserModel();
  public pop = new Popups();

  ngOnInit(): void {
  }

  formValidation = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get email() {
    return this.formValidation.get('email');
  }

  get password() {
    return this.formValidation.get('password');
  }

  assignValue(): void{
    this.user.email = this.formValidation.value.email;
    this.user.password = this.formValidation.value.password;
  }

  onSubmit(): void{
    this.assignValue();
    try {
      this.userService
      .login(this.user)
      .subscribe(
        res => {
          localStorage.setItem('accessToken', res.accessToken);
          this.successAlert();
        },
        error => {
          if(error.status === 404 || 401) {
            this.invalidAlert();
          }
          if(error.status === 406){
            this.banAlert();
          }
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(): void{
    this.router.navigate(['/home']);
    this.pop.basicTimeAlert(
      'Welcome back!!!',
      '',
      'success',
      3000
    );
  }

  invalidAlert(): void{
    this.pop.basicAlert(
      'Invalid!!!',
      'Email or Password is invalid. If your new please signin',
      'warning'
    );
  }

  banAlert(): void{
    this.pop.basicAlert(
      'Ban!!!',
      'Your ban form the site. If there your ban by mistake please contact us on contactus page',
      'error'
    );
  }

}

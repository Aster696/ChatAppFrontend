import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { formPasswordValidator } from 'src/Services/FormValidators/formValidators';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  public user = new UserModel();
  public pop = new Popups();
  public formData = new FormData();

  public mobNumberPattern = '[0-9]{10}';
  public passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,18}';

  public selectedFile: File;
  public url: any;
  public msg: string;

  ngOnInit(): void {
    
  }

  formValidation = this.fb.group({
    avtar: [null],
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    conPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
  }, {
    validator: formPasswordValidator
  });

  get avtar() {
    return this.formValidation.get('avtar');
  }

  get userName() {
    return this.formValidation.get('userName');
  }

  get email() {
    return this.formValidation.get('email');
  }

  get mobile() {
    return this.formValidation.get('mobile');
  }

  get password() {
    return this.formValidation.get('password');
  }

  get conPassword() {
    return this.formValidation.get('conPassword');
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		const mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
  }

  getValues(): void{
    // this.user.avtar = this.imageData;
    // this.user.file = this.selectedFile;
    this.user.userName = this.formValidation.value.userName;
    this.user.email = this.formValidation.value.email;
    this.user.mobile = this.formValidation.value.mobile;
    this.user.password = this.formValidation.value.password;
    this.user.authority = 'user';
    this.user.status = 'offline';
  }

  //formdata
  getFormValue(): void{
    // this.getValues();
    this.formData.append('avtar', this.selectedFile);
    this.formData.append('userName', this.formValidation.value.userName);
    this.formData.append('email', this.formValidation.value.email);
    this.formData.append('mobile', this.formValidation.value.mobile);
    this.formData.append('password', this.formValidation.value.password);
  }

  onSubmit(): void{
    // this.getValues();
    this.getFormValue();
    try {
      this.userService
      .register(this.formData)
      .subscribe(
        res => {
          // console.log(res);
        },
        error => {
          // console.log(error);
          if(error.status === 201){
            this.successAlert();
          }
          if(error.status === 409) {
            this.userExistAlert();
          }
        }
      );
      // this.formValidation.reset();
      // this.imageData = '';
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(): void{
    this.pop.basicTimeAlert(
      'Success!!!',
      'You have successfully singed in to our website ',
      'success',
      2000
    );
    this.router.navigate(['/login']);
  }

  userExistAlert(): void{
    this.pop.basicAlert(
      'Email exist!!!',
      'Email already taken. If you are already a user you can login',
      'info'
    );
  }

  failedAlert(): void{
    this.pop.basicAlert(
      'Error!!!',
      'Something whent wrong please try again',
      'error'
    );
  }

}

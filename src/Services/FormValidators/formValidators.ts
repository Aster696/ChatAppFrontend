import { AbstractControl } from "@angular/forms";

export function formPasswordValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const conPassword = control.get('conPassword');

    if(password?.pristine || conPassword?.pristine){
        return null;
    }
    return password && conPassword && password.value !== conPassword.value ? {'misMatch': true}: null;

}
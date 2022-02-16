import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    type: new FormControl('', Validators.required)
  })

  constructor(private snackbar: MatSnackBar) {}

  onSubmit(){
    let password: string = this.form.get('password')?.value
    const regexLowercase = new RegExp(/[a-z]+/)
    const regexUppercase = new RegExp(/[A-Z]+/)
    const regexNumber = new RegExp(/[0-9]+/)
    const regexSymbol = new RegExp(/[^a-zA-Z0-9]/)

    // verify that passwords match
    if(password !== this.form.get('confirm')?.value){
      this.openSnackBar('Passwords do not match', 'Close')
      return
    }

    // verify that password is complex
    if(!regexSymbol.test(password) ||
       !regexLowercase.test(password) ||
       !regexUppercase.test(password) ||
       !regexNumber.test(password)){
      this.openSnackBar('Password must contain lowercase, uppercase, number, and symbol characters.', 'Close')
      return
    }

    // send data
    const output = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      type: this.form.get('type')?.value
    }

    console.log(output)
  }

  openSnackBar(message: string, action: string){
    this.snackbar.open(message, action, {duration: 3000, panelClass: 'snackbar'})
  }
}

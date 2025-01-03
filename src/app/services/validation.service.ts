import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  constructor() { }
  
  emailWarningMsg = "*Unzulässige Email";

  elementVisibility: any = {
    emailErrorVisible: false,
    userNameErrorVisislbe: false,
    passwordErrorVisible: false,
  };


/**
 * Boolean negation
 */
    toggleVisibility(key: string): void {
      this.elementVisibility[key] = !this.elementVisibility[key];
      //! Delete
      console.log("Toggle action");
      //! Delete
    }


  checkEmailPattern(email: any) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const matchEmailPattern = re.test(email.value.trim());
    return matchEmailPattern ? true : false;
  }


  checkEmail(email: any) {
    const patternDoesNotMatch = !this.checkEmailPattern(email);
    if(patternDoesNotMatch){
      this.elementVisibility.emailErrorVisible = true
    } else {
      this.elementVisibility.emailErrorVisible = false
    }
  }


  checkPassword(password: any) {
    if (password.value === "") {
      // put some logic here
    }
  }


  checkName(name: any) {
    if (name.value === "") {
      // Put some logic here.
    }
  }


  logSth() {
    console.log("Service is working");
  }
}

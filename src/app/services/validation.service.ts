import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  constructor() { }
  
  emailWarningMsg = "*Das ist eine Warnung";

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
      console.log(this.elementVisibility[key]);
    }


  checkEmailPattern(email: any) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const matchEmailPattern = re.test(email.value.trim());
    return matchEmailPattern ? true : false;
  }



  checkEmail(email: any) {
    const patternDoesNotMatch = !this.checkEmailPattern(email);
    if (email.value === "") {
      // Put some logic here
    } else if (patternDoesNotMatch) {
      email.value = "";
      console.log("Pattern does not match");
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

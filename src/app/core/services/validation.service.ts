import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  constructor() { }
  
  emailWarningMsg = "*Unzulässige Email";
  passwordWarningMsg = "* Passwort zu kurz"

  elementVisibility: any = {
    emailErrorVisible: false,
    userNameErrorVisislbe: false,
    passwordErrorVisible: false,
  };


  hideAllErrorMsgs(){
    for(let key in this.elementVisibility){
      this.elementVisibility[key] = false
    }
  }

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
    this.elementVisibility.passwordErrorVisible = 
      password.value.length < 8 ? true : false;
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

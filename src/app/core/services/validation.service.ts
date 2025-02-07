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


  checkEmailPattern(emailValue: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const matchEmailPattern = re.test(emailValue.trim());
    return matchEmailPattern ? true : false;
  }


  checkEmail(emailValue: string) {
    const patternDoesNotMatch = !this.checkEmailPattern(emailValue);
    if(patternDoesNotMatch){
      this.elementVisibility.emailErrorVisible = true
    } else {
      this.elementVisibility.emailErrorVisible = false
    }
  }


  checkPassword(passwordValue: string) {
    this.elementVisibility.passwordErrorVisible = 
      passwordValue.length < 8 ? true : false;
  }
  

  checkName(usernameValue: string) {
    if (usernameValue === "") {
      // Put some logic here.
    }
  }



}

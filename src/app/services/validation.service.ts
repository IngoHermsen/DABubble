import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  pwPlaceholder = "Passwort";
  emailPlaceholder = "beispielname@email.com";
  namePlaceholder = "Name";
  emailPlaceHolderGray = true;
  pwPlaceholderGray = true;
  namePlaceholderGray = true;
  pwPlaceholderRed = false;
  emailPlaceHolderRed = false;
  namePlaceholderRed = true;


  checkEmailPattern(email: any) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const matchEmailPattern = re.test(email.value.trim());
    return matchEmailPattern ? true : false;
  }


  setPlaceholderDefault(placeholder: 'emailPlaceholder' | 'pwPlaceholder' | "namePlaceholder", defaultTxt: string) {
    setTimeout(() => {
      if (placeholder === 'emailPlaceholder') {
        this.emailPlaceholder = defaultTxt;
        this.emailPlaceHolderGray = true;
      } else if (placeholder === 'pwPlaceholder') {
        this.pwPlaceholder = defaultTxt;
        this.pwPlaceholderGray = true;
      } else if (placeholder === 'namePlaceholder') {
        this.namePlaceholder = defaultTxt;
        this.namePlaceholderGray = true;
      }
    }, 2500);
  };



  warningTextAndColor(placeholder: 'emailPlaceholder' | 'pwPlaceholder' | "namePlaceholder", warningText: string) {
    if (placeholder === "emailPlaceholder") {
      this.emailPlaceholder = warningText;
      this.emailPlaceHolderRed = true;
      this.emailPlaceHolderGray = false;
    } else if (placeholder === "pwPlaceholder") {
      this.pwPlaceholder = warningText;
      this.pwPlaceholderRed = true;
      this.pwPlaceholderGray = false;
    } else if (placeholder === "namePlaceholder") {
      this.namePlaceholder = warningText;
      this.namePlaceholderRed = true;
      this.namePlaceholderGray = false;
    }
  }


  checkEmail(email: any) {
    const patternDoesNotMatch = !this.checkEmailPattern(email);
    if (email.value === "") {
      this.warningTextAndColor("emailPlaceholder", "Email is empty");
      this.setPlaceholderDefault("emailPlaceholder", "beispielname@email.com");
    } else if (patternDoesNotMatch) {
      email.value = "";
      this.warningTextAndColor("emailPlaceholder", "InvalidEmail");
      this.setPlaceholderDefault("emailPlaceholder", "beispielname@email.com");
      console.log("Pattern does not match");
    }
  }


  checkPassword(password: any) {
    if (password.value === "") {
      this.warningTextAndColor("pwPlaceholder", "Password is empty");
      this.setPlaceholderDefault("pwPlaceholder", "Passwort");
    }
  }

  checkName(name: any) {
    if (name.value === "")
    this.warningTextAndColor("namePlaceholder", "Name is empty");
    this.setPlaceholderDefault("namePlaceholder", "Name");
  }

  logSth() {
    console.log("Service is working");
  }
}

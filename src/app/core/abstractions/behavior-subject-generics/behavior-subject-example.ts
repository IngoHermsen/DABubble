import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Component(
  {
    template: ""
  }
)
export class BehaviorSubjectExample {

  private myBehaviorSubject = new BehaviorSubject<string>("initial String");

  constructor() {
    console.log("BehaviorSubject Class is working");


    this.myBehaviorSubject.next("***1");
    this.myBehaviorSubject.next("***3");
    this.myBehaviorSubject.next("***2");


    this.myBehaviorSubject.subscribe((value) => {
      console.log("First subscriber here: " + value);
    });

    this.myBehaviorSubject.subscribe((value) => {
      console.log("Second subscriber here: " + value);
    });

    this.myBehaviorSubject.subscribe((value) => {
      console.log("Third subscriber here: " + value);
    });
  }

}
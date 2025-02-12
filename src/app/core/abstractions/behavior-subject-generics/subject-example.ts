import { Subject, BehaviorSubject } from "rxjs";
import { Component, OnInit } from "@angular/core";



@Component({
  template: "<span> hello World</span>"
})
export class SubjectExample {
  private mySubject = new Subject<string>();
  private myBehaviorSubject = new BehaviorSubject<string | null>("initial String");

  constructor() {

    // subscriber 1 hitting the stage
    this.mySubject.subscribe(
      value => {
        console.log("Subscriber One:" + value);
      }
    );

    // My subject is getting Values
    this.mySubject.next("1");
    this.mySubject.next("2");
    this.mySubject.next("3");


    // Subscriber 2 Starting
    this.subscriber2();
  }


  // Subscriber 2 will only get the new Value <4, 5, 6>
  subscriber2() {
    setTimeout(() => {
      console.log("Now comes subscriber Two__");
      this.mySubject.subscribe(
        value => {
          console.log("Subscriber Two__:" + value);
        }
      );
      this.mySubject.next("4");
      this.mySubject.next("5");
      this.mySubject.next("6");
    }, 2000);
  }

}


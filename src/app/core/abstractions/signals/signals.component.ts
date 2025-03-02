import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  
  //§ With Variable
  //counter = 0

  //§ With signal
  // Counter is now a container that wraps a number
  counter = signal(0)

  increment(){
    // this.counter++
    this.counter.set(this.counter() + 1)

  }
}

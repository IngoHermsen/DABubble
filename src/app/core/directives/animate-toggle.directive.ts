import { Directive, HostBinding, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Directive({
  selector: '[appAnimateToggle]',
  standalone: true
})
export class AnimateToggleDirective {

  constructor() { }

}

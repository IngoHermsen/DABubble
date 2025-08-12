import { Directive } from '@angular/core';

@Directive({
  selector: '[appLoadingIndicator]',
  standalone: true
})
export class LoadingIndicatorDirective {

  constructor() { }

}

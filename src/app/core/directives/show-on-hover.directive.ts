import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowOnHover]',
  standalone: true,
})

export class ShowOnHoverDirective {
  constructor(private el: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
      this.el.nativeElement.classList.remove('hideBtn');
      this.el.nativeElement.classList.add('showBtn');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove('showBtn');
    this.el.nativeElement.classList.add('hideBtn');


  }
}


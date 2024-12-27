import { Directive, ElementRef, HostListener } from '@angular/core';
import { inject } from '@angular/core';

@Directive({
  selector: '[appShowOnHover]',
  standalone: true,
})

export class ShowOnHoverDirective {
  private el = inject(ElementRef)


  @HostListener('mouseenter') onMouseEnter() {
      this.el.nativeElement.classList.remove('hideBtn');
      this.el.nativeElement.classList.add('showBtn');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove('showBtn');
    this.el.nativeElement.classList.add('hideBtn');

  }
}


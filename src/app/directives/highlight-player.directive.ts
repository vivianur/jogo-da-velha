import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightPlayer]',
  standalone: true
})
export class HighlightPlayerDirective {
  @Input() appHighlightPlayer!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.appHighlightPlayer === 'X') {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    } else if (this.appHighlightPlayer === 'O') {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }
}

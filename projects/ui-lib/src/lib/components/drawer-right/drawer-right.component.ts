import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'csgp-drawer-right',
  templateUrl: './drawer-right.component.html',
  styleUrls: ['./drawer-right.component.scss'],
  animations: [
    trigger('showDrawer', [
      state('true', style({ transform: 'translateX(0)', visibility: AUTO_STYLE })),
      state('false', style({ transform: 'translateX(100%)', visibility: 'hidden' })),
      transition('false => true',  animate('200ms')),
      transition('true => false', animate('200ms'))
    ])
  ]
})
export class DrawerRightComponent {
  @Input()
  public title: string = "";

  @Input()
  public description: string = "";

  @Input()
  public show: boolean = false;

  @Input()
  public closeOnOutsideClick: boolean = true;

  @Input()
  public sourceHtmlSelector: string;

  @Output()
  public showChange = new EventEmitter<boolean>();
  
  public closeDrawer() {
    this.show = false;
    this.showChange.emit(false);
  }

  @HostListener('document:click', ['$event'])
  private onClick(event) {
    if (this.show && this.closeOnOutsideClick) {
        const element = document.querySelector('.csgp-drawer-right');
        const src = document.querySelector(this.sourceHtmlSelector);
        const isDrawerItself = element?.contains(event.target);
        const isSource = src?.contains(event.target);

        if (!isDrawerItself && !isSource) {  
          this.closeDrawer();
        }
    }
  }
}
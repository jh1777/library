import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO } from './drawer-right-cs.component.iio.interface';
import { DrawerRightStore } from './drawer-right-cs.component.store';

@Component({
  selector: 'csgp-drawer-right',
  templateUrl: './drawer-right-cs.component.html',
  styleUrls: ['./drawer-right-cs.component.scss'],
  providers: [DrawerRightStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showDrawer', [
      state('true', style({ transform: 'translateX(0)', visibility: AUTO_STYLE })),
      state('false', style({ transform: 'translateX(100%)', visibility: 'hidden' })),
      transition('false => true',  animate('200ms')),
      transition('true => false', animate('200ms'))
    ])
  ]
})
export class DrawerRightComponentCS {

  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.drawerRightStore);
      this.drawerRightStore.show$.subscribe(this._show);
    }
  }

  private _show = new BehaviorSubject(false);

  constructor(
    public readonly drawerRightStore: DrawerRightStore
  ) {}

  
  public closeDrawer() {
    this.drawerRightStore.setShow(false);
  }

  @HostListener('document:click', ['$event'])
  private onClick(event) {
    const element = document.querySelector('#csgp-drawer-right-selector');
    if (this._show.value == true && !element.contains(event.target)) {
      this.closeDrawer();
    }
  }
}
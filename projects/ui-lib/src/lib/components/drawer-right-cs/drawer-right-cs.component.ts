import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO } from './drawer-right-cs.component.iio.interface';
import { DrawerRightStore } from './drawer-right-cs.component.store';

@Component({
  selector: 'csgp-drawer-right-cs',
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
export class DrawerRightComponentCS implements OnInit {

  private _initializedCallBack: (storeReference: IIO) => void;

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.drawerRightStore);
    }
  }

  @Input() public set title(value: string) {
    this.drawerRightStore.mergeValueIntoState({
      title: value
    });
  }

  @Input() public set show(value: boolean) {
    this.drawerRightStore.mergeValueIntoState({
      show: value
    });
  }

  @Input() public set description(value: string) {
    this.drawerRightStore.mergeValueIntoState({
      description: value
    });
  }

  @Input() public set sourceHtmlSelector(value: string) {
    this.drawerRightStore.mergeValueIntoState({
      sourceHtmlSelector: value
    });
  }

  private _show = new BehaviorSubject(false);

  constructor(
    public readonly drawerRightStore: DrawerRightStore
  ) {}

  ngOnInit(): void {
    this.drawerRightStore.show$.subscribe({
       next: (value) => {
         this._show.next(value);
       }
     });
   }

  public closeDrawer() {
    this.drawerRightStore.setShow(false);
  }

  @HostListener('document:click', ['$event'])
  private onClick(event) {
    if (this._show) {
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
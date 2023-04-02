import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO } from './drawer-entry-cs.component.iio.interface';
import { DrawerEntryStore } from './drawer-entry-cs.component.store';

@Component({
  selector: 'csgp-drawer-entry-cs',
  templateUrl: './drawer-entry-cs.component.html',
  styleUrls: ['./drawer-entry-cs.component.scss'],
  providers: [DrawerEntryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerEntryComponentCS {
  public placeholder = "◼︎◼︎ ";

  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.drawerEntryStore);
      this.drawerEntryStore.isLoading$.subscribe(this._isLoading);
      this.drawerEntryStore.isIconClickable$.subscribe(this._isIconClickable);
    }
  }


  // OUTPUT

  @Output()
  public onErrorClick = new EventEmitter<void>();
  @Output()
  public onIconClick = new EventEmitter<void>();
  
  private _isLoading = new BehaviorSubject(false);
  private _isIconClickable = new BehaviorSubject(null);
  
  constructor(
    public readonly drawerEntryStore: DrawerEntryStore
  ) {}

  public errorClicked() {
    this.onErrorClick.emit();
  }

  public iconClicked() {
    if (this._isIconClickable.value) {
      this.onIconClick.emit();
    }
  }
}
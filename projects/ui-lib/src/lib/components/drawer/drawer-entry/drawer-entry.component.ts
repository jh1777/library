import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentErrorModel } from '../../../models/shared/component-error.model';
import { DrawerEntryModel } from './drawer-entry.component.model';

@Component({
  selector: 'csgp-drawer-entry',
  templateUrl: './drawer-entry.component.html',
  styleUrls: ['./drawer-entry.component.scss']
})
export class DrawerEntryComponent {
  public placeholder = "◼︎◼︎ ";

  @Input()
  public data: DrawerEntryModel;
  @Input()
  public isLoading: boolean = false;
  @Input()
  public errorData?: ComponentErrorModel;


  @Output()
  public onErrorClick = new EventEmitter<ComponentErrorModel>();
  @Output()
  public onIconClick = new EventEmitter<DrawerEntryModel>();
  
  public errorClicked($event: any) {
    this.onErrorClick.emit(this.errorData);
  }

  public iconClicked() {
    if (this.data?.titleIcon?.isClickable) {
      this.onIconClick.emit(this.data);
    }
  }
}

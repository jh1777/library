import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';

@Component({
  selector: 'csgp-drawer-entry',
  templateUrl: './drawer-entry.component.html',
  styleUrls: ['./drawer-entry.component.scss']
})
export class DrawerEntryComponent {
  public placeholder = "◼︎◼︎ ";

  @Input()
  title: string = "";

  @Input()
  titleIcon: IconModel;

  @Input()
  subtitle?: string;

  @Input()
  progressPercent: number = 0;

  @Input()
  progressColor?: string;

  @Input()
  showProgress: boolean = true;

  @Input()
  progressStatusLabel?: string;
  
  @Input()
  description?: string;

  @Input()
  public isLoading: boolean = false;

  @Input()
  public errorData?: ComponentErrorModel;

  @Input()
  public id?: any;

  @Output()
  public onErrorClick = new EventEmitter<ComponentErrorModel>();
  @Output()
  public onIconClick = new EventEmitter<any>();
  
  public errorClicked($event: any) {
    this.onErrorClick.emit(this.errorData);
  }

  public iconClicked() {
    if (this.titleIcon?.isClickable) {
      this.onIconClick.emit(this.id);
    }
  }
}

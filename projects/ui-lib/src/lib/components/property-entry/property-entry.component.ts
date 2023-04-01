import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { PropertyEntryModel, PropertyEntryOptions } from './property-entry.component.model';

@Component({
  selector: 'csgp-property-entry',
  templateUrl: './property-entry.component.html',
  styleUrls: ['./property-entry.component.scss']
})
export class PropertyEntryComponent {

  public placeholder = "◼︎◼︎ ";

  @Input()
  public isLoading: boolean = false;
  @Input()
  public errorData?: ComponentErrorModel;
  @Input()
  public data?: PropertyEntryModel;

  // OUTPUTS 

  @Output()
  public onErrorClick = new EventEmitter<ComponentErrorModel>();
  @Output()
  public onIconClick = new EventEmitter<PropertyEntryOptions>();

  public errorClicked($event: any) {
    this.onErrorClick.emit(this.errorData);
  }

  public iconClicked(item: PropertyEntryOptions) {
    if (item?.icon?.isClickable) {
      this.onIconClick.emit(item);
    }
  }
}
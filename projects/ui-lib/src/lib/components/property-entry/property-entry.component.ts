import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';

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

  // Left main label
  @Input()
  label: string;
  @Input()
  labelStyle?: string;
  @Input()
  labelIcon?: IconModel;

  // Left subtitle
  @Input()
  subtitle: string;
  @Input()
  subtitleStyle?: string;
  @Input()
  subtitleIcon?: IconModel;

  // Right main value (if value and valueSubtitle are not present the right column will not be shown)
  @Input()
  value: string;
  @Input()
  valueStyle?: string;
  @Input()
  valueIcon?: IconModel;

  // Right value subtitle
  @Input()
  valueSubtitle: string;
  @Input()
  valueSubtitleStyle?: string;
  @Input()
  valueSubtitleIcon?: IconModel;

  @Input()
  id?: any;

  // OUTPUTS 

  @Output()
  public onErrorClick = new EventEmitter<ComponentErrorModel>();
  @Output()
  public onIconClick = new EventEmitter<any>();

  public errorClicked($event: any) {
    this.onErrorClick.emit(this.errorData);
  }

  public iconClicked(item: IconModel) {
    if (item?.isClickable) {
      this.onIconClick.emit(this.id);
    }
  }
}
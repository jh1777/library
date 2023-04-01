import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { MetricEntryLabelOptions, MetricEntryModel } from './metric-entry.component.model';

@Component({
  selector: 'csgp-metric-entry',
  templateUrl: './metric-entry.component.html',
  styleUrls: ['./metric-entry.component.scss']
})
export class MetricEntryComponent {
  public placeholder = "◼︎◼︎ ";

  @Input()
  public isLoading: boolean = false;
  @Input()
  public errorData?: ComponentErrorModel;
  @Input()
  public data?: MetricEntryModel;

  // OUTPUTS 

  @Output()
  public onErrorClick = new EventEmitter<ComponentErrorModel>();
  @Output()
  public onIconClick = new EventEmitter<MetricEntryLabelOptions>();
  
  public errorClicked($event: any) {
    this.onErrorClick.emit(this.errorData);
  }

  public iconClicked(item: MetricEntryLabelOptions) {
    if (item?.icon?.isClickable) {
      this.onIconClick.emit(item);
    }
  }
}
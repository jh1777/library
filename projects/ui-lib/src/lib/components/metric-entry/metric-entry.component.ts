import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';

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
  label: string = "Metric";

  @Input()
  // your can set a custom style for the label like 'font-weight: 800; color: red;' for example
  labelStyle?: string;

  @Input()
  // ICon definitaion of optional icon shown next to the label
  labelIcon?: IconModel;

  @Input()
  // Value to show (mandatory)
  metricValue: number = 0;

  @Input()
  // Optional percent value; if not specified the bar is not shown and all labels / text are displayed in large font
  metricPercent?: number;

  @Input()
  // This indicates if the percentage shall be shown next to the metricValue (no influence on the bar or others)
  showMetricPercantageLabel: boolean = true;
  
  @Input()
  // color of metric value label and bar - default is 'darkgray'
  metricColor?: string;

  @Input()
  // This will be displayed between the metricValue and metricPercent
  metricAdditionalLabel?: string;

  // OUTPUTS 

  @Output()
  public onErrorClick = new EventEmitter<ComponentErrorModel>();
  @Output()
  public onIconClick = new EventEmitter<IconModel>();
  
  public errorClicked($event: any) {
    this.onErrorClick.emit(this.errorData);
  }

  public iconClicked(item: IconModel) {
    if (item?.isClickable) {
      this.onIconClick.emit(item);
    }
  }
}
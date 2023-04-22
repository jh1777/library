import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';
import { IIO } from './metric-entry-cs.component.iio.interface';
import { MetricEntryStore } from './metric-entry-cs.component.store';

@Component({
  selector: 'csgp-metric-entry-cs',
  templateUrl: './metric-entry-cs.component.html',
  styleUrls: ['./metric-entry-cs.component.scss'],
  providers: [MetricEntryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricEntryComponentCS implements OnInit {
  public placeholder = "◼︎◼︎ ";

  private _initializedCallBack: (storeReference: IIO) => void;

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.metricEntryStore);
    }
  }

  @Input() public set isLoading(value: boolean) {
    this.metricEntryStore.mergeValueIntoState({
      isLoading: value
    });
  }

  @Input() public set errorData(value: ComponentErrorModel) {
    this.metricEntryStore.mergeValueIntoState({
      errorData: value
    });
  }

  @Input() public set label(value: string) {
    this.metricEntryStore.mergeValueIntoState({
      label: value
    });
  }

  @Input() public set labelStyle(value: string) {
    this.metricEntryStore.mergeValueIntoState({
      labelStyle: value
    });
  }

  @Input() public set labelIcon(value: IconModel) {
    this.metricEntryStore.mergeValueIntoState({
      labelIcon: value
    });
  }
  
  @Input() public set metricValue(value: number) {
    this.metricEntryStore.mergeValueIntoState({
      metricValue: value
    });
  }
  
  @Input() public set metricPercent(value: number) {
    this.metricEntryStore.mergeValueIntoState({
      metricPercent: value
    });
  }

  @Input() public set metricColor(value: string) {
    this.metricEntryStore.mergeValueIntoState({
      metricColor: value
    });
  }

  @Input() public set showMetricPercantageLabel(value: boolean) {
    this.metricEntryStore.mergeValueIntoState({
      showMetricPercantageLabel: value
    });
  }

  @Input() public set metricAdditionalLabel(value: string) {
    this.metricEntryStore.mergeValueIntoState({
      metricAdditionalLabel: value
    });
  }

  // OUTPUTS 
  @Output()
  public onErrorClick = new EventEmitter<void>();
  @Output()
  public onIconClick = new EventEmitter<void>();
  
  private _isIconClickable = new BehaviorSubject(true);

  constructor(
    public readonly metricEntryStore: MetricEntryStore
  ) { }

  ngOnInit(): void {
    this.metricEntryStore.labelIconClickable$.subscribe({
      next: (value) => {
        this._isIconClickable.next(value);
      }
    });
  }

  public errorClicked() {
    this.onErrorClick.emit();
  }

  public iconClicked() {
    if (this._isIconClickable.value) {
      this.onIconClick.emit();
    }
  }
  
}
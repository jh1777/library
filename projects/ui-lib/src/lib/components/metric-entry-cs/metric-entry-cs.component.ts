import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO } from './metric-entry-cs.component.iio.interface';
import { MetricEntryStore } from './metric-entry-cs.component.store';

@Component({
  selector: 'csgp-metric-entry-cs',
  templateUrl: './metric-entry-cs.component.html',
  styleUrls: ['./metric-entry-cs.component.scss'],
  providers: [MetricEntryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricEntryComponentCS {
  public placeholder = "◼︎◼︎ ";

  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.metricEntryStore);
      this.metricEntryStore.isLoading$.subscribe(this._isLoading);
      this.metricEntryStore.labelIconClickable$.subscribe(this._isIconClickable);
    }
  }

  // OUTPUTS 
  @Output()
  public onErrorClick = new EventEmitter<void>();
  @Output()
  public onIconClick = new EventEmitter<void>();
  

  private _isLoading = new BehaviorSubject(false);
  private _isIconClickable = new BehaviorSubject(true);

  constructor(
    public readonly metricEntryStore: MetricEntryStore
  ) { }

  public errorClicked() {
    this.onErrorClick.emit();
  }

  public iconClicked() {
    if (this._isIconClickable.value) {
      this.onIconClick.emit();
    }
  }
  
}
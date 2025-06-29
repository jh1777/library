import { ChangeDetectionStrategy, Component, effect, input, model } from '@angular/core';
import { UIBaseComponent, UiErrorComponent } from '../../shared';
import { EntryMetricStyle } from './entry-metric.models';

@Component({
  selector: 'ui-entry-metric',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiErrorComponent],
  templateUrl: './entry-metric.component.html',
  styleUrl: './entry-metric.component.scss'
})
export class EntryMetricComponent extends UIBaseComponent {

  constructor() {
    super();
    effect(() => {
      if (this.percent() > 100) {
        this.percent.set(100);
      }
    });
  }

  /** Value to show 0 - 100 */
  percent = model<number>(0);
  
    /** Optional: Style `EntryMetricStyle` of the metric (`none`, `attention`, `error` or `success`) 
   * By default or if unset, it is none.
   * The bar will get colorized in:
   * - `None` = default, 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   * See {@link EntryMetricStyle}
  */
  style = input<EntryMetricStyle>(EntryMetricStyle.None);
}

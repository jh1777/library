import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { EntryMetricStyle } from './entry-metric.models';

@Component({
  selector: 'ui-entry-metric',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './entry-metric.component.html',
  styleUrl: './entry-metric.component.scss'
})
export class EntryMetricComponent extends UIBaseComponent {

  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);

  /** Value to show 0 - 100 */
  percent = input<number>(0);
  
    /** Optional: State `EntryMetricStyle` of the metric (`none`, `attention`, `error` or `success`) 
   * By default or if unset, it is none.
   * The bar will get colorized in:
   * - `None` = default, 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
  */
  style = input<EntryMetricStyle>(EntryMetricStyle.None);
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { PropertyMetricStyle } from './property-metric.models';

@Component({
  selector: 'ui-property-metric',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './property-metric.component.html',
  styleUrl: './property-metric.component.scss'
})
export class PropertyMetricComponent extends UIBaseComponent {

  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);

  /** Value to show 0 - 100 */
  percent = input<number>(0);
  
    /** Optional: State `PropertyMetricStyle` of the metric (`none`, `attention`, `error` or `success`) 
   * By default or if unset, it is none.
   * The bar will get colorized in:
   * - `None` = default, 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
  */
  style = input<PropertyMetricStyle>(PropertyMetricStyle.None);
}

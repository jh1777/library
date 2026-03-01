import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'uic-chart-axis',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styles: ':host { display: none;}'
})
export class ChartAxisComponent extends UIBaseComponent {
  location = input<'x' | 'y'>('x');
  showAxis = input<boolean>(true);
  showLabels = input<boolean>(true);
  labelOverflow = input<'none' | 'truncate' | 'hide'>('none');
}

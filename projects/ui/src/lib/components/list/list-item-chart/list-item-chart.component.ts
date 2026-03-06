import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'ui-list-item-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './list-item-chart.component.html',
  styleUrls: ['./list-item-chart.component.scss']
})
export class ListItemChartComponent extends UIBaseComponent {
  label = input<string>('');
}

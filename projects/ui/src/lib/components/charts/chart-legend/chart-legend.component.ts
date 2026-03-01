import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { ChartLegendItem, ChartLegendPosition } from '../chart.models';

@Component({
  selector: 'ui-chart-legend',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chart-legend.component.html',
  styleUrl: './chart-legend.component.scss'
})
export class ChartLegendComponent {
  items = model<ChartLegendItem[]>([]);
  position = input<ChartLegendPosition>('bottom');
}

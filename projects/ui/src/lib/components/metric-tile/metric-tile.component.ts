import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { EntryContainerComponent } from '../entry-container';

@Component({
  selector: 'ui-metric-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './metric-tile.component.html',
  styleUrl: './metric-tile.component.scss'
})
export class MetricTileComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(EntryContainerComponent) metrics: QueryList<EntryContainerComponent>;

  maxMetrics = signal(5);
  
  ngAfterContentInit(): void {
    super.limitContentChildren(this.metrics, this.maxMetrics());

    this.metrics.forEach(metric => {
      metric.maxKeyValues.set(1);
      metric.maxMetrics.set(1);
    });
  }

  header = input.required<string>();
}
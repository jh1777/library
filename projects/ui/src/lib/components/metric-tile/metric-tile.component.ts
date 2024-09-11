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
  
  /**
   * Header of the Metrics Tile
   */
  header = input.required<string>();

  /**
   * The description of this Metric Tile  
   * It will be shown directly below the header, above the Tile content  
   * (optional)
   */
  description = input<string>();
}
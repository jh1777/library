import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { EntryKeyValueComponent } from '../entry-tile';
import { EntryMetricComponent } from '../entry-metric';

@Component({
  selector: 'ui-entry-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './entry-container.component.html',
  styleUrl: './entry-container.component.scss'
})
export class EntryContainerComponent extends UIBaseComponent {
  @ContentChildren(EntryKeyValueComponent) keyvalues: QueryList<EntryKeyValueComponent>;
  @ContentChildren(EntryMetricComponent) metrics: QueryList<EntryMetricComponent>;

  maxKeyValues = signal(2);
  maxMetrics = signal(1);

  ngAfterContentInit(): void {
    super.limitContentChildren(this.keyvalues, this.maxKeyValues());
    super.limitContentChildren(this.metrics, this.maxMetrics());
  }
}
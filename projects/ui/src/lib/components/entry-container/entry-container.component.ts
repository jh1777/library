import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
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

  ngAfterContentInit(): void {
    super.limitContentChildren(this.keyvalues, 2);
    super.limitContentChildren(this.metrics, 1);
  }
}
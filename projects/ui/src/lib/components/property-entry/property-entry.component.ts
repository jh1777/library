import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { EntryKeyValueComponent } from '../entry-tile';
import { PropertyMetricComponent } from '../property-metric';

@Component({
  selector: 'ui-property-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './property-entry.component.html',
  styleUrl: './property-entry.component.scss'
})
export class PropertyEntryComponent extends UIBaseComponent {
  @ContentChildren(EntryKeyValueComponent) keyvalues: QueryList<EntryKeyValueComponent>;
  @ContentChildren(PropertyMetricComponent) metrics: QueryList<PropertyMetricComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren(this.keyvalues, 2);
    super.limitContentChildren(this.metrics, 1);
  }
}

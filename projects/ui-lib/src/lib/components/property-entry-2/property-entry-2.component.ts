import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { UIBaseComponent } from '../../base/ui-base.component';
import { EntryKeyValueComponent } from '../entry-tile-3';
import { PropertyMetricComponent } from '../property-metric/property-metric.component';

@Component({
  selector: 'ui-property-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './property-entry-2.component.html',
  styleUrl: './property-entry-2.component.scss'
})
export class PropertyEntry2Component extends UIBaseComponent {
  @ContentChildren(EntryKeyValueComponent) keyvalues: QueryList<EntryKeyValueComponent>;
  @ContentChildren(PropertyMetricComponent) metrics: QueryList<PropertyMetricComponent>;

  ngAfterContentInit(): void {
    if (this.keyvalues.length > 1) {
      console.error("Maximum number of key values in a component is 2");
    }
    for (let index = 0; index < this.keyvalues.length; index++) {
      const element = this.keyvalues.get(index);
      if (index > 1) {
        element.hidden.set(true);
      }
    }

    if (this.metrics.length > 1) {
      console.error("Maximum number of metrics in a component is 1");
    }
    for (let index = 0; index < this.metrics.length; index++) {
      const element = this.metrics.get(index);
      if (index > 1) {
        element.hidden.set(true);
      }
    }
  }

}

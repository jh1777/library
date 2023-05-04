import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { PropertyEntryComponent } from '../property-entry';

@Component({
  selector: 'app-grid-test-2',
  templateUrl: './grid-test-2.component.html',
  styleUrls: ['./grid-test-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GridTestComponent2  {
  @ContentChildren(PropertyEntryComponent) children: QueryList<PropertyEntryComponent>;

  @Input()
  cols: number;

  @Input()
  rows: number;
}
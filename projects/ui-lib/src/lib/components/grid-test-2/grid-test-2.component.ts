import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { PropertyEntryComponent } from '../property-entry';

@Component({
  selector: 'app-grid-test-2',
  templateUrl: './grid-test-2.component.html',
  styleUrls: ['./grid-test-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/*
export class GridTestComponent2 implements AfterContentInit {

  @ContentChildren(PropertyEntryComponent) items: QueryList<any>;

  ngAfterContentInit() {

    console.log(this.items);

    this.items.forEach(item => {
      
      console.log(item.data);
    });
  
  }

}
*/

export class GridTestComponent2 implements AfterViewInit {
  @ContentChildren(PropertyEntryComponent) children: QueryList<PropertyEntryComponent>;

  rows: PropertyEntryComponent[][] = [];

  ngAfterViewInit() {
    this.layoutChildren();
  }

  private layoutChildren() {
    this.rows = [];

    const children = this.children.toArray();

    const numColumns = 3; // set the number of columns here
    const numRows = Math.ceil(children.length / numColumns);

    for (let i = 0; i < numRows; i++) {
      const row = [];

      for (let j = 0; j < numColumns; j++) {
        const child = children[i * numColumns + j];
        if (child) {
          row.push(child);
        }
      }

      this.rows.push(row);
    }
  }
}
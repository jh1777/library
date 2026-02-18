import { ChangeDetectionStrategy, Component, ContentChildren, input, output, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponentInterface } from './list.models';

@Component({
  selector: 'ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UIBaseComponent {

  header = input<string>('List Header');
  
  private _data: ListComponentInterface = {};

  @ContentChildren(ListItemComponent) listItems!: QueryList<ListItemComponent>;

  /*
  updateData() {
    this.listItems.forEach(item => {
      // Example of updating the textValues based on the content of list items
      if (!this._data.textValues) {
        this._data.textValues = [];
      }
      this._data.textValues.push(item.text());
    });
  }
    */

  pushItem(item: Record<string, string>) {
    if (!this._data.textValues) {
      this._data.textValues = [];
    }
    if(this._data.textValues.map(i => i[Object.keys(i)[0]]).includes(item[Object.keys(item)[0]])) {
      return; // Item already exists, do not add it again
    }
    this._data.textValues.push(item);
    console.log('Item pushed:', item);  
  }

}
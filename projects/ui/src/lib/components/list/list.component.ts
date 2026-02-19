import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, input, output, QueryList, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponentInterface } from './list.models';
import { faSortAlphaAsc, faSortAlphaDesc, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UIBaseComponent implements AfterContentInit {

  sortAscIcon = signal<IconDefinition>(faSortAlphaAsc);
  sortDescIcon = signal<IconDefinition>(faSortAlphaDesc);

  isSortable = input<boolean>(true);
  header = input<string>('List Header');
  showIndex = input<'number' | 'bullet' | 'dash' | 'none'>('none');

  sortDirection = signal<'asc' | 'desc' | null>(null);
  
  private _data: ListComponentInterface = {};

  @ContentChildren(ListItemComponent) listItems!: QueryList<ListItemComponent>;

  ngAfterContentInit() {
    this.updateIndices();
    this.listItems.changes.subscribe(() => this.updateIndices());
  }

  private updateIndices() {
    if (this.sortDirection() === null) {
      // Original DOM order
      this.listItems.forEach((item, i) => item.index.set(i));
    } else {
      // Sorted order — indices follow visual position
      const sorted = [...this.listItems.toArray()].sort((a, b) => {
        const cmp = a.text().localeCompare(b.text());
        return this.sortDirection() === 'desc' ? -cmp : cmp;
      });
      sorted.forEach((item, i) => item.index.set(i));
    }
  }

  pushItem(key: string, value: string) {
    if (!this._data.textValues) {
      this._data.textValues = [];
    }
    if(this._data.textValues.some(record => record[key] === value)) {
      return;
    }
    this._data.textValues.push({ [key]: value });
    console.log('Item pushed:', this._data);  
  }

  sort() {
    // Cycle: null → asc → desc → null
    if (this.sortDirection() === null) {
      this.sortDirection.set('asc');
    } else if (this.sortDirection() === 'asc') {
      this.sortDirection.set('desc');
    } else {
      this.sortDirection.set(null);
    }
    this.applySortOrder();
  }

  private applySortOrder() {
    const items = this.listItems.toArray();
    if (this.sortDirection() === null) {
      // Reset to original DOM order
      items.forEach((item, i) => {
        item.hostEl.nativeElement.style.order = '';
      });
    } else {
      const sorted = [...items].sort((a, b) => {
        const cmp = a.text().localeCompare(b.text());
        return this.sortDirection() === 'desc' ? -cmp : cmp;
      });
      sorted.forEach((item, i) => {
        item.hostEl.nativeElement.style.order = i;
      });
    }
    this.updateIndices();
  }
}
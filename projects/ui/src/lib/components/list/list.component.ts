import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, input, output, QueryList, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponentInterface } from './list.models';
import { faSortAlphaAsc, faSortAlphaDesc, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputComponent } from '../input';

@Component({
  selector: 'ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, InputComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UIBaseComponent implements AfterContentInit {

  sortAscIcon = signal<IconDefinition>(faSortAlphaAsc);
  sortDescIcon = signal<IconDefinition>(faSortAlphaDesc);

  isSortable = input<boolean>(true);
  header = input<string>('List Header');
  showIndex = input<'number' | 'bullet' | 'dash' | 'none'>('none');
  showItemSeparator = input<boolean>(true);
  showItemCount = input<boolean>(true);

  sortDirection = signal<'asc' | 'desc' | null>(null);

  isSearchable = input<boolean>(false);
  searchTerm = signal<string>('');


  
  private _data: ListComponentInterface = {};

  @ContentChildren(ListItemComponent) listItems!: QueryList<ListItemComponent>;

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
    console.log('Search term set to:', term);
    this.applySearchFilter();
  }

  private applySearchFilter() {
    const term = this.searchTerm().toLowerCase();
    this.listItems.forEach(item => {
      const matches = !term || item.text().toLowerCase().includes(term);
      item.isHidden.set(!matches);
    });
    this.applySortOrder();
  }

  ngAfterContentInit() {
    this.applySortOrder();
    this.listItems.changes.subscribe(() => this.applySortOrder());
  }

  /**
   * Single source of truth: applies sort order, indices, and isLast
   * taking both sort direction and search visibility into account.
   */
  private applySortOrder() {
    const all = this.listItems.toArray();
    const visible = all.filter(item => !item.isHidden());

    // Reset all items
    all.forEach(item => {
      item.isLast.set(false);
      item.hostEl.nativeElement.style.order = '';
    });

    if (this.sortDirection() === null) {
      // Original DOM order — just assign indices to visible items
      visible.forEach((item, i) => item.index.set(i));
    } else {
      // Sort visible items
      const sorted = [...visible].sort((a, b) => {
        const cmp = a.text().localeCompare(b.text());
        return this.sortDirection() === 'desc' ? -cmp : cmp;
      });
      sorted.forEach((item, i) => {
        item.index.set(i);
        item.hostEl.nativeElement.style.order = i;
      });
    }

    // Mark the last visible item
    if (visible.length) {
      const lastVisible = this.sortDirection() === null
        ? visible[visible.length - 1]
        : [...visible].sort((a, b) => {
            const cmp = a.text().localeCompare(b.text());
            return this.sortDirection() === 'desc' ? -cmp : cmp;
          }).pop()!;
      lastVisible.isLast.set(true);
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
}
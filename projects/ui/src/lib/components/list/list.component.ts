import { AfterContentInit, ChangeDetectionStrategy, Component, computed, ContentChildren, input, output, QueryList, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponentInterface } from './list.models';
import { faSortAlphaAsc, faSortAlphaDesc, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputComponent } from '../input';
import { ButtonComponent } from "ui";

@Component({
  selector: 'ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, InputComponent, ButtonComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ListItemComponent) listItems!: QueryList<ListItemComponent>;

  sortAscIcon = signal<IconDefinition>(faSortAlphaAsc);
  sortDescIcon = signal<IconDefinition>(faSortAlphaDesc);

  isSortable = input<boolean>(false);
  header = input.required<string>();
  description = input<string>('');
  showIndex = input<'number' | 'bullet' | 'dash' | 'none'>('none');
  showItemSeparator = input<boolean>(false);
  showItemCount = input<boolean>(true);
  itemCount = signal<number>(0);

  sortDirection = signal<'asc' | 'desc' | null>(null);

  isSearchable = input<boolean>(false);
  searchTerm = signal<string>('');
  preserveSelectedItem = input<boolean>(true);

  onItemClick = output<{ id: string; text: string; data: any }>();
  onDeselect = output<void>();

  selectedItem = computed(() => {
    const selected = this.listItems.find(item => item.isSelected());
    return selected?.text() || null;
  });

  deselectAll() {
    this.listItems.forEach(item => item.isSelected.set(false));
    this.onDeselect.emit();
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
    this.applySearchFilter();
  }

  private applySearchFilter() {
    const term = this.searchTerm().toLowerCase();
    this.listItems.forEach(item => {
      const matches = !term || item.text().toLowerCase().includes(term);
      item.isHidden.set(!matches);
    });
    this.itemCount.set(this.listItems.filter(item => !item.isHidden()).length);
    this.applySortOrder();
  }

  ngAfterContentInit() {
    this.applySearchFilter();
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
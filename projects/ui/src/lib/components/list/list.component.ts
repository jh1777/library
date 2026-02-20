import { AfterContentInit, ChangeDetectionStrategy, Component, computed, ContentChildren, input, output, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ListItemComponent } from './list-item/list-item.component';
import { faSortAlphaAsc, faSortAlphaDesc, faSortAmountAsc, faSortAmountDesc, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputComponent } from '../input';
import { ButtonComponent } from '../button';
import { ListItemKpiEntry } from './list.models';
import { ListFooterComponent } from './list-footer/list-footer.component';

@Component({
  selector: 'ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, InputComponent, ButtonComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ListItemComponent) listItems!: QueryList<ListItemComponent>;
  @ContentChildren(ListFooterComponent) listFooter!: QueryList<ListFooterComponent>;

  sortAscIcon = signal<IconDefinition>(faSortAlphaAsc);
  sortDescIcon = signal<IconDefinition>(faSortAlphaDesc);
  sortByNumberDesc = signal<IconDefinition>(faSortAmountDesc);
  sortByNumberAsc = signal<IconDefinition>(faSortAmountAsc);

  isSortable = input<boolean>(false);
  header = input.required<string>();
  description = input<string>('');
  showIndex = input<'number' | 'bullet' | 'dash' | 'none'>('none');
  showItemSeparator = input<boolean>(false);
  showItemCount = input<boolean>(true);
  itemCount = signal<number>(0);
  totalItemCount = signal<number>(0);
  isSearchable = input<boolean>(false);
  preserveSelectedItem = input<boolean>(true);

  sortMode = signal<'name' | 'kpi' | null>(null);
  nameSortDirection = signal<'asc' | 'desc' | null>(null);
  kpiSortDirection = signal<'asc' | 'desc' | null>(null);
  searchTerm = signal<string>('');

  hasFooter = computed(() => this.listFooter.length > 0);

  filteredOutCount = computed(() => {
    const total = this.totalItemCount();
    const visible = this.itemCount();
    return Math.max(0, total - visible);
  });

  footerSortLabel = computed(() => {
    if (this.sortMode() === null) {
      return '';
    }
    if (this.sortMode() === 'name') {
      const dir = this.nameSortDirection()?.toLocaleUpperCase();
      const dirLabel = dir === 'ASC' ? '↓' : dir === 'DESC' ? '↑' : '';
      return dir ? `(sorted by Name ${dirLabel})` : '';
    }
    const dir = this.kpiSortDirection()?.toLocaleUpperCase();
    const dirLabel = dir === 'ASC' ? '↓' : dir === 'DESC' ? '↑' : '';
    return dir ? `(sorted by KPI ${dirLabel})` : '';
  });

  onItemClick = output<{ id: string; text: string; data: any }>();
  onDeselect = output<void>();
  onSearchTermChange = output<string[]>();

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
    this.totalItemCount.set(this.listItems.length);
    const visibleItems = this.listItems.filter(item => !item.isHidden());
    this.itemCount.set(visibleItems.length);
    this.onSearchTermChange.emit(visibleItems.map(item => item.uuid));
    this.applySortOrder();
  }

  ngAfterContentInit() {
    this.applySearchFilter();
    this.listItems.changes.subscribe(() => this.applySearchFilter());
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

    let ordered = visible;

    if (this.sortMode() !== null) {
      ordered = [...visible].sort((a, b) => this.compareItems(a, b));
      ordered.forEach((item, i) => {
        item.hostEl.nativeElement.style.order = i;
      });
    }

    // Assign indices and mark last visible item
    ordered.forEach((item, i) => item.index.set(i));
    if (ordered.length) {
      ordered[ordered.length - 1].isLast.set(true);
    }
  }

  private compareItems(a: ListItemComponent, b: ListItemComponent): number {
    if (this.sortMode() === 'name') {
      const cmp = a.text().localeCompare(b.text());
      return this.nameSortDirection() === 'desc' ? -cmp : cmp;
    }

    const aVal = this.getKpiValue(a);
    const bVal = this.getKpiValue(b);

    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;

    const cmp = aVal - bVal;
    return this.kpiSortDirection() === 'asc' ? -cmp : cmp;
  }

  sort() {
    // Cycle: null → asc → desc → null
    this.sortMode.set('name');
    this.kpiSortDirection.set(null);
    if (this.nameSortDirection() === null) {
      this.nameSortDirection.set('asc');
    } else if (this.nameSortDirection() === 'asc') {
      this.nameSortDirection.set('desc');
    } else {
      this.nameSortDirection.set(null);
      this.sortMode.set(null);
    }
    this.applySortOrder();
  }

  sortByKpi() {
    // Cycle: null → asc → desc → null
    this.sortMode.set('kpi');
    this.nameSortDirection.set(null);
    if (this.kpiSortDirection() === null) {
      this.kpiSortDirection.set('asc');
    } else if (this.kpiSortDirection() === 'asc') {
      this.kpiSortDirection.set('desc');
    } else {
      this.kpiSortDirection.set(null);
      this.sortMode.set(null);
    }
    this.applySortOrder();
  }

  private getKpiValue(item: ListItemComponent): number | null {
    const kpis = item.kpis?.toArray() ?? [];
    if (!kpis.length) {
      return null;
    }
    const value = kpis[0].value();
    return value ?? null;
  }

  /**
   * Calculate summary KPI results for visible list items.
   * This is a helper method that can be used to display aggregate KPIs (like total or average) in the list footer.
   * @param type The type of KPI to calculate ('positive', 'negative', 'neutral').
   * @param calc The calculation method ('sum' or 'avg').
   * @returns The calculated KPI entry or null if no relevant KPIs are found.
   */
  calculateSummaryKpiResults(type: 'positive' | 'negative' | 'neutral', calc: 'sum' | 'avg'): ListItemKpiEntry | null {
    const visibleItems = this.listItems.filter(item => !item.isHidden());
    if (!visibleItems.length) {
      return null;
    }
    let result: ListItemKpiEntry = {
      value: null,
      label: calc === 'sum' ? `Total ${type}` : `Average ${type}`,
      refValue: null,
      delta: null,
      percentage: null,
      style: type
    };

    const kpiItems = visibleItems.map(item => item.kpis?.toArray() ?? []).flat();
    const relevantKpis = kpiItems.filter(kpi => kpi.style() === type);
    if (!relevantKpis.length) {
      return null;
    }

    // Value (sum or average)
    const values = relevantKpis.map(kpi => kpi.value()).filter(v => v !== null) as number[];
    const valuesSum = values.reduce((sum, v) => sum + v, 0);
    if (calc === 'avg') {
      result.value = valuesSum / values.length;
    } else {
      result.value = valuesSum;
    }

    // refValue (sum or average)
    const refValues = relevantKpis.map(kpi => kpi.refValue()).filter(v => v !== null) as number[];
    const refValuesSum = refValues.reduce((sum, v) => sum + v, 0);
    if (calc === 'avg') {
      result.refValue = refValuesSum / refValues.length;
    } else {
      result.refValue = refValuesSum;
    }
    
    // Delta
    if (result.value !== null && result.refValue !== null) {
      result.delta = result.value - result.refValue;
    }

    // Percentage
    if (result.value !== null && result.refValue !== null && result.refValue !== 0) {
      result.percentage = ((result.value - result.refValue) / Math.abs(result.refValue)) * 100;
    }
    return result;
  }

}
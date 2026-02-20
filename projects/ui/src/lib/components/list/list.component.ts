import { AfterContentInit, ChangeDetectionStrategy, Component, computed, ContentChildren, effect, input, output, QueryList, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ListItemComponent } from './list-item/list-item.component';
import { faSortAlphaAsc, faSortAlphaDesc, faSortAmountAsc, faSortAmountDesc, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputComponent } from '../input';
import { ButtonComponent } from '../button';
import { ListItemKpiComponent } from './list-item/item-kpi/list-item-kpi.component';
import { SwitchButtonComponent, SwitchButtonOptionComponent } from '../switch-button';
import { KpiSummaryCurrency, KpiSummaryEntry, KpiSummaryMode } from './list.models';

@Component({
  selector: 'ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, InputComponent, ButtonComponent, ListItemKpiComponent, SwitchButtonComponent, SwitchButtonOptionComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ListItemComponent) listItems!: QueryList<ListItemComponent>;

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

  showFooter = input<boolean>(true);
  showKpiSummary = input<boolean>(false);
  showKpiSummaryMode = input<boolean>(false);
  sortMode = signal<'name' | 'kpi' | null>(null);
  nameSortDirection = signal<'asc' | 'desc' | null>(null);
  kpiSortDirection = signal<'asc' | 'desc' | null>(null);

  summaryMode = signal<KpiSummaryMode>('sum');
  summaryKpis = signal<KpiSummaryEntry[]>([]);

  isSearchable = input<boolean>(false);
  searchTerm = signal<string>('');
  preserveSelectedItem = input<boolean>(true);

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

  selectedItem = computed(() => {
    const selected = this.listItems.find(item => item.isSelected());
    return selected?.text() || null;
  });

  constructor() {
    super();

    effect(() => {
      this.showKpiSummary();
      this.summaryMode();
      this.updateKpiSummary();
    });
  }

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
    this.itemCount.set(this.listItems.filter(item => !item.isHidden()).length);
    this.applySortOrder();
    this.updateKpiSummary();
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

    if (this.sortMode() === null) {
      // Original DOM order — just assign indices to visible items
      visible.forEach((item, i) => item.index.set(i));
    } else {
      // Sort visible items
      const sorted = [...visible].sort((a, b) => {
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
      });
      sorted.forEach((item, i) => {
        item.index.set(i);
        item.hostEl.nativeElement.style.order = i;
      });
    }

    // Mark the last visible item
    if (visible.length) {
      if (this.sortMode() === null) {
        visible[visible.length - 1].isLast.set(true);
      } else {
        const lastVisible = [...visible].sort((a, b) => {
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
          return this.kpiSortDirection() === 'desc' ? -cmp : cmp;
        }).pop()!;
        lastVisible.isLast.set(true);
      }
    }
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

  private updateKpiSummary() {
    if (!this.showKpiSummary() || !this.listItems) {
      this.summaryKpis.set([]);
      return;
    }

    const visibleItems = this.listItems.filter(item => !item.isHidden());
    const groups = new Map<'positive' | 'negative' | 'neutral', {
      style: 'positive' | 'negative' | 'neutral';
      values: number[];
      refValues: number[];
      currencies: Set<KpiSummaryCurrency>;
    }>();

    visibleItems.forEach(item => {
      const kpis = item.kpis?.toArray() ?? [];
      kpis.forEach(kpi => {
        const value = kpi.value();
        if (value === null || value === undefined) {
          return;
        }

        const style = kpi.style();
        if (!groups.has(style)) {
          groups.set(style, {
            style,
            values: [],
            refValues: [],
            currencies: new Set<KpiSummaryCurrency>()
          });
        }

        const group = groups.get(style)!;
        group.values.push(value);

        const refValue = kpi.refValue();
        if (refValue !== null && refValue !== undefined) {
          group.refValues.push(refValue);
        }

        group.currencies.add(kpi.currency());
      });
    });

    const mode = this.summaryMode();
    const summaryOrder: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral'];
    const summary = summaryOrder
      .filter(style => groups.has(style))
      .map(style => {
        const group = groups.get(style)!;
        const valueSum = group.values.reduce((acc, val) => acc + val, 0);
        const refSum = group.refValues.reduce((acc, val) => acc + val, 0);
        const value = mode === 'avg' ? valueSum / group.values.length : valueSum;
        const refValue = group.refValues.length
          ? (mode === 'avg' ? refSum / group.refValues.length : refSum)
          : null;

        const currency = group.currencies.size === 1
          ? Array.from(group.currencies)[0]
          : 'none';

        return {
          key: style,
          label: null,
          style,
          value,
          refValue,
          showDelta: false,
          showPercentage: true,
          currency
        } as KpiSummaryEntry;
      });

    this.summaryKpis.set(summary);
  }
}
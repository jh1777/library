import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { ListComponent } from '../list.component';

@Component({
  selector: 'ui-list-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './list-footer.component.html',
  styleUrls: ['./list-footer.component.scss']
})
export class ListFooterComponent extends UIBaseComponent {
  protected parentComponent = inject(ListComponent, { optional: true });

  itemCount = computed(() => this.parentComponent?.itemCount() ?? 0);
  filteredOutCount = computed(() => this.parentComponent?.filteredOutCount() ?? 0);
  hasSearchTerm = computed(() => !!this.parentComponent?.searchTerm());
  sortLabel = computed(() => this.parentComponent?.footerSortLabel() ?? '');
}

import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, effect, ElementRef, inject, input, output, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { ListComponent } from '../list.component';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../button';
import { ListItemKpiComponent } from './item-kpi/list-item-kpi.component';
import { ListItemKpiEntry } from '../list.models';

@Component({
  selector: 'ui-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    '[class.bordered]': 'parentComponent?.showItemSeparator() && !isHidden()',
    '[class.last]': 'isLast()'
  }
})
export class ListItemComponent extends UIBaseComponent implements AfterContentInit {
  protected parentComponent = inject(ListComponent, { optional: true });
  @ContentChildren(ButtonComponent) buttons!: QueryList<ButtonComponent>;
  @ContentChildren(ListItemKpiComponent) kpis!: QueryList<ListItemKpiComponent>;

  readonly hostEl = inject(ElementRef);

  infoIcon = signal(faInfoCircle);

  // get a GUID for the component instance
  uuid: string = '';
  // Index assigned by parent ListComponent
  index = signal<number>(0);
  isLast = signal<boolean>(false);
  // Input property for the text value of the list item
  text = input<string>('');

  isClickable = input<boolean>(false);
  isSelected = signal<boolean>(false);

  isHovered = signal<boolean>(false);

  constructor() {
    super();
    const uuid = crypto.randomUUID();
    effect(() => {
      if (!this.id()) {
        this.uuid = uuid;
      } else {
        this.uuid = this.id()!;
      }
    });

   
  }

  ngAfterContentInit(): void {
    this.buttons.forEach(button => {
      button.simpleOnly.set(true);
    });
  }

  protected setMarker(state: boolean) {
    this.isHovered.set(state);
  }

  itemClicked() {
    if (this.isClickable()) {
      let kpis: ListItemKpiEntry[] = [];
      if (this.kpis.length > 0) {
        this.kpis.forEach(kpi => {
          kpis.push(kpi.kpiData());
        });
      }
      if (this.parentComponent?.preserveSelectedItem()) {
        this.parentComponent?.listItems.forEach(item => item.isSelected.set(false));
        this.isSelected.set(true);
      }
      this.parentComponent?.onItemClick.emit({ id: this.uuid, text: this.text(), data: kpis });
    }
  }
}

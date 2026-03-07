import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, effect, ElementRef, inject, input, output, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { ListComponent } from '../list.component';
import { faInfoCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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

  icon = input<IconDefinition>();

  isClickable = input<boolean>(false);
  isSelected = signal<boolean>(false);

  isHovered = signal<boolean>(false);

  description = input<string>();

  private createUuid(): string {
    const cryptoApi = globalThis.crypto;

    if (cryptoApi?.randomUUID) {
      return cryptoApi.randomUUID();
    }

    if (cryptoApi?.getRandomValues) {
      const bytes = new Uint8Array(16);
      cryptoApi.getRandomValues(bytes);

      // RFC4122 version 4 UUID bits.
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;

      const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0'));
      return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
    }

    return `ui-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
  
  constructor() {
    super();
    const uuid = this.createUuid();
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

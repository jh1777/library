import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, output, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { ListComponent } from '../list.component';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
export class ListItemComponent extends UIBaseComponent {
  protected parentComponent = inject(ListComponent, { optional: true });
  readonly hostEl = inject(ElementRef);

  infoIcon = signal(faInfoCircle);

  // get a GUID for the component instance
  private uuid: string = "";
  // Index assigned by parent ListComponent
  index = signal<number>(0);
  isLast = signal<boolean>(false);
  // Input property for the text value of the list item
  text = input<string>('');

  isClickable = input<boolean>(false);

  isHovered = signal<boolean>(false);

  onClick = output<string>();

  constructor() {
    super();
    this.uuid = crypto.randomUUID();
    effect(() => {
      this.parentComponent?.pushItem(this.uuid, this.text());
    });
  }

  setMarker(state: boolean) {
    this.isHovered.set(state);
  }

  itemClicked() {
    if (this.isClickable()) {
      console.log('Item clicked:', this.text());
      this.onClick.emit(this.uuid);
    }
  }
}

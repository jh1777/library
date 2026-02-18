import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../../shared';
import { ListTextRecord } from '../list.models';
import { ListComponent } from '../list.component';


@Component({
  selector: 'ui-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent extends UIBaseComponent {
  private parentComponent = inject(ListComponent, { optional: true });

  // get a GUID for the component instance
  private uuid: string = "";
  // Input property for the text value of the list item
  text = input<string>('');

  constructor() {
    super();
    this.uuid = crypto.randomUUID();
    effect(() => {
      const item: ListTextRecord = { [this.uuid]: this.text() };
      this.parentComponent?.pushItem(item);
    });
  }

}

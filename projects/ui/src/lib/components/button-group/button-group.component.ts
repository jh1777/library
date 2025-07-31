import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { signal } from '@angular/core';

@Component({
  selector: 'ui-button-group',
  imports: [],
  standalone: true,
  templateUrl: './button-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent extends UIBaseComponent {

  multiselect = input<boolean>(false);

  items = input<Array<string>>([]);

  selectedItems = model<Array<string>>([]);

  onItemClick(item: string): void {
    if (this.multiselect()) {
      const index = this.selectedItems().indexOf(item);
      if (index > -1) {
        this.selectedItems.update(items => items.filter(i => i !== item));
      } else {
        this.selectedItems.update(items => [...items, item]);
      }
    } else {
      this.selectedItems.set([item]);
    }
  }

  

}

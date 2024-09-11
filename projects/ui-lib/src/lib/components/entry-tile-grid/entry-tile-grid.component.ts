import { AfterContentInit, Component, computed, input } from '@angular/core';
import { UIBaseComponent } from '../../base/ui-base.component';

@Component({
  selector: 'ui-entry-tile-grid',
  standalone: true,
  imports: [],
  templateUrl: './entry-tile-grid.component.html',
  styleUrl: './entry-tile-grid.component.scss'
})
export class EntryTileGridComponent extends UIBaseComponent implements AfterContentInit {

  columns = input.required<number>();

  calcColumns = computed(() => {
    if (this.columns() > 5) {
      return 5
    } else {
      return this.columns();
    }
  });


  ngAfterContentInit(): void {
    if (this.columns() > 5) {
      throw new Error('There are only 5 columns supported currently!');
    }
  }
}

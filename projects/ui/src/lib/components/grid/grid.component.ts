import { AfterContentInit, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';

@Component({
  selector: 'ui-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent extends UIBaseComponent implements AfterContentInit {

  /**
   * Number of Columns for the Grid  
   * (max 5)
   */
  columns = input.required<number>();

  /**
   * Internally used: Max overflow for columns
   */
  calcColumns = computed(() => {
    if (this.columns() > 5) {
      return 5
    } else {
      return this.columns();
    }
  });


  ngAfterContentInit(): void {
    if (this.columns() > 5) {
      console.error('There are only 5 columns supported currently!');
    }
  }
}

import { AfterContentInit, ChangeDetectionStrategy, Component, HostListener, computed, input, signal } from '@angular/core';
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

  private _MAX_COLUMNS: number = 6;
  private _MIN_WIDTH: number = 250;
  private resizeColumnsHelper = signal<number>(this._MAX_COLUMNS);

  /**
   * Number of Columns for the Grid  
   * (max 5)
   */
  columns = input.required<number>();

  /**
   * Internally used: Max overflow for columns
   */
  calcColumns = computed(() => {
    if (this.columns() > this._MAX_COLUMNS) {
      return Math.min(this.resizeColumnsHelper(), 6);
    } else {
      return Math.min(this.resizeColumnsHelper(), this.columns());
    }
  });


  ngAfterContentInit(): void {
    if (this.columns() > this._MAX_COLUMNS) {
      console.error(`There are only ${this._MAX_COLUMNS} columns supported currently!`);
    }
  }

  // TODO:  relayout indesad of hiding ...
  /*
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    const nextCols = Math.floor(width / this._MIN_WIDTH) - 1;
    this.resizeColumnsHelper.set(Math.min(nextCols, this._MIN_WIDTH));
  }
  */
}

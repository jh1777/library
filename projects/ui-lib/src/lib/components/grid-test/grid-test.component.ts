import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
interface CellData {
    component: any;
    data: any;
  }

@Component({
  selector: 'app-grid-test',
  templateUrl: './grid-test.component.html',
  styleUrls: ['./grid-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridTestComponent implements AfterContentInit {

/*
  @Input() numColumns = 1;
  @ContentChildren('tableCell') tableCells: QueryList<any>;

  rows: CellData[][] = [];

  ngOnInit() {
  }

  ngAfterContentInit() {
    const cells = this.tableCells.map(cell => {
      return {component: cell.constructor, data: cell};
    });
    this.rows = this.chunk(cells, this.numColumns);
  }

  private chunk(array: CellData[], size: number): CellData[][] {
    return array.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([]);
      }
      chunks[chunks.length - 1].push(el);
      return chunks;
    }, [] as CellData[][]);
  }
  */
  @ContentChildren('cell') cells: QueryList<any>;
  public data: CellData[][] = [];

  ngAfterContentInit() {
    const cells = this.cells.map(cell => {
        return {component: cell.constructor, data: cell};
      });
    this.data = this.chunk(cells, this.cols);
    console.log(this.data);
  }

  private chunk(array: CellData[], size: number): CellData[][] {

    /*
    return array.reduce((chunks, el, i) => {

        if (i % size === 0) {
            chunks.push([]);
        }

        chunks[chunks.length - 1].push(el);
        return chunks;
        
    }, [] as Function[][]);
*/
    let result:CellData[][] = [];
    for (let index = 0; index < this.cols; index++) {

        const part = array.slice(index*this.rows, ((index+1)*this.rows));
        console.log(part);
        result.push(part)
        
    }
    return result;
  }

  // COLUMNS
  @Input()
  public cols: number = 3;

  @Input()
  public rows: number = 2;

  @Input()
  public isLoading: boolean = false;

  @Output()
  public onClick = new EventEmitter<any>();

  public clickEvent(item: any) {
    this.onClick.emit(item);
  }
}

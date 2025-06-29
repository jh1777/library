import { Component, input, output, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ITableCell, ITableCellInformation, ITableColumn, ITableData, ITableRow } from './table.models';
import { faFilter, faSortAmountAsc, faSortAmountDesc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ui-table',
  imports: [FontAwesomeModule],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent extends UIBaseComponent {

  sortAscIcon = faSortAmountAsc;
  sortDescIcon = faSortAmountDesc;
  filterIcon = faFilter;

  sortIcon = signal<{ type: "NONE" | "ASC" | "DESC", icon: IconDefinition }>({ type: "NONE", icon: this.sortAscIcon});

  sortedColum = signal<ITableColumn>({ label: '' });

  /**
   * Header text  
   * Shown on top of the Accordion  
   * (optional)
   */
  header = input<string>();

  /**
   * The description of this Accordion  
   * It will be shown directly below the header, above any Accordion Panels    
   * (optional)
   */
  description = input<string>();


  /**
   * The whole data of the Table inside this model
   */
  tableData = input<ITableData>();



  /**
   * If true, a selection of a row will lead to a grey background on that row as selection indicator
   * (single-select only!)
   */
  preserveSelectedRow = input<boolean>(true);

  /**
   * If isClickable (of ITableRow) is true: this will be called
   */
  onRowClick = output<ITableRow>()


  /**
   * Emits if a sorticon was clicked
   * Payload
   * - column: ITabelColumn
   * - type: string (ASC, DESC)
   */
  onSortClick = output<{ column: ITableColumn, type: "NONE" | "ASC" | "DESC" }>()

  onFilterCellClick = output<ITableCellInformation>();

  /**
   * Handler for the real click event
   * @param row ITableRow
   * @param index number
   */
  onRowClickEventHandler(row: ITableRow, index: number) {
    if (row.isClickable == true) {
      if (row.isSelected == true && this.preserveSelectedRow() == true) {
        // Unselect if already selected
        row.isSelected = false;
        this.onRowClick.emit({
          cells: [],
          rowIndex: 0,
          onClickCallback: ()=>{}
        });
      } else {
        row.onClickCallback(index);
        if (this.preserveSelectedRow() == true) {
          this.tableData()?.rows.forEach(r => r.isSelected = false);
          row.isSelected = true;
        }
        this.onRowClick.emit(row);
      }
    }
  }

  private swapSortIcon(col: ITableColumn) {
    if (this.sortIcon().type == "NONE") {
      this.sortIcon.set({ type: "ASC", icon: faSortAmountAsc});
      this.sortedColum.set(col);
    } else if (this.sortIcon().type == "ASC") {
      this.sortIcon.set({ type: "DESC", icon: faSortAmountDesc});
      this.sortedColum.set(col);
    } else if (this.sortIcon().type == "DESC") {
      this.sortIcon.set({ type: "NONE", icon: faSortAmountAsc});
      this.sortedColum.set({ label: ''});
    }
    
  }

  sortColumnClickEventHandler(col: ITableColumn) {

    // TODO: Bug -> No sorting doesnt work! HOw to set initial unsorted state??

    this.swapSortIcon(col);

    const model = {
      column: col,
      type: this.sortIcon().type
    }
    this.onSortClick.emit(model);
  }

  filterIconClickEventHandler($event: MouseEvent, cell: ITableCell, colIdx: number) {
    $event.preventDefault();
    $event.stopPropagation();

    this.onFilterCellClick.emit({
      cell: cell,
      columnIndex: colIdx
    });
  }
}
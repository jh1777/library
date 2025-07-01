export interface ITableColumn {
    label: string;
    widthPercent?: number;
    isSortable?: boolean;    
}

export interface ITableRow {
    cells?: Array<ITableCell>;
    rowIndex: number;
    isClickable?: boolean;
    isSelected?: boolean;
    onClickCallback: (id: number) => void;
}

export interface ITableCell {
    value: string;
    isNumeric?: boolean;
    isUnary?: boolean;
    style?: string;
    rawValue?: number | string;
    hasFilterButton?: boolean;
}

export interface ITableData {
    columns: Array<ITableColumn>;
    rows: Array<ITableRow>;
    footer?: Array<ITableRow>;
}

export interface ITableCellInformation {
    columnIndex: number;
    cell: ITableCell,
}
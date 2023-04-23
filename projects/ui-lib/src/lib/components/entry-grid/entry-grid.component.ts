import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntryGridModel } from './entry-grid.component.model';

@Component({
  selector: 'csgp-entry-grid',
  templateUrl: './entry-grid.component.html',
  styleUrls: ['./entry-grid.component.scss']
})
export class EntryGridComponent {

  private readonly _maxRows: number = 10;
  private readonly _maxCols: number = 3;

  private _rows: number = 1;
  private _cols: number = 1;

  // ROWS
  @Input()
  public set rows(rowCount: number) {
    if (rowCount > this._maxRows) {
      this._rows = this._maxRows;
    } else {
      this._rows = rowCount;
    }
  }
  public get rows(): number {
    return this._rows;
  }

  // COLUMNS
  @Input()
  public set cols(colCount: number) {
    if (colCount > this._maxCols) {
      this._cols = this._maxCols;
    } else {
      this._cols = colCount;
    }
  }
  public get cols(): number {
    return this._cols;
  }

  // LOADING
  @Input()
  public hasUnifiedLoading: boolean = false;

  // DATA
  private _data?: EntryGridModel;

  @Input()
  public set data(model: EntryGridModel) {
    this._data = model;
    this.applyUnifiedLoading(this._isLoading);
  }
  public get data(): EntryGridModel {
    return this._data;
  }

  private _isLoading: boolean = false;

  @Input()
  public set isLoading(state: boolean) {
    this._isLoading = state;
    this.applyUnifiedLoading(state);
  }
  public get isLoading(): boolean {
    return this._isLoading;
  }

  @Output()
  public onClick = new EventEmitter<any>();

  constructor() {
/*
    const kvError1 = new ComponentErrorModel({
      hasError:  false
    })
    const kvError2 = new ComponentErrorModel({
      hasError:  true,
      message: "This Error Message is very long so it doesn't fit the space!",
      showLink: true
    })

    
    this.data = new EntryGridModel({
      items: [
        {
          isLoading: false,
          data: {
            label: "Onboarding State",
            subtitle: "Timestamp",
            value: "Completed",
            valueStyle: 'color: green; font-weight: 700;',
            valueSubtitle: "20.03.2023T12:23:45Z"
          },
          errorData: kvError1,
          component: 'PROPERTY'
        },
        {
          isLoading: false,
          data: {
            label: "Devices",
            subtitle: "Increase",
            value: "+32 today",
            valueStyle: 'font-weight: 700;',
            valueSubtitle: "132.322"
          },
          errorData: kvError1,
          component: 'PROPERTY'
        },
        {
          isLoading: false,
          data: {
            label: "Onboarding State",
            subtitle: "Timestamp",
            value: "Completed",
            valueStyle: 'color: green; font-weight: 700;',
            valueSubtitle: "20.03.2023T12:23:45Z"
          },
          errorData: kvError1,
          component: 'PROPERTY'
        },
        {
          data: {
            label: "Started",
            metricValue: 4322,
            metricPercent: 24,
            metricColor: "rgb(0, 128, 0)"
          },
          component: 'METRIC'
        },
        {
          data: {
            label: "Completed",
            metricValue: 43222,
            metricColor: "rgb(128, 128, 0)",
          },
          component: 'METRIC'
        }
      ]
    })
    */
  }

  private applyUnifiedLoading(state: boolean) {
    if (this.hasUnifiedLoading) {
      this.data?.items?.forEach(item => {
        item.isLoading = state;
      });
    }
  }

  public clickEvent(item: any) {
    this.onClick.emit(item);
  }
}
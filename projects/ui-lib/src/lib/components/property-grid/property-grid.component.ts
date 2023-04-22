import { Component, Input } from '@angular/core';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { PropertyEntryModel, PropertyEntryOptions } from '../property-entry/property-entry.component.model';
import { PropertyGridModel } from './property-grid.component.model';

@Component({
  selector: 'csgp-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss']
})
export class PropertyGridComponent {

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
  private _data?: PropertyGridModel;

  @Input()
  public set data(model: PropertyGridModel) {
    this._data = model;
    this.applyUnifiedLoading(this._isLoading);
  }
  public get data(): PropertyGridModel {
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


  constructor() {

    const kvData1 = new PropertyEntryModel({
      content: new PropertyEntryOptions ({
        value: "Completed",
        style: 'color: green; font-weight: 700;'
      }),
      subtitleContent: new PropertyEntryOptions ({
        value: "20.03.2023T12:23:45Z"
      }),
      subtitleLabel: new PropertyEntryOptions ({
        value: "Timestamp"
      }),
      label: new PropertyEntryOptions ({
        value: "Onboarding State"
      })
    });

    const kvData2 = new PropertyEntryModel({
      content: new PropertyEntryOptions ({
        value: "132.322",
        style: 'font-weight: 700;'
      }),
      subtitleContent: new PropertyEntryOptions ({
        value: "+32 today"
      }),
      subtitleLabel: new PropertyEntryOptions ({
        value: "Increase"
      }),
      label: new PropertyEntryOptions ({
        value: "Devices"
      })
    });

    const kvError1 = new ComponentErrorModel({
      hasError:  false
    })
    const kvError2 = new ComponentErrorModel({
      hasError:  true,
      message: "This Error Message is very long so it doesn't fit the space!",
      showLink: true
    })

    this.data = new PropertyGridModel({
      items: [
        {
          isLoading: false,
          data: kvData1,
          errorData: kvError1,
          component: 'KEY-VALUE-DOUBLE'
        },
        {
          isLoading: false,
          data: kvData2,
          errorData: kvError1,
          component: 'KEY-VALUE-DOUBLE'
        },
        {
          isLoading: false,
          data: kvData1,
          errorData: kvError1,
          component: 'KEY-VALUE-DOUBLE'
        },
        {
          data: {
            label: "Started",
            metricValue: 4322,
            metricPercent: 24,
            metricColor: "rgb(0, 128, 0)"
          },
          component: 'METRIC-ENTRY'
        },
        {
          data: {
            label: "Completed",
            metricValue: 43222,
            metricColor: "rgb(128, 128, 0)",
          },
          component: 'METRIC-ENTRY'
        }
      ]
    })
  }

  private applyUnifiedLoading(state: boolean) {
    if (this.hasUnifiedLoading) {
      this.data?.items?.forEach(item => {
        item.isLoading = state;
      });
    }
  }
}
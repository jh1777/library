import { Component, Input, OnInit } from '@angular/core';
import { IconModel } from '../../models/shared/icon-model';

@Component({
  selector: 'csgp-v2-entry-tile',
  templateUrl: './entry-tile.component.html',
  styleUrls: ['./entry-tile.component.scss']
})
export class EntryTileComponent implements OnInit {
  public placeholder = "⏹⏹ ";
  @Input()
  public isLoading: boolean = false;

  private _itemLimit: number = 7;
  public get getItemLimit(): number {
    return this._itemLimit;
  }

  public data: EntryTile = new EntryTile();

  // Just placeholder for test
  public errorData;

  constructor() { 
    this.data.title = "Onboarding";
    this.data.collapseMode = EntryTileCollapseMode.manual;
    this.data.state = EntryState.none;
    // this.data.titleIcon = "factory";
    this.data.header.push({
      label: "State",
      value: "Started",
      valueIcon: new IconModel({
        iconName: "warning-standard",
        color: "grey",
        tooltip: "More Information",
        size: 18,
        isClickable: true
      }),
    });

    this.data.items.push({
      primaryValue: "Pending",
      title: "TLS Registration",
      secondaryValue: "No date available",
      state: EntryState.attention,
      icon: new IconModel({
        iconName: "warning-standard",
        color: "orange",
        tooltip: "No TLS arrived yet, please check with crew!",
        size: 30,
        isClickable: false
      }),
    });

    this.data.items.push({
      title: "IoT Setup",
      primaryValue: "Successful",
      state: EntryState.none,
      clickable: true,
      icon: new IconModel({
        iconName: "success-standard",
        color: "green",
        tooltip: "Everything is ready on IoT Hub!",
        size: 30,
        isClickable: false
      }),
      secondaryValue: "23/22/2023 12:35:22 GMT+1"
    });
  }

  ngOnInit(): void {

  }

  public toggleCollapsedState() {
    this.data.isCollapsed = !this.data.isCollapsed;
  }

  // Actions
  public tileItemClicked($item: EntryTileItem) {
    if ($item.clickable) {
      // callback output
      console.log($item);
    }
  }


}



/**
 * Main class for Entry Tile
 */
export class EntryTile {
  // states
  isLoading: boolean = false; // done with Input but not in model
  isCollapsed: boolean = false; // really needed in model?
  state: EntryState = EntryState.none;
  collapseMode: EntryTileCollapseMode = EntryTileCollapseMode.manual;
  // Title
  title: string = "";
  titleIcon?: string; // Not recommended
  // Header
  header: Array<EntryTileProperty> = [];
  // Content
  items: Array<EntryTileItem> = [];
}

/**
 * Entry Tile Item class
 */
export class EntryTileItem {
  title?: string = "";
  state?: EntryState = EntryState.none;
  clickable?: boolean = false;
  primaryValue: string = "";
  secondaryValue?: string;
  icon?: IconModel;
}

/**
 * Generic Label / Value pair class
 */
export class EntryTileProperty {
  label: string;
  value: string;
  valueIcon?: IconModel;
  valueStyle?: string;
}

export enum EntryState {
  none = 0,
  attention = 1,
  error = 2,
  success = 3
}

export enum EntryTileCollapseMode {
  // All items shown by default, no collapse button
  disabled = 0,
  /// All items shown by default, but collapse button shown
  manual = 1,
  /// Only attention and error items shown
  autoexpanded = 2  
}
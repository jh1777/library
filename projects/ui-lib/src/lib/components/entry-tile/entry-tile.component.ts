import { Component, OnInit } from '@angular/core';
import { IconModel } from '../../models/shared/icon-model';

@Component({
  selector: 'csgp-v2-entry-tile',
  templateUrl: './entry-tile.component.html',
  styleUrls: ['./entry-tile.component.scss']
})
export class EntryTileComponent implements OnInit {

  public data: EntryTile = new EntryTile();

  constructor() { 
    this.data.title = "Onboarding";
    this.data.state = EntryState.none;
    this.data.headerProperties.push({
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
        isClickable: true
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
        isClickable: true
      }),
      secondaryValue: "23/22/2023 12:35:22 GMT+1"
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  public toggleCollapsedState() {
    this.data.isCollapsed = !this.data.isCollapsed;
  }
}

export enum EntryState {
  none = 0,
  attention = 1,
  error = 2,
  success = 3
}

export enum EntryTileViewMode {
  // All items shown by default, no collapse button
  disabled = 0,
  /// All items shown by default, but collapse button shown
  manual = 1,
  /// Only attention and error items shown
  autoexpanded = 2  
}

export class EntryTile {
  isLoading: boolean = false;
  title: string = "";
  state: EntryState = EntryState.none;
  viewMode: EntryTileViewMode = EntryTileViewMode.manual; // TODO
  headerProperties: Array<EntryTileProperty> = [];
  items: Array<EntryTileItem> = [];
  isCollapsed: boolean = false;
}

export class EntryTileProperty {
  label: string;
  value: string;
  valueIcon?: IconModel;
  valueStyle?: string;
}

export class EntryTileItem {
  title?: string = "";
  state?: EntryState = EntryState.none;
  clickable?: boolean = false;
  primaryValue: string = "";
  secondaryValue?: string;
  icon?: IconModel;
}

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
      value: "Started"
    });

    this.data.items.push({
      primaryValue: "TLS Registration",
      secondaryValue: "23/22/2023 12:34:43 GMT+1",
      state: EntryState.attention
    });

    this.data.items.push({
      title: "IoT Setup",
      primaryValue: "Successful",
      clickable: true,
      icon: new IconModel({
        iconName: "success-standard",
        color: "green",
        tooltip: "More Information",
        size: 30,
        isClickable: true
      }),
      secondaryValue: "23/22/2023 12:35:22 GMT+1"
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}

export enum EntryState {
  none = 0,
  attention = 1,
  error = 2
}

export class EntryTile {
  isLoading: boolean = false;
  title: string = "";
  state: EntryState = EntryState.none;
  headerProperties: Array<EntryTileProperty> = [];
  items: Array<EntryTileItem> = [];
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

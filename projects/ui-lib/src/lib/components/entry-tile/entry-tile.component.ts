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
    this.data.headerProperties.push({
      label: "State",
      value: "Started"
    });

    this.data.items.push({
      primaryValue: "TLS Registration",
      secondaryValue: "23/22/2023 12:34:43 GMT+1"
    });

    this.data.items.push({
      title: "IoT Setup",
      primaryValue: "Successful",
      clickable: true,
      secondaryValue: "23/22/2023 12:35:22 GMT+1"
    });
  }

  ngOnInit(): void {
  }

}

export class EntryTile {
  isLoading: boolean = false;
  title: string = "";
  state: 'none' | 'attention' | 'error' = 'none';
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
  clickable?: boolean = false;
  primaryValue: string = "";
  secondaryValue?: string;
  icon?: IconModel;
}

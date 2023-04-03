import { Component, Input } from '@angular/core';
import { ButtonModel } from '@ui';
import { DrawerEntryViewData, DrawerEntryViewModel } from 'src/app/models/drawer-entry';


@Component({
  selector: 'drawer-page',
  templateUrl: './drawer-page.component.html',
  styleUrls: ['./drawer-page.component.scss']
})
export class DrawerPageComponent {
  public buttonModel: ButtonModel;
  public showDrawer: boolean = false;
  
  public entries: Array<DrawerEntryViewModel> = [];
  
  @Input()
  showComponentBorder: boolean = false;
  

  constructor() {
    this.entries = DrawerEntryViewData;

    this.buttonModel = {
      label: "Toggle Drawer",
      icon: "eye"
    }
  }
}

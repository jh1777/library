import { Component, Input } from '@angular/core';
import { ButtonModel } from '@ui';
import { DrawerEntryViewData, DrawerEntryViewModel } from 'src/app/models/drawer-entry';
import { DrawerEntryCSViewData, DrawerEntryCSViewModel } from 'src/app/models/drawer-entry-cs';


@Component({
  selector: 'drawer-page',
  templateUrl: './drawer-page.component.html',
  styleUrls: ['./drawer-page.component.scss']
})
export class DrawerPageComponent {
  public buttonModel: ButtonModel;
  public showDrawer: boolean = false;
  public showDrawerCS: boolean = false;
  
  public entries: Array<DrawerEntryViewModel> = [];
  public entriesCS: Array<DrawerEntryCSViewModel> = [];
  
  @Input()
  showComponentBorder: boolean = false;
  

  constructor() {
    this.entries = DrawerEntryViewData;
    this.entriesCS = DrawerEntryCSViewData;

    this.buttonModel = {
      label: "Toggle Drawer",
      icon: "eye"
    }
  }
}

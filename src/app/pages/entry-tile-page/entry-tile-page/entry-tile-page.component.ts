import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { EntryTileComponent } from 'projects/ui-lib/src/lib/components/entry-tile/entry-tile.component';
import { IIO } from 'projects/ui-lib/src/lib/components/entry-tile/entry-tile.component.iio.interface';
import { EntryTile2Component } from 'projects/ui-lib/src/public-api';
import { EntryTileViewData, EntryTileViewModel } from 'src/app/models/entry-tile';

@Component({
  selector: 'entry-tile-page',
  templateUrl: './entry-tile-page.component.html',
  styleUrls: ['./entry-tile-page.component.scss']
})
export class EntryTilePageComponent implements AfterViewInit {
  @Input()
  showComponentBorder: boolean = false;
  @ViewChildren(EntryTileComponent) viewChildren!: QueryList<EntryTileComponent>;
  @ViewChildren(EntryTile2Component) entryTile2!: QueryList<EntryTile2Component>;

  public entryTile2State: number = 0;
  public entryTile2TitleState: number = 1;
  public maxItems: number = 5;
  public itemsPerPage: number = 3;

  public tileData: Array<EntryTileViewModel> = [];

  private store: IIO;

  private isTileCollapsed: boolean;
  
  constructor() {
    this.tileData = EntryTileViewData;
  }

  ngAfterViewInit(): void {
    this.store?.isCollapsed$.subscribe({
      next: (state) => {
        this.isTileCollapsed = state;
      }
    });
  }

  initCallback = (storeReference: IIO) => {
    this.store = storeReference;
  }

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }

  toggleCollapseTile() {
    this.store.setIsCollapsed(!this.isTileCollapsed);
  }

  moreClicked($id: any) {
    console.log("More:: ", $id);
  }

  gotoPage(p: number) {
    this.store.setCurrentPage(p);
  }

  addTestItem() {
    
    this.store.addTileItem({
      title: "Test_XX",
      primaryValue: "Works fine",
      secondaryValue: "JH"
    });

    this.store.addTileHeader({
      label: "Test_XX",
      value: "Works fine"
    });
  }


  setMaxItems(plus: boolean) {
    plus ? this.maxItems++ : this.maxItems--;
    //const v = this.entryTile2?.first?.maxItems();
    this.entryTile2?.first?.maxItems.set(this.maxItems);
  }

  setItemsPerPage(plus: boolean) {
    plus ? this.itemsPerPage++ : this.itemsPerPage--;
  }
}

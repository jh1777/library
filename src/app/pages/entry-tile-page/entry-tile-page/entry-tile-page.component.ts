import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { EntryTileComponent } from 'projects/ui-lib/src/lib/components/entry-tile/entry-tile.component';
import { IIO } from 'projects/ui-lib/src/lib/components/entry-tile/entry-tile.component.iio.interface';
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
}

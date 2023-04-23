import { Component, Input } from '@angular/core';
import { EntryGridViewData, EntryGridViewModel } from 'src/app/models/entry-grid';

@Component({
  selector: 'entry-grid-page',
  templateUrl: './entry-grid-page.component.html',
  styleUrls: ['./entry-grid-page.component.scss']
})
export class EntryGridPageComponent {
  @Input()
  showComponentBorder: boolean = false;
  
  public gridData: EntryGridViewModel;
  
  constructor() {
    this.gridData = EntryGridViewData;
  }

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }
}
import { Component, Input } from '@angular/core';
import { ButtonViewData, ButtonViewModel } from 'src/app/models/button';
import { ButtonCSViewData, ButtonCSViewModel } from 'src/app/models/button-cs';

@Component({
  selector: 'buttons-page',
  templateUrl: './buttons-page.component.html',
  styleUrls: ['./buttons-page.component.scss']
})
export class ButtonsPageComponent {

  @Input()
  showComponentBorder: boolean = false;
  

  public buttonData: Array<ButtonViewModel> = [];
  public buttonCSData: Array<ButtonCSViewModel> = [];

  constructor() {
    this.buttonCSData = ButtonCSViewData;
    this.buttonData = ButtonViewData;
  }

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }

}

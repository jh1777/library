import { Component, Input } from '@angular/core';
import { ButtonCS } from '@ui';
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
  
  /**
   * Button
   * @param $event Button.IIO
   * @param data ButtonIIOModel
   */
  setButtonIIO($event: ButtonCS.IIO, data: ButtonCSViewModel) {
    if (data.color) {
      $event.setColor(data.color);
    }
    $event.setContent(data.icon, data.label);
    $event.setLoading(data.loading, data.label);
    $event.setId(data.id);
    $event.setFilled(data.filled);
    if (data.borderColor ||  data.backgroundColor) {
      $event.setBorderedStyle(data.borderColor, data.backgroundColor);
    }
  } 

  setOutput(model: any) {
    model.$output = `id=${model.id}`;
    setTimeout(() => { model.$output = '' }, 3000);
  }

}

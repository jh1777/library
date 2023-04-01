import { Component } from '@angular/core';
import { ButtonCS } from '@ui';
import { ButtonViewData, ButtonViewModel } from './models/button';
import { ButtonCSViewData, ButtonCSViewModel } from './models/button-cs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showBorders: boolean = false;

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
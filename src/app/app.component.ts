import { Component } from '@angular/core';
import { Button } from '@ui';
import { ButtonData, ButtonIIOModel} from './models/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public buttonData: Array<ButtonIIOModel> = [];

  constructor() {
    this.buttonData = ButtonData;
  }
  
  /**
   * Button
   * @param $event Button.IIO
   * @param data ButtonIIOModel
   */
  setButtonIIO($event: Button.IIO, data: ButtonIIOModel) {
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
import { Component } from '@angular/core';
import { Button } from '@ui';
import { ButtonIIO } from './button.iio.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public buttonStore: Button.IIO;
  public buttonData: Array<ButtonIIO> = [];

  constructor() {

    this.buttonData = [
      {
        id: "1",
        label: "Accept",
        loading: false,
        icon: "check",
        $description: ""        
      },
      {
        id: "2",
        label: "Delete",
        loading: false,
        icon: "trash",
        color: "red"
      },
      {
        id: "3",
        label: "Submit",
        loading: false,
        icon: "check",
        color: "white",
        borderColor: "#00677F",
        backgroundColor: "#00677F"
      },
      {
        id: "4",
        label: "Open",
        loading: false
      },
      {
        id: "5",
        color: null,
        label: "Loading...",
        loading: true
      },
      {
        id: "6",
        color: null,
        label: "Loading...",
        loading: true,
        filled: true,
        backgroundColor: "#efefef",
        borderColor: "#efefef"
      }
    ]
  }
  
  setButtonIIO($event: Button.IIO, data: ButtonIIO) {
    this.buttonStore = $event;
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
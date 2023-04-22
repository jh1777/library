import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showBorders: boolean = false;

  public buttonsTabActive: boolean;
  public tagsTabActive: boolean;
  public drawerTabActive: boolean;
  public metricsTabActive: boolean;
  
}
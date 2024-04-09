import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, Input } from "@angular/core";

@Component({
    selector: 'ui-lib-page',
    
    templateUrl: './ui-lib-page.component.html',
    styleUrls: ['./ui-lib-page.component.scss']
  })
  export class UiLibPageComponent   {

    @Input()
    showComponentBorder: boolean = false;
  }
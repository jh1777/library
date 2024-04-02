import { Component, input, signal } from "@angular/core";
import { UIBaseComponent } from "./ui-base.component";

@Component({
    standalone: true,
    imports: [],
    template: ""
  })
  export class UIToolbarBaseComponent extends UIBaseComponent {
    
    /**
     * 0 - left
     * 1 - right
     */
    alignment = input<number>(0);
  }
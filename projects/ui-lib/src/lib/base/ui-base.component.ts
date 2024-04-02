import { Component, input, signal } from "@angular/core";

@Component({
    standalone: true,
    imports: [],
    template: ""
  })
  export class UIBaseComponent {
    data = input<any>();
    id = input<string>();
    hidden = signal<boolean>(false);
  }
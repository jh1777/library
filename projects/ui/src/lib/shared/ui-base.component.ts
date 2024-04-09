import { Component, QueryList, input, signal } from "@angular/core";

@Component({
    standalone: true,
    imports: [],
    template: ""
  })
  export class UIBaseComponent {
    public readonly placeholder = '⏹⏹ ';

    data = input<any>();
    id = input<string>();
    hidden = signal<boolean>(false);

    protected limitContentChildren<T extends UIBaseComponent>(items: QueryList<T>, max: number) {
      if (items.length > max) {
        console.error(`Maximum number of ${items.constructor.name} is ${max}`);
        for (let index = max; index < items.length; index++) {
          const element = items.get(index);
          element.hidden.set(true);
        }
      }      
    }
  }
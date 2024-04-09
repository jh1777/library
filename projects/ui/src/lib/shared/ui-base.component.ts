import { Component, QueryList, input, signal } from "@angular/core";

@Component({
    standalone: true,
    imports: [],
    template: ""
  })
  export class UIBaseComponent {
    public readonly placeholder = '⏹⏹ ';

    /**
     * Generic data object (optional)  
     * (tpye `any`)
     */
    data = input<any>();

    /**
     * Id (as `string`) to uniquely indentify the current item (optional)  
     */
    id = input<string>();

    /**
     * Internal used to control overflow and visibility
     */
    hidden = signal<boolean>(false);

    protected limitContentChildren<T extends UIBaseComponent>(items: QueryList<T>, max: number) {
      if (items.length > max) {
        console.error(`Maximum child elements of type ${items.first.constructor.name} is ${max}!`);
        for (let index = max; index < items.length; index++) {
          const element = items.get(index);
          element.hidden.set(true);
        }
      }      
    }
  }
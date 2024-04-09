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

    /**
     * Checks the given child elements in `items` if their count exceeds the given `max`   
     * If so, the additional components will be set to `hidden()`  
     * @param items QueryList<T> (`ContentChildren`)  
     * @param max number  
     * @returns boolean -> `true` if max was exceeded, otherwise `false`  
     */
    protected limitContentChildren<T extends UIBaseComponent>(items: QueryList<T>, max: number): boolean {
      if (items.length > max) {
        console.error(`Maximum child elements of type ${items.first.constructor.name} is ${max}!`);
        for (let index = max; index < items.length; index++) {
          const element = items.get(index);
          element.hidden.set(true);
        }
        return true;
      }
      return false;
    }
  }
import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export interface TabsInterface extends UIBaseComponentInterface {
  activeIndex?: number;
  showPrevNextButtons?: boolean;
  
}
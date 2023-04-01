import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { IIO } from "./button-cs.component.iio.interface";
import { ButtonState } from "./button-cs.component.interface";
import { produce }  from "immer"

@Injectable()
export class ButtonStore extends ComponentStore<ButtonState> implements IIO  {

  public readonly borderWidth: string = '1px solid';

  constructor() {
    super({ 
      disabled: false,
      filledStyle: false,
      backgroundColor: '',
      borderColor: '',
      color: '',
      href: '',
      icon: '',
      iconSize: 16,
      label: 'Label',
      tooltip: '',
      isLoading: false,
      id: null
    });
  }
  // GETTER
  readonly showNonHref$ = this.select(state => (state.label || state.icon) && !state.href);
  readonly showHref$ = this.select(state => (state.label || state.icon) && state.href);

  readonly filledStyleBackground$ = this.select(state => state.filledStyle == true && state.backgroundColor && !state.disabled);
  readonly filledStyleBorder$ = this.select(state => state.filledStyle == true && state.borderColor && !state.disabled);

  readonly isLoading$ = this.select(state => state.isLoading);
  readonly isLoadingMessage$ = this.select(state => state.isLoadingMessage);
  readonly label$ = this.select(state => state.label);
  readonly disabled$ = this.select(state => state.disabled);
  readonly filledStyle$ = this.select(state => state.filledStyle);
  readonly backgroundColor$ = this.select(state => state.backgroundColor);
  readonly borderColor$ = this.select(state => state.borderColor);
  readonly color$ = this.select(state => state.color);
  readonly href$ = this.select(state => state.href);
  readonly icon$ = this.select(state => state.icon);
  readonly iconSize$ = this.select(state => state.iconSize);
  readonly tooltip$ = this.select(state => state.tooltip);

  readonly id$ = this.select(state => state.id);

  setId = (id: any) => {
    this.setAllReducer({
      id: id
    });
  }

  setLoading = (state: boolean, message?: string) => {
    this.setAllReducer({
        isLoading: state,
        isLoadingMessage: message ?? ''
    });
  };


  setDisabled = (state: boolean) => {
    this.setAllReducer({
      disabled: state
    });
  };

  setColor = (value: string) => {
    this.setAllReducer({
      color: value
    });
  };

  setFilled = (state: boolean) => {
    this.setAllReducer({
      filledStyle: state
    });
  }

  setBorderedStyle = (borderColor?: string, backgroundColor?: string) => {
    let filledStyle = true;

    if(!borderColor && !backgroundColor) {
      filledStyle = false;
    }

    this.setAllReducer({
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      filledStyle: filledStyle
    });
  };

  setContent = (icon?: string, label?: string, tooltip?: string) => {
    this.setAllReducer({
      icon: icon,
      label: label,
      tooltip: tooltip
    });
  }

  // REDUCER

  private setAllReducer = this.updater((state: ButtonState, value: Partial<ButtonState>) => {
    const newState = produce(state, (draft: ButtonState) => {
      draft = Object.assign(draft, value);
    });
    return newState;
  });


  
}
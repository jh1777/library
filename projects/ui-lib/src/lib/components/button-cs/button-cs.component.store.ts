import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { deepmergeInto } from "deepmerge-ts";
import { produce } from "immer";
import { IIO } from "./button-cs.component.iio.interface";
import { ButtonState } from "./button-cs.component.interface";


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
    this.mergeValueIntoState({
      id: id
    });
  }

  setLoading = (state: boolean, message?: string) => {
    this.mergeValueIntoState({
        isLoading: state,
        isLoadingMessage: message ?? ''
    });
  };


  setDisabled = (state: boolean) => {
    this.mergeValueIntoState({
      disabled: state
    });
  };

  setColor = (value: string) => {
    this.mergeValueIntoState({
      color: value
    });
  };

  setFilled = (state: boolean) => {
    this.mergeValueIntoState({
      filledStyle: state
    });
  }

  setBorderedStyle = (borderColor?: string, backgroundColor?: string) => {
    let filledStyle = true;

    if(!borderColor && !backgroundColor) {
      filledStyle = false;
    }

    this.mergeValueIntoState({
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      filledStyle: filledStyle
    });
  };

  setContent = (icon?: string, label?: string, tooltip?: string) => {
    this.mergeValueIntoState({
      icon: icon,
      label: label,
      tooltip: tooltip
    });
  }

  // REDUCER

  public mergeValueIntoState = this.updater((state: ButtonState, value: Partial<ButtonState>) => {
    const newState = produce(state, (draft) => {
      deepmergeInto(draft, value);
    })
    return (newState);
  });
  
}
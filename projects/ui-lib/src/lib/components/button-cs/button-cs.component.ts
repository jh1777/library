import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEntry } from '../../models/shared/entry.interface';
import { IIO } from './button-cs.component.iio.interface';
import { ButtonStore } from './button-cs.component.store';

@Component({
  selector: 'csgp-button-v2-cs',
  templateUrl: './button-cs.component.html',
  styleUrls: ['./button-cs.component.scss'],
  providers: [ButtonStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponentCS implements OnInit, IEntry {

  private _initializedCallBack: (storeReference: IIO) => void;

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.buttonStore);
    }
  }
  
  // Label (optional)
  @Input() public set label(value: string) {
    this.buttonStore.mergeValueIntoState({
      label: value
    });
  }

  // Clarity Icon (optional)
  @Input() public set icon(value: string) {
    this.buttonStore.mergeValueIntoState({
      icon: value
    });
  }

  // Hover Tooltip (html title; optional)
  @Input() public set tooltip(value: string) {
    this.buttonStore.mergeValueIntoState({
      tooltip: value
    });
  }

  // URL link (optional)
  // If specified the button is an <a href ... element that supports open in new window etc.
  @Input() public set href(value: string) {
    this.buttonStore.mergeValueIntoState({
      href: value
    });
  }

  // Size of the Icon
  @Input() public set iconSize(value: number) {
    this.buttonStore.mergeValueIntoState({
      iconSize: value
    });
  }

  // If set the whole button is disabled; no click; no styles
  @Input() public set disabled(value: boolean) {
    this.buttonStore.setDisabled(value);
  }

  // Icon and Label Color can be set (no hover anymore if set; optional)
  @Input() public set color(value: string) {
    this.buttonStore.mergeValueIntoState({
      color: value
    });
  }

  // If set the button is shown with border and padding (false by default)
  @Input() public set filledStyle(value: boolean) {
    this.buttonStore.setFilled(value);
  }

  // If filledStyle is set this sets the border of the button (optional)
  @Input() public set borderColor(value: string) {
    this.buttonStore.mergeValueIntoState({
      borderColor: value
    });
  }

  // If filledStyle is set this sets the background color of the button (optional)
  @Input() public set backgroundColor(value: string) {
    this.buttonStore.mergeValueIntoState({
      backgroundColor: value
    });
  }

  // Spinning wheel is shown
  @Input() public set isLoading(value: boolean) {
    this.buttonStore.mergeValueIntoState({
      isLoading: value
    });
  }

  // Message if isLoading == true 
  @Input() public set isLoadingMessage(value: string) {
    this.buttonStore.mergeValueIntoState({
      isLoadingMessage: value
    });
  }

  // General purpose (optional)
  @Input() public set id(value: any) {
    this.buttonStore.mergeValueIntoState({
      id: value
    });
  }

  // -------------

  @Output()
  onClick = new EventEmitter();

  @Output()
  onMouseEnter = new EventEmitter();

  @Output()
  onMouseLeave = new EventEmitter();

  @Output()
  initialized = new EventEmitter<IIO>();

  private _disabled = new BehaviorSubject<boolean>(false);

  constructor(
    public readonly buttonStore: ButtonStore
  ) {}

  ngOnInit(): void {
   this.buttonStore.disabled$.subscribe({
      next: (value) => {
        this._disabled.next(value);
      }
    });
  }
 
  public buttonClicked(event: Event) {
    if (!this._disabled.value) {
      event.preventDefault();
      event.stopPropagation();
      this.onClick.emit();
    }
  }

  public mouseEnterEvent(event: Event) {
    if (!this._disabled.value) {
      this.onMouseEnter.emit();
    }
  }

  public mouseLeaveEvent(event: Event) {
    if (!this._disabled.value) {
      this.onMouseLeave.emit();
    }
  }
}
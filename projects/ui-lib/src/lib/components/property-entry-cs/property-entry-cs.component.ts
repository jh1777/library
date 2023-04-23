import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';
import { IIO } from './property-entry-cs.component.iio.interface';
import { PropertyEntryStore } from './property-entry-cs.component.store';

@Component({
  selector: 'csgp-property-entry-cs',
  templateUrl: './property-entry-cs.component.html',
  styleUrls: ['./property-entry-cs.component.scss'],
  providers: [PropertyEntryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyEntryComponentCS implements OnInit {

  public placeholder = "◼︎◼︎ ";

  private _initializedCallBack: (storeReference: IIO) => void;

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.propertyEntryStore);
    }
  }

  @Input() public set isLoading(value: boolean) {
    this.propertyEntryStore.mergeValueIntoState({
      isLoading: value
    });
  }

  @Input() public set errorData(value: ComponentErrorModel) {
    this.propertyEntryStore.mergeValueIntoState({
      errorData: value
    });
  }

  // LABEL
  @Input() public set label(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      label: value
    });
  }

  @Input() public set labelStyle(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      labelStyle: value
    });
  }

  @Input() public set labelIcon(value: IconModel) {
    this.propertyEntryStore.mergeValueIntoState({
      labelIcon: value
    });
  }

  // SUBTITLE
  @Input() public set subtitle(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      subtitle: value
    });
  }

  @Input() public set subtitleStyle(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      subtitleStyle: value
    });
  }

  @Input() public set subtitleIcon(value: IconModel) {
    this.propertyEntryStore.mergeValueIntoState({
      subtitleIcon: value
    });
  }

  // VALUE
  @Input() public set value(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      value: value
    });
  }

  @Input() public set valueStyle(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      valueStyle: value
    });
  }

  @Input() public set valueIcon(value: IconModel) {
    this.propertyEntryStore.mergeValueIntoState({
      valueIcon: value
    });
  }

  // VALUE SUBTITLE
  @Input() public set valueSubtitle(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      valueSubtitle: value
    });
  }

  @Input() public set valueSubtitleStyle(value: string) {
    this.propertyEntryStore.mergeValueIntoState({
      valueSubtitleStyle: value
    });
  }

  @Input() public set valueSubtitleIcon(value: IconModel) {
    this.propertyEntryStore.mergeValueIntoState({
      valueSubtitleIcon: value
    });
  }

  @Input() public set id(value: any) {
    this.propertyEntryStore.mergeValueIntoState({
      id: value
    });
  }

  // OUTPUTS 

  @Output()
  public onErrorClick = new EventEmitter<void>();
  @Output()
  public onLabelIconClick = new EventEmitter<any>();
  @Output()
  public onSubtitleIconClick = new EventEmitter<any>();
  @Output()
  public onValueIconClick = new EventEmitter<any>();
  @Output()
  public onValueSubtitleIconClick = new EventEmitter<any>();


  private _isLabelIconClickable = new BehaviorSubject(false);
  private _isValueIconClickable = new BehaviorSubject(false);
  private _isSubtitleIconClickable = new BehaviorSubject(false);
  private _isValueSubtitleIconClickable = new BehaviorSubject(false);

  constructor(
    public readonly propertyEntryStore: PropertyEntryStore
  ) {

  }
  ngOnInit(): void {
    this.propertyEntryStore.labelIconClickable$.subscribe({
      next: (value) => {
        this._isLabelIconClickable.next(value);
      }
    });
    this.propertyEntryStore.subtitleIconClickable$.subscribe({
      next: (value) => {
        this._isSubtitleIconClickable.next(value);
      }
    });
    this.propertyEntryStore.valueIconClickable$.subscribe({
      next: (value) => {
        this._isValueIconClickable.next(value);
      }
    });
    this.propertyEntryStore.valueSubtitleIconClickable$.subscribe({
      next: (value) => {
        this._isValueSubtitleIconClickable.next(value);
      }
    });
  }

  public errorClicked() {
    this.onErrorClick.emit();
  }

  public labelIconClicked() {
    if (this._isLabelIconClickable) {
      this.onLabelIconClick.emit(this.id);
    }
  }
  public subtitleIconClicked() {
    if (this._isSubtitleIconClickable) {
      this.onSubtitleIconClick.emit(this.id);
    }
  }
  public valueIconClicked() {
    if (this._isValueIconClickable) {
      this.onValueIconClick.emit(this.id);
    }
  }
  public valueSubtitleIconClicked() {
    if (this._isValueSubtitleIconClickable) {
      this.onValueSubtitleIconClick.emit(this.id);
    }
  }
}
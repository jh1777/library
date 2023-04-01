import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO, Slot } from './property-entry-cs.component.iio.interface';
import { PropertyEntryStore } from './property-entry-cs.component.store';

@Component({
  selector: 'csgp-property-entry-cs',
  templateUrl: './property-entry-cs.component.html',
  styleUrls: ['./property-entry-cs.component.scss'],
  providers: [PropertyEntryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyEntryComponentCS {

  public placeholder = "◼︎◼︎ ";
  public slot = Slot;

  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.propertyEntryStore);
      this.propertyEntryStore.isLoading$.subscribe(this._isLoading);
      this.propertyEntryStore.isIconClickable$.subscribe(this._isIconClickable);
    }
  }

  // OUTPUTS 

  @Output()
  public onErrorClick = new EventEmitter<void>();
  @Output()
  public onIconClick = new EventEmitter<Slot>();

  private _isLoading = new BehaviorSubject(false);
  private _isIconClickable = new BehaviorSubject(null);

  constructor(
    public readonly propertyEntryStore: PropertyEntryStore
  ) {

  }

  public errorClicked() {
    this.onErrorClick.emit();
  }

  public iconClicked(slot: Slot) {

    var slotEnabled = false;
    switch (slot) {
      case Slot.CONTENT:
        slotEnabled = this._isIconClickable.value.content;
        break;
      case Slot.CONTENT_SUBTITLE:
        slotEnabled = this._isIconClickable.value.contentSubtitle;
        break;
      case Slot.LABEL:
        slotEnabled = this._isIconClickable.value.label;
        break;
      case Slot.LABEL_SUBTITLE:
        slotEnabled = this._isIconClickable.value.labelSubtitle;
        break;
      default:
        break;
    }

    if (slotEnabled == true) {
      this.onIconClick.emit(slot);
    }
  }
}
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIO } from './button.component.iio.interface';
import { ButtonStore } from './button.component.store';

@Component({
  selector: 'csgp-button-v2-cs',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  providers: [ButtonStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Output()
  onClick = new EventEmitter();

  @Output()
  onMouseEnter = new EventEmitter();

  @Output()
  onMouseLeave = new EventEmitter();

  @Output()
  initialized = new EventEmitter<IIO>();

  ///----------
/*
  @Input()
  public set storeReference(init: (storeReference: IIO) => void) {
    if(init) {
      init(this.buttonStore);
      this.buttonStore.disabled$.subscribe(this._disabled);
    }
  }
  */
  

  private _disabled = new BehaviorSubject<boolean>(false);

  constructor(
    public readonly buttonStore: ButtonStore
  ) {
  }

  ngOnInit(): void {
   this.initialized.emit(this.buttonStore);
   this.buttonStore.disabled$.subscribe(this._disabled.asObservable);

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
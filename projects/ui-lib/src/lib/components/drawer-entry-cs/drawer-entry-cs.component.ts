import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';
import { IIO } from './drawer-entry-cs.component.iio.interface';
import { DrawerEntryStore } from './drawer-entry-cs.component.store';

@Component({
  selector: 'csgp-drawer-entry-cs',
  templateUrl: './drawer-entry-cs.component.html',
  styleUrls: ['./drawer-entry-cs.component.scss'],
  providers: [DrawerEntryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerEntryComponentCS implements OnInit {
  public placeholder = "◼︎◼︎ ";
  private _initializedCallBack: (storeReference: IIO) => void;

  @Input() public set initializedCallBack(callBackFunc: (storeReference: IIO) => void) {
    if (callBackFunc) {
      this._initializedCallBack = callBackFunc;
      this._initializedCallBack(this.drawerEntryStore);
    }
  }
 
  @Input() public set isLoading(value: boolean) {
    this.drawerEntryStore.mergeValueIntoState({
      isLoading: value
    });
  }

  @Input() public set errorData(value: ComponentErrorModel) {
    this.drawerEntryStore.mergeValueIntoState({
      errorData: value
    });
  }

  @Input() public set title(value: string) {
    this.drawerEntryStore.mergeValueIntoState({
      title: value
    });
  }

  @Input() public set titleIcon(value: IconModel) {
    this.drawerEntryStore.mergeValueIntoState({
      titleIcon: value
    });
  }

  @Input() public set subtitle(value: string) {
    this.drawerEntryStore.mergeValueIntoState({
      subtitle: value
    });
  }

  @Input() public set description(value: string) {
    this.drawerEntryStore.mergeValueIntoState({
      description: value
    });
  }

  @Input() public set progressStatusLabel(value: string) {
    this.drawerEntryStore.mergeValueIntoState({
      progressStatusLabel: value
    });
  }

  @Input() public set progressColor(value: string) {
    this.drawerEntryStore.mergeValueIntoState({
      progressColor: value
    });
  }

  @Input() public set progressPercent(value: number) {
    this.drawerEntryStore.mergeValueIntoState({
      progressPercent: value
    });
  }

  @Input() public set showProgress(value: boolean) {
    this.drawerEntryStore.mergeValueIntoState({
      showProgress: value
    });
  }

  @Input() public set id(value: any) {
    this.drawerEntryStore.mergeValueIntoState({
      id: value
    });
  }

  // OUTPUT
  @Output()
  public onErrorClick = new EventEmitter<void>();
  @Output()
  public onIconClick = new EventEmitter<void>();
  
  private _isIconClickable = new BehaviorSubject(null);
  
  constructor(
    public readonly drawerEntryStore: DrawerEntryStore
  ) {}

  ngOnInit(): void {
     this.drawerEntryStore.isIconClickable$.subscribe({
      next: (value) => {
        this._isIconClickable.next(value);
      }
    });
   }

  public errorClicked() {
    this.onErrorClick.emit();
  }

  public iconClicked() {
    if (this._isIconClickable.value) {
      this.onIconClick.emit();
    }
  }
}
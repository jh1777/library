import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalSize } from './modal.models';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud set isOpen', () => {
    component.isOpen.set(true);
    expect(component.isOpen()).toBe(true);
  });

  it('shoud set header', () => {
    fixture.componentRef.setInput('header', "#HEADER");
    expect(component.header()).toBe("#HEADER");
  });

  it('shoud set closeOnBackdropClick', () => {
    fixture.componentRef.setInput('closeOnBackdropClick', false);
    expect(component.closeOnBackdropClick()).toBe(false);
  });

  it('shoud set showCloseButton', () => {
    fixture.componentRef.setInput('showCloseButton', false);
    expect(component.showCloseButton()).toBe(false);
  });

  it('shoud set height and calcHeight automatically', () => {
    fixture.componentRef.setInput('height', ModalSize.Large);
    expect(component.height()).toBe(ModalSize.Large);
    expect(component.calcHeight()).toBe(500);
  });

  it('shoud set width and calcWidth automatically', () => {
    fixture.componentRef.setInput('width', ModalSize.Large);
    expect(component.width()).toBe(ModalSize.Large);
    expect(component.calcWidth()).toBe(550);
  });

  it('onCloseClick should fire', () => {
    const event = new MouseEvent('click');
    component.onCloseClick(event);
    expect(component.isOpen()).toBe(false);
  });
  
});

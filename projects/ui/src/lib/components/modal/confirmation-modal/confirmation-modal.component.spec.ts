import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  const id = '101010';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud set id', () => {
    expect(component.id()).toBe(id);
  });

  it('shoud set isOpen', () => {
    component.isOpen.set(true);
    expect(component.isOpen()).toBe(true);
  });

  it('shoud set header', () => {
    fixture.componentRef.setInput('header', "#HEADER");
    expect(component.header()).toBe("#HEADER");
  });
  
  it('shoud set confirmLabel', () => {
    fixture.componentRef.setInput('confirmLabel', "#ConfirmLabel");
    expect(component.confirmLabel()).toBe("#ConfirmLabel");
  });

  it('shoud set cancelLabel', () => {
    fixture.componentRef.setInput('cancelLabel', "#CancelLabel");
    expect(component.cancelLabel()).toBe("#CancelLabel");
  });

  it('shoud set message', () => {
    fixture.componentRef.setInput('message', "#MESSAGE");
    expect(component.message()).toBe("#MESSAGE");
  });

  it('onConfirmClickHandler should emit onConfirmClick event with MouseEvent', () => {
    const event = new MouseEvent('click');
    fixture.componentRef.setInput('id', null); // reset id
    spyOn(component.onConfirmClick, 'emit');
    component.onConfirmClickHandler(event);
    expect(component.onConfirmClick.emit).toHaveBeenCalledWith(event); 
  });

  it('onConfirmClickHandler should emit onConfirmClick event with id', () => {
    const event = new MouseEvent('click');
    spyOn(component.onConfirmClick, 'emit');
    component.onConfirmClickHandler(event);
    expect(component.onConfirmClick.emit).toHaveBeenCalledWith(id);
  });

  it('onCancelClickHandler should emit onCancelClick event with MouseEvent', () => {
    const event = new MouseEvent('click');
    fixture.componentRef.setInput('id', null); // reset id
    spyOn(component.onCancelClick, 'emit');
    component.onCancelClickHandler(event);
    expect(component.onCancelClick.emit).toHaveBeenCalledWith(event); 
  });

  it('onCancelClickHandler should emit onCancelClick event with id', () => {
    const event = new MouseEvent('click');
    spyOn(component.onCancelClick, 'emit');
    component.onCancelClickHandler(event);
    expect(component.onCancelClick.emit).toHaveBeenCalledWith(id);
  });

});

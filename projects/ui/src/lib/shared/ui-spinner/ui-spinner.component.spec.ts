import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSpinnerComponent } from './ui-spinner.component';
import { SpinnerSize } from './ui-spinner.models';

describe('UiSpinnerComponent', () => {
  let component: UiSpinnerComponent;
  let fixture: ComponentFixture<UiSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set text', () => {
    fixture.componentRef.setInput('text', '#Text')
    expect(component.text()).toBe('#Text');
  });

  it('should set size', () => {
    fixture.componentRef.setInput('size', SpinnerSize.Small);
    expect(component.size()).toBe(SpinnerSize.Small);
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchButtonComponent } from './switch-button.component';
import { SwitchButtonOption } from './switch-button.models';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

describe('SwitchButtonComponent', () => {
  let component: SwitchButtonComponent;
  let fixture: ComponentFixture<SwitchButtonComponent>;

  const mockOptions: SwitchButtonOption[] = [
    { label: 'Option 1', value: 'opt1', icon: faCheck },
    { label: 'Option 2', value: 'opt2', icon: faTimes }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display two options', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('.ui-switch-button-option');
    expect(options.length).toBe(2);
  });

  it('should display labels correctly', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = compiled.querySelectorAll('.option-label');
    expect(labels[0].textContent).toContain('Option 1');
    expect(labels[1].textContent).toContain('Option 2');
  });

  it('should handle selection change', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.componentRef.setInput('selectedValue', 'opt1');
    fixture.detectChanges();
    
    let emittedValue: any;
    component.onSelectionChange.subscribe((value: any) => {
      emittedValue = value;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const secondOption = compiled.querySelectorAll('.ui-switch-button-option')[1] as HTMLElement;
    secondOption.click();
    
    expect(emittedValue).toBe('opt2');
    expect(component.selectedValue()).toBe('opt2');
  });

  it('should apply selected class to selected option', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.componentRef.setInput('selectedValue', 'opt1');
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('.ui-switch-button-option');
    expect(options[0].classList.contains('selected')).toBe(true);
    expect(options[1].classList.contains('selected')).toBe(false);
  });

  it('should not change selection when disabled', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.componentRef.setInput('selectedValue', 'opt1');
    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();
    
    const initialValue = component.selectedValue();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const secondOption = compiled.querySelectorAll('.ui-switch-button-option')[1] as HTMLElement;
    secondOption.click();
    
    expect(component.selectedValue()).toBe(initialValue);
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ui-switch-button');
    expect(container?.classList.contains('disabled')).toBe(true);
  });

  it('should not emit event when clicking already selected option', () => {
    fixture.componentRef.setInput('options', mockOptions);
    fixture.componentRef.setInput('selectedValue', 'opt1');
    fixture.detectChanges();
    
    let emitCount = 0;
    component.onSelectionChange.subscribe(() => {
      emitCount++;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const firstOption = compiled.querySelectorAll('.ui-switch-button-option')[0] as HTMLElement;
    firstOption.click();
    
    expect(emitCount).toBe(0);
  });
});

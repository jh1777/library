import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchButtonComponent } from './switch-button.component';
import { SwitchButtonOptionComponent } from './option/switch-button-option.component';
import { Component, signal } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [SwitchButtonComponent, SwitchButtonOptionComponent],
  template: `
    <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled()">
      <ui-switch-button-option label="Option 1" value="opt1" [icon]="faCheck"></ui-switch-button-option>
      <ui-switch-button-option label="Option 2" value="opt2" [icon]="faTimes"></ui-switch-button-option>
    </ui-switch-button>
  `
})
class TestHostComponent {
  selectedValue = signal<string | number | boolean>('opt1');
  isDisabled = signal(false);
  faCheck = faCheck;
  faTimes = faTimes;
}

describe('SwitchButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should display two options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('.ui-switch-button-option');
    expect(options.length).toBe(2);
  });

  it('should display labels correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = compiled.querySelectorAll('.option-label');
    expect(labels[0].textContent).toContain('Option 1');
    expect(labels[1].textContent).toContain('Option 2');
  });

  it('should handle selection change', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const secondOption = compiled.querySelectorAll('.ui-switch-button-option')[1] as HTMLElement;
    secondOption.click();
    fixture.detectChanges();

    expect(host.selectedValue()).toBe('opt2');
  });

  it('should apply selected class to selected option', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('.ui-switch-button-option');
    expect(options[0].classList.contains('selected')).toBe(true);
    expect(options[1].classList.contains('selected')).toBe(false);
  });

  it('should not change selection when disabled', () => {
    host.isDisabled.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const secondOption = compiled.querySelectorAll('.ui-switch-button-option')[1] as HTMLElement;
    secondOption.click();
    fixture.detectChanges();

    expect(host.selectedValue()).toBe('opt1');
  });

  it('should apply disabled class when disabled', () => {
    host.isDisabled.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.ui-switch-button');
    expect(container?.classList.contains('disabled')).toBe(true);
  });

  it('should not change value when clicking already selected option', () => {
    const initialValue = host.selectedValue();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstOption = compiled.querySelectorAll('.ui-switch-button-option')[0] as HTMLElement;
    firstOption.click();
    fixture.detectChanges();

    expect(host.selectedValue()).toBe(initialValue);
  });
});

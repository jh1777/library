import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DrawerComponent } from './drawer.component';

@Component({
  standalone: true,
  imports: [DrawerComponent],
  template: `
    <ui-drawer
      [header]="header"
      [showBackdrop]="showBackdrop"
      [closeOnBackdropClick]="closeOnBackdropClick"
      [showCloseButton]="showCloseButton"
    >
      <div class="projected-content">Projected drawer content</div>
    </ui-drawer>
  `
})
class TestHostComponent {
  header?: string;
  showBackdrop = true;
  closeOnBackdropClick = true;
  showCloseButton = true;
}

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is hidden when isOpen is false', () => {
    component.isOpen.set(false);
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('.ui-drawer-wrapper'));
    expect(wrapper).toBeFalsy();
  });

  it('is visible when isOpen is true', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('.ui-drawer-wrapper'));
    expect(wrapper).toBeTruthy();
  });

  it('projects ng-content', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const projected = fixture.debugElement.query(By.css('.projected-content'));
    expect(projected).toBeTruthy();
    expect(projected.nativeElement.textContent).toContain('Projected drawer content');
  });

  it('renders header container only when header is present or close button is enabled', () => {
    component.isOpen.set(true);
    host.header = undefined;
    host.showCloseButton = false;
    fixture.detectChanges();

    let header = fixture.debugElement.query(By.css('.ui-drawer-header'));
    expect(header).toBeFalsy();

    host.header = '#HEADER';
    fixture.detectChanges();

    header = fixture.debugElement.query(By.css('.ui-drawer-header'));
    expect(header).toBeTruthy();

    host.header = undefined;
    host.showCloseButton = true;
    fixture.detectChanges();

    header = fixture.debugElement.query(By.css('.ui-drawer-header'));
    expect(header).toBeTruthy();
  });

  it('shows close button only when showCloseButton is true', () => {
    component.isOpen.set(true);
    host.header = '#HEADER';
    host.showCloseButton = true;
    fixture.detectChanges();

    let closeButton = fixture.debugElement.query(By.css('.ui-drawer-header-close-button'));
    expect(closeButton).toBeTruthy();

    host.showCloseButton = false;
    fixture.detectChanges();

    closeButton = fixture.debugElement.query(By.css('.ui-drawer-header-close-button'));
    expect(closeButton).toBeFalsy();
  });

  it('closes on backdrop click when backdrop is visible and closing is enabled', () => {
    component.isOpen.set(true);
    host.showBackdrop = true;
    host.closeOnBackdropClick = true;
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.ui-drawer-backdrop'));
    backdrop.nativeElement.click();

    expect(component.isOpen()).toBe(false);
  });

  it('does not close on backdrop click when closing is disabled', () => {
    component.isOpen.set(true);
    host.showBackdrop = true;
    host.closeOnBackdropClick = false;
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.ui-drawer-backdrop'));
    backdrop.nativeElement.click();

    expect(component.isOpen()).toBe(true);
  });

  it('does not render backdrop when showBackdrop is false', () => {
    component.isOpen.set(true);
    host.showBackdrop = false;
    host.closeOnBackdropClick = true;
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.ui-drawer-backdrop'));
    expect(backdrop).toBeFalsy();
  });

  it('closes on close button click', () => {
    component.isOpen.set(true);
    host.showCloseButton = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.ui-drawer-header-close-button'));
    closeButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });
});

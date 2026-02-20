import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from '../list.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListItemKpiComponent } from '../list-item/item-kpi/list-item-kpi.component';
import { ListFooterComponent } from './list-footer.component';

@Component({
  standalone: true,
  imports: [ListComponent, ListItemComponent, ListItemKpiComponent, ListFooterComponent],
  template: `
    <ui-list header="Services">
      <ui-list-item text="Alpha"></ui-list-item>
      <ui-list-item text="Beta"></ui-list-item>
      <ui-list-footer>
        <ui-list-item-kpi [value]="120" [refValue]="100"></ui-list-item-kpi>
      </ui-list-footer>
    </ui-list>
  `
})
class TestHostComponent {}

describe('ListFooterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders total count from parent list', () => {
    const footerText = fixture.debugElement.query(By.css('ui-list-footer .footer-text'));
    expect(footerText.nativeElement.textContent).toContain('2 items');
  });

  it('projects KPI content into footer slot', () => {
    const kpi = fixture.debugElement.query(By.css('ui-list-footer ui-list-item-kpi'));
    expect(kpi).toBeTruthy();
  });
});

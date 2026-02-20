import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from '../list.component';
import { ListItemComponent } from './list-item.component';
import { ListItemKpiComponent } from './item-kpi/list-item-kpi.component';
import { ButtonComponent } from '../../button';

@Component({
  standalone: true,
  imports: [ListComponent, ListItemComponent, ListItemKpiComponent, ButtonComponent],
  template: `
    <ui-list header="List" [preserveSelectedItem]="true">
      <ui-list-item text="Alpha" [isClickable]="true">
        <ui-button label="Action"></ui-button>
      </ui-list-item>
      <ui-list-item text="Beta" [isClickable]="true">
        <ui-list-item-kpi [value]="200" [refValue]="150"></ui-list-item-kpi>
      </ui-list-item>
    </ui-list>
  `
})
class TestHostComponent {}

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let listComponent: ListComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    listComponent = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
    fixture.detectChanges();
    component = listComponent.listItems.toArray()[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selects item and emits onItemClick when clicked', () => {
    let payload: any;
    listComponent.onItemClick.subscribe(event => {
      payload = event;
    });

    const itemEls = fixture.debugElement.queryAll(By.css('.item-container'));
    itemEls[0].triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isSelected()).toBeTrue();
    expect(payload?.text).toBe('Alpha');
    expect(payload?.data).toEqual([]);
  });

  it('preserves single selection when clicking another item', () => {
    const itemEls = fixture.debugElement.queryAll(By.css('.item-container'));
    itemEls[0].triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    const second = listComponent.listItems.toArray()[1];
    itemEls[1].triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isSelected()).toBeFalse();
    expect(second.isSelected()).toBeTrue();
  });
});

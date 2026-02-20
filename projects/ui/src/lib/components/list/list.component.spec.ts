import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemKpiComponent } from './list-item/item-kpi/list-item-kpi.component';
import { ButtonComponent } from '../button';

@Component({
  standalone: true,
  imports: [ListComponent, ListItemComponent, ListItemKpiComponent, ButtonComponent],
  template: `
    <ui-list header="Services" [isSearchable]="true" [isSortable]="true" [showItemCount]="true">
      <ui-list-item text="Bravo">
        <ui-button label="Action"></ui-button>
      </ui-list-item>
      <ui-list-item text="Alpha"></ui-list-item>
      <ui-list-item text="Charlie">
        <ui-list-item-kpi [value]="120" [refValue]="100"></ui-list-item-kpi>
      </ui-list-item>
    </ui-list>
  `
})
class TestHostComponent {}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters items by search term and updates itemCount', () => {
    component.setSearchTerm('alpha');
    fixture.detectChanges();

    const items = component.listItems.toArray();
    const alpha = items.find(item => item.text() === 'Alpha');
    const bravo = items.find(item => item.text() === 'Bravo');

    expect(alpha?.isHidden()).toBeFalse();
    expect(bravo?.isHidden()).toBeTrue();
    expect(component.itemCount()).toBe(1);
  });

  it('applies sort order and updates indices', () => {
    component.sort();
    fixture.detectChanges();

    const itemsAsc = component.listItems.toArray();
    const alphaAsc = itemsAsc.find(item => item.text() === 'Alpha');
    const bravoAsc = itemsAsc.find(item => item.text() === 'Bravo');
    const charlieAsc = itemsAsc.find(item => item.text() === 'Charlie');

    expect(alphaAsc?.index()).toBe(0);
    expect(bravoAsc?.index()).toBe(1);
    expect(charlieAsc?.index()).toBe(2);

    component.sort();
    fixture.detectChanges();

    const itemsDesc = component.listItems.toArray();
    const alphaDesc = itemsDesc.find(item => item.text() === 'Alpha');
    const bravoDesc = itemsDesc.find(item => item.text() === 'Bravo');
    const charlieDesc = itemsDesc.find(item => item.text() === 'Charlie');

    expect(charlieDesc?.index()).toBe(0);
    expect(bravoDesc?.index()).toBe(1);
    expect(alphaDesc?.index()).toBe(2);
  });

  it('deselects all items and emits onDeselect', () => {
    const items = component.listItems.toArray();
    items[0].isSelected.set(true);
    items[1].isSelected.set(true);

    let deselectCalled = false;
    component.onDeselect.subscribe(() => {
      deselectCalled = true;
    });

    component.deselectAll();
    fixture.detectChanges();

    expect(items.every(item => !item.isSelected())).toBeTrue();
    expect(deselectCalled).toBeTrue();
  });
});

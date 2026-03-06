import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from '../list.component';
import { ListItemChartComponent } from './list-item-chart.component';
import { BarChartComponent } from '../../charts/bar-chart/bar-chart.component';
import { ChartDataSet } from '../../charts/chart.models';

const TEST_DATA_SET: ChartDataSet = {
  label: 'Test',
  data: [
    { label: 'A', value: 10, color: '#3366ff' },
    { label: 'B', value: 20, color: '#22aa66' }
  ]
};

@Component({
  standalone: true,
  imports: [ListComponent, ListItemChartComponent, BarChartComponent],
  template: `
    <ui-list header="Chart List">
      <ui-list-item-chart label="My Chart">
        <ui-bar-chart [dataSet]="dataSet" [svgWidth]="'100%'"></ui-bar-chart>
      </ui-list-item-chart>
    </ui-list>
  `
})
class TestHostComponent {
  dataSet = TEST_DATA_SET;
}

describe('ListItemChartComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const chartItem = fixture.debugElement.query(By.directive(ListItemChartComponent));
    expect(chartItem).toBeTruthy();
  });

  it('renders the label', () => {
    const label = fixture.debugElement.query(By.css('.list-item-chart-label'));
    expect(label.nativeElement.textContent.trim()).toBe('My Chart');
  });

  it('projects ui-bar-chart into the content slot', () => {
    const barChart = fixture.debugElement.query(By.directive(BarChartComponent));
    expect(barChart).toBeTruthy();
  });

  it('hides when isHidden is true', () => {
    const chartItem = fixture.debugElement.query(By.directive(ListItemChartComponent)).componentInstance as ListItemChartComponent;
    chartItem.isHidden.set(true);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.list-item-chart'));
    expect(container).toBeNull();
  });
});

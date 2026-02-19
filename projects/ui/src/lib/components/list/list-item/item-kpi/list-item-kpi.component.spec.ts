import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemKpiComponent } from './list-item-kpi.component';

describe('ListItemKpiComponent', () => {
  let component: ListItemKpiComponent;
  let fixture: ComponentFixture<ListItemKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemKpiComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemKpiComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 120);
    fixture.componentRef.setInput('refValue', 100);
    fixture.componentRef.setInput('label', 'Revenue');
    fixture.componentRef.setInput('style', 'positive');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('computes delta and percentage', () => {
    expect(component.delta()).toBe(20);
    expect(component.percentage()).toBe(20);
  });

  it('hydrates kpiData on init', () => {
    const data = component.kpiData();
    expect(data.label).toBe('Revenue');
    expect(data.value).toBe(120);
    expect(data.refValue).toBe(100);
    expect(data.style).toBe('positive');
  });

  it('returns null percentage when refValue is zero', () => {
    fixture.componentRef.setInput('refValue', 0);
    fixture.detectChanges();

    expect(component.percentage()).toBeNull();
  });
});

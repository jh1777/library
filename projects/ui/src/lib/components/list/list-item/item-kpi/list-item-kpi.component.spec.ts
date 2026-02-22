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

  it('computes percentage correctly for negative reference values', () => {
    fixture.componentRef.setInput('refValue', -4187.13);
    fixture.componentRef.setInput('value', -12110.43);
    fixture.detectChanges();

    expect(component.delta()).toBeCloseTo(-7923.3, 2);
    expect(component.percentage()).toBeCloseTo(189.2, 1);
  });

  it('computes percentage correctly for mixed sign values', () => {
    fixture.componentRef.setInput('refValue', 200);
    fixture.componentRef.setInput('value', -100);
    fixture.detectChanges();

    expect(component.percentage()).toBeCloseTo(-150, 5);

    fixture.componentRef.setInput('refValue', -50);
    fixture.componentRef.setInput('value', 100);
    fixture.detectChanges();

    expect(component.percentage()).toBeCloseTo(-300, 5);
  });
});

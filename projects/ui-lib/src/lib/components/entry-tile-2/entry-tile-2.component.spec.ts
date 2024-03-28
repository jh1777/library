import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTile2Component } from './entry-tile-2.component';

describe('EntryTile2Component', () => {
  let component: EntryTile2Component;
  let fixture: ComponentFixture<EntryTile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryTile2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntryTile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantifierComponent } from './quantifier.component';

describe('QuantifierComponent', () => {
  let component: QuantifierComponent;
  let fixture: ComponentFixture<QuantifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantifierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

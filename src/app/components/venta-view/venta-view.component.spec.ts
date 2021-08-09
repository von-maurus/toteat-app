import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaViewComponent } from './venta-view.component';

describe('VentaViewComponent', () => {
  let component: VentaViewComponent;
  let fixture: ComponentFixture<VentaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

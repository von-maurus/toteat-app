import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTrabajadoresComponent } from './reporte-trabajadores.component';

describe('ReporteTrabajadoresComponent', () => {
  let component: ReporteTrabajadoresComponent;
  let fixture: ComponentFixture<ReporteTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTrabajadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

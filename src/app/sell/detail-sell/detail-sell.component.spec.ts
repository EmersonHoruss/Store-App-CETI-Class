import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSellComponent } from './detail-sell.component';

describe('DetailSellComponent', () => {
  let component: DetailSellComponent;
  let fixture: ComponentFixture<DetailSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

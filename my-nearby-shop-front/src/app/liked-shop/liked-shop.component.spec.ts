import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedShopComponent } from './liked-shop.component';

describe('LikedShopComponent', () => {
  let component: LikedShopComponent;
  let fixture: ComponentFixture<LikedShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

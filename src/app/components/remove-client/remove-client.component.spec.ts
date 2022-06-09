import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveClientComponent } from './remove-client.component';

describe('RemoveClientComponent', () => {
  let component: RemoveClientComponent;
  let fixture: ComponentFixture<RemoveClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

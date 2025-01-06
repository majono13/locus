import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedNavComponent } from './authenticated-nav.component';

describe('AuthenticatedNavComponent', () => {
  let component: AuthenticatedNavComponent;
  let fixture: ComponentFixture<AuthenticatedNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

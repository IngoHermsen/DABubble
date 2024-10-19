import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPostAnimationComponent } from './auth-post-animation.component';

describe('AuthPostAnimationComponent', () => {
  let component: AuthPostAnimationComponent;
  let fixture: ComponentFixture<AuthPostAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPostAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPostAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

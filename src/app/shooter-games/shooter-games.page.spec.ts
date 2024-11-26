import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShooterGamesPage } from './shooter-games.page';

describe('ShooterGamesPage', () => {
  let component: ShooterGamesPage;
  let fixture: ComponentFixture<ShooterGamesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShooterGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

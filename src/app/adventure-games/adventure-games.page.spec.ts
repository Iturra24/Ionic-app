import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdventureGamesPage } from './adventure-games.page';

describe('AdventureGamesPage', () => {
  let component: AdventureGamesPage;
  let fixture: ComponentFixture<AdventureGamesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

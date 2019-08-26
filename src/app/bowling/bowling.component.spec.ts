import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BowlingComponent} from './bowling.component';
import {BowlingService} from './bowling.service';

describe('BowlingComponent', () => {
  let component: BowlingComponent;
  let fixture: ComponentFixture<BowlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BowlingComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addRolls', () => {
    it('current roll should have the entered pin', () => {
      component.addRolls(8);
      expect(component.currentRollScore[0]).toBe(8);
    });
    it('for roll 10 X should be shown in the next roll', () => {
      component.addRolls(10);
      expect(component.currentRollScore[0]).toBe('');
      expect(component.currentRollScore[1]).toBe('X');
    });
    it('for second roll knocked all the pins to make spare', () => {
      component.currentRollScore = [5, 5, 5];
      component.rollNumber = 1;
      component.addRolls(5);
      expect(component.currentRollScore[3]).toBe('/');
    });
    it('gutter ball should be zero', () => {
      component.addRolls(0);
      expect(component.currentRollScore[0]).toBe(0);
    });

    it('remaining pins number buttons should display ', () => {
      component.rollNumber = 0;
      component.addRolls(6);
      expect(component.visibleButtons).toEqual(4);
    });
    it('after end of each frame all pins buttons should be present', () => {
      component.addRolls(10);
      expect(component.visibleButtons).toEqual(10);
    });

    it('game should over with a strike in last frame', () => {
      component.currentRollScore[18] = 'X';
      component.currentRollScore.length = 20;
      component.addRolls(0);
      expect(component.gameStatus).toBeTruthy();
    });
    it('game should over with spare in last frame', () => {
      component.currentRollScore[19] = '/';
      component.currentRollScore.length = 20;
      component.addRolls(0);
      expect(component.gameStatus).toBeTruthy();
    });
    it('game should over without spare or strike in last frame', () => {
      component.currentRollScore[18] = 3;
      component.currentRollScore[19] = 2;
      component.currentRollScore.length = 19;
      component.addRolls(0);
      expect(component.gameStatus).toBeTruthy();
    });
  });
});

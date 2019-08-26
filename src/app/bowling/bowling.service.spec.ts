import {TestBed} from '@angular/core/testing';
import {BowlingService} from './bowling.service';

describe('BowlingService', () => {
  let service: BowlingService;
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [BowlingService]});
    service = TestBed.get(BowlingService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isStrike', () => {
    it('should be true', () => {
      expect(service.isStrike([10], 0)).toBeTruthy();
    });
    it('should be false', () => {
      expect(service.isStrike([9], 0)).toBeFalsy();
    });
    it('should be true for the second roll', () => {
      expect(service.isStrike([9, 10], 1)).toBeTruthy();
    });
  });

  describe('isSpare', () => {
    it('should check the spare for [9,1]', () => {
      expect(service.isSpare([9, 1], 0)).toBeTruthy();
    });
    it('should not be spare for [9,0]', () => {
      expect(service.isSpare([9, 0], 0)).not.toBeTruthy();
    });
  });

  describe('isShortFrame', () => {
    it('should be true for small frame', () => {
      expect(service.isShortFrame([3], 0)).toBeTruthy();
    });
    it('should be false as this is long frame', () => {
      expect(service.isSpare([2, 2], 0)).not.toBeTruthy();
    });
  });

  describe('isNakedSpareOrStrikeAndOneRow', () => {
    it('should be true ', () => {
      expect(service.isShortFrame([9], 0)).toBeTruthy();
    });
    it('should be false ', () => {
      expect(service.isShortFrame([9, 1, 4, 2], 0)).toBeFalsy();
    });

    it('isStrike should be called', () => {
      const isStrikeSpy = spyOn(service, 'isStrike');
      const value = service.isStrike([0, 0], 0);
      expect(isStrikeSpy).toHaveBeenCalled();
    });

    it('isSpare should be called', () => {
      const isSpareSpy = spyOn(service, 'isSpare');
      const value = service.isSpare([9, 1], 0);
      expect(isSpareSpy).toHaveBeenCalled();
    });
  });

  describe('sumNextThreeRolls', () => {
    it('should add the given rolls', () => {
      expect(service.sumNextThreeRolls([2, 5, 9], 0)).toBe(16);
    });
    it('should the row even when its spare', () => {
      expect(service.sumNextThreeRolls([2, 8, 9], 0)).toBe(19);
    });
  });

  describe('sumNextTwoRolls', () => {
    it('should add next two rolls', () => {
      expect(service.sumNextTwoRolls([2, 6, 4], 1)).toBe(10);
    });
    it('should the row even when its spare', () => {
      expect(service.sumNextTwoRolls([2, 0, 9], 0)).not.toBe(9);
    });
  });

  describe('thisFrameValue', () => {
    it('should be present and be sum of two rolls', () => {
      expect(service.thisFrameValue([2, 0, 9], 0)).not.toBe(undefined);
      expect(service.thisFrameValue([2, 0, 9], 0)).toBe(2);
    });
    it('should be sum of three rolls ', () => {
      expect(service.thisFrameValue([10, 1, 4], 0)).toBe(15);
    });
  });

  describe('lastFrameScores', () => {
    it('should return zero', () => {
      expect(service.lastFrameScores([])).toBe(0);
    });
    it('should return the last value', () => {
      expect(service.lastFrameScores([1, 5])).toBe(5);
    });
  });

  describe('nextFrameStarts', () => {
    it('should be next frame and that is 1', () => {
      expect(service.nextFrameStarts([10, 0], 0)).toBe(1);
    });
    it('should be next frame which is 2', () => {
      expect(service.nextFrameStarts([5, 5, 5], 0)).toBe(2);
    });
  });

  describe('isNoFrameValue', () => {
    it('should be false for spare', () => {
      expect(service.isNoFrameValue([5, 5, 5], 0)).toBeFalsy();
    });
    it('should be false for this rolls', () => {
      expect(service.isNoFrameValue([1, 0, 0, 1, 2, 2], 6)).toBeTruthy();
    });
  });
});

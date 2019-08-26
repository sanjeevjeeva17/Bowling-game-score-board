import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BowlingService {

  constructor() { }

  isStrike(rolls: Array<number>, currentLocation: number) {
    return rolls[currentLocation] === 10;
  }

  isSpare(rolls: Array<number>, currentLocation: number) {
    return rolls[currentLocation] + rolls[currentLocation + 1] === 10;
  }

  isShortFrame(rolls: Array<number>, currentLocation: number) {
    return rolls.length <= currentLocation + 1;
  }

  isNakedSpareOrStrikeAndOneRow(rolls: Array<number>, currentLocation: number) {
    return rolls.length === currentLocation + 2 && (this.isSpare(rolls, currentLocation) || this.isStrike(rolls, currentLocation));
  }

  sumNextThreeRolls(rolls: Array<number>, currentLocation: number) {
    return rolls[currentLocation] + rolls[currentLocation + 1] + rolls[currentLocation + 2];
  }

  sumNextTwoRolls(rolls: Array<number>, currentLocation: number) {
    return rolls[currentLocation] + rolls[currentLocation + 1];
  }

  thisFrameValue(rolls: Array<number>, currentLocation: number) {
    if (this.isStrike(rolls, currentLocation) || this.isSpare(rolls, currentLocation)) {
      return this.sumNextThreeRolls(rolls, currentLocation);
    } else {
      return this.sumNextTwoRolls(rolls, currentLocation);
    }
  }

  lastFrameScores(scores: Array<number>) {
    return scores[scores.length - 1] || 0;
  }

  nextFrameStarts(rolls: Array<number>, currentLocation: number) {
    if (this.isStrike(rolls, currentLocation)) {
      return currentLocation + 1;
    } else {
      return currentLocation + 2;
    }
  }

  isNoFrameValue(rolls: Array<number>, currentLocation: number) {
    return this.isShortFrame(rolls, currentLocation) || this.isNakedSpareOrStrikeAndOneRow(rolls, currentLocation);
  }

}

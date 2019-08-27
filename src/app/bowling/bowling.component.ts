import {Component, OnInit} from '@angular/core';
import {BowlingService} from './bowling.service';

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {

  constructor(private bowling: BowlingService) {
  }

  public activeFrame: number;
  public visibleButtons: number;
  public stopGame: boolean;
  public items: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public boardColumns: Array<string | number> = [];
  public rolls: Array<number> = [];
  public currentRollScore: Array<any> = [];
  public frameScores: Array<number> = [];
  public rollNumber: number;
  public gameStatus: string;

  ngOnInit(): void {
    this.boardColumns = ['Name', 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.activeFrame = 1;
    this.visibleButtons = 10;
    this.rollNumber = 0;
    this.stopGame = false;
  }

  /*addRolls is for creating array for the view frame updates and to indicate the active frames
  * @param: pins
  * type number
  * */
  addRolls(pins: number) {
    if (this.frameFirstRoll(pins)) {
      this.currentRollScore.push('');
      this.currentRollScore.push('X');
      this.activeFrame++;
    } else if (this.frameSecondRoll(pins)) {
      if (this.currentRollScore[this.currentRollScore.length - 1] + pins === 10) {
        this.currentRollScore.push('/');
      } else {
        this.currentRollScore.push(pins);
      }
      this.activeFrame++;
    } else if (this.lastFrameRoll(pins)) {   // for roll number 19 and above
      this.currentRollScore.push('X');
    } else {                                 // gutter ball
      this.currentRollScore.push(pins);
    }
    /* to display the proper pins number buttons*/
    if (this.rollNumber === 0 && pins !== 10) {
      this.visibleButtons = 10 - pins;
      this.rollNumber++;
    } else {
      this.visibleButtons = 10;
      this.rollNumber = 0;
    }
    /*to check the game over conditions*/
    if (this.strikeAndBonusRoll()) {
      this.gameOver();
    } else if (this.spareAndBonusRoll()) {
      this.gameOver();
    } else if (this.lastRound()) {
      this.gameOver();
    }

    /*calculating the total score*/
    this.rolls.push(pins);
    this.frameScores = this.frameScoresSet(this.rolls, 0, []);
  }

  /*frameFirstRolls() for checking if its strike and not last frame
  *@param number */
  frameFirstRoll(pins: number) {
    return this.rollNumber === 0 && pins === 10 && this.currentRollScore.length < 18;
  }

  /* frameSecondRolls() for checking if there was spare
    *@param number */
  frameSecondRoll(pins: number) {
    return this.rollNumber === 1 && pins !== 10;
  }

  /*lastFrameRoll() check to add bonus roll
  * @param number*/
  lastFrameRoll(pins: number) {
    return this.currentRollScore.length >= 18 && pins === 10;
  }

  strikeAndBonusRoll() {
    return this.currentRollScore[18] === 'X' && this.currentRollScore.length === 21;
  }

  /*spareAndBonusRoll() check for bonus roll is complete with a spare
    * @param none*/
  spareAndBonusRoll() {
    return this.currentRollScore[19] === '/' && this.currentRollScore.length === 21;
  }

  /*spareAndBonusRoll() check for no bonus roll
      * @param none*/
  lastRound() {
    return this.currentRollScore.length === 20 && this.currentRollScore[18] !== 'X' && this.currentRollScore[19] !== '/';
  }

  /*gameOver() stopping the game
      * @param none*/
  gameOver() {
    this.stopGame = true;
    this.visibleButtons = 0;
    this.gameStatus = 'GAME OVER';
  }

  /*pushThisFrameValueAndFrameScores() pushing current and all the frame score
  * @params array<number>, current location, scores array of number*/
  pushThisFrameValueAndFrameScores(rolls: Array<number>, currentLocation: number, scores: Array<number>) {
    scores.push(this.bowling.thisFrameValue(rolls, currentLocation) + this.bowling.lastFrameScores(scores));
    return this.frameScoresSet(rolls, this.bowling.nextFrameStarts(rolls, currentLocation), scores);
  }

  /*frameScoresSet() set of the complete score details by computation
  * @param array of number, current location and scores of number*/
  frameScoresSet(rolls: Array<number>, currentLocation: number, scores: Array<number>) {
    if (this.bowling.isNoFrameValue(rolls, currentLocation)) {
      return scores;
    } else {
      return this.pushThisFrameValueAndFrameScores(rolls, currentLocation, scores);
    }
  }

}

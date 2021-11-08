import { Injectable } from '@angular/core';
import { map, merge, Observable, scan, Subject, Subscriber } from 'rxjs';
import { Score } from '../classes/score';
import { Timer } from '../classes/timer';
import { TimerColor } from '../enums/timer-color';

const SPEED = 20;

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private scores: Score[];
  private userScore: Timer | undefined;
  private timer: Timer;

  private setTimer = new Subject<any>();
  private setUserScore = new Subject<any>();
  private setScores = new Subject<any>();

  public timerObserver = new Observable<Timer>();
  public scoresObserver = new Observable<Score[]>();
  public userScoreObserver = new Observable<Timer>();

  constructor() {

    this.timer = new Timer();
    this.scores = [];
    this.scores.push(new Score(TimerColor.PURPLE));
    this.scores.push(new Score(TimerColor.BLUE));
    this.scores.push(new Score(TimerColor.GREY));
    this.scores.push(new Score(TimerColor.YELLOW));
    this.scores.push(new Score(TimerColor.ORANGE));
    this.scores.push(new Score(TimerColor.RED));
    this.scores.push(new Score(TimerColor.GREEN));
    this.scores.push(new Score(TimerColor.WHITE));

    const setTimer$ = this.setTimer.asObservable()
      .pipe(map((payload) => ({ payload })));

    const setScores$ = this.setScores.asObservable()
      .pipe(map((payload) => ({ payload })));

    const setUserScore$ = this.setUserScore.asObservable()
      .pipe(map((payload) => ({ payload })));


    this.timerObserver = merge(setTimer$)
      .pipe(scan((acc: any, { payload }) => payload, []))

    this.scoresObserver = merge(setScores$)
      .pipe(scan((acc: any, { payload }) => payload, []))

    this.userScoreObserver = merge(setUserScore$)
      .pipe(scan((acc: any, { payload }) => payload, []))

    setInterval(() => {
      this.updateTime();
    }, 1000/SPEED);
  }

  public addSimulatedClicks(numberClicks: number = 10) {
    let acumulatedTime = 0;
    for (let i = 0; i < numberClicks; i++) {
      const clickTime = Math.random() * 60;
      acumulatedTime = acumulatedTime + 60000 - (clickTime*1000);
      let timer = new Timer();
      timer.setTime(clickTime);
      setTimeout(()=>{
        this.recordScore(timer);
      },acumulatedTime/SPEED);
    }
  }


  public reset() {
    this.timer = new Timer();
    this.setTimer.next(this.timer);
    return this.timer;
  }

  public getTimer() {
    return this.timer;
  }

  public getUserScore() {
    if(!this.userScore){
      let userScoreStr = localStorage.getItem("user-score");
      userScoreStr ? this.recordUserScore(<Timer>JSON.parse(userScoreStr)) : undefined;
    }
    return this.userScore;
  }

  /**
   * Resta un segundo al tiempo hasta llegar a cero y cambia el color segun el tiempo actual
   */
  public updateTime() {
    this.timer.time && this.timer.subtractOnSecond();
    this.setTimer.next(this.timer);
    return this.timer;
  }

  /**
   * Registra el tiempo ingresado por parametro.
   * @param timer 
   */
  public recordScore(timer: Timer | undefined = undefined) {
    timer = timer ?? this.getTimer();
    this.scores = <Score[]>this.scores.map((current: Score) => {
      if (timer?.color === current.color) {
        current.puntuation++;
      }
      else if (current.color == TimerColor.WHITE) {
        current.puntuation++;
      }
      return current;
    });
    this.setScores.next(this.scores);
    this.reset();
  }

  /**
   * Registra el tiempo del usuario
   * @param timer 
   */
  public recordUserScore(timer: Timer | undefined = undefined) {
    timer = timer ?? this.getTimer();
    if(timer){
      localStorage.setItem("user-score", JSON.stringify(timer));
      this.userScore = timer;
      this.recordScore(timer);
      this.setUserScore.next(timer);
    }
  }

  public getScores() {
    return this.scores;
  }
}

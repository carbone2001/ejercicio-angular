import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/classes/score';
import { Timer } from 'src/app/classes/timer';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  public scores:Score[];
  public userScore:Timer|undefined;
  constructor(private timerSvc:TimerService) {
    this.scores = [];
  }

  ngOnInit(): void {
    this.scores = this.timerSvc.getScores();
    this.userScore = this.timerSvc.getUserScore();
    this.timerSvc.userScoreObserver.subscribe((value)=>{
      this.userScore = value;
    })
    this.timerSvc.scoresObserver.subscribe((value)=>{
      this.scores = value
    })
  }

}

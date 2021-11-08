import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Timer } from 'src/app/classes/timer';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'timer-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  public userScore:Timer|undefined;
  constructor(private timerSvc:TimerService) {
      this.userScore = this.timerSvc.getUserScore()
      this.timerSvc.userScoreObserver.subscribe((value)=>{
        this.userScore = value;
      })
  }

  ngOnInit(): void {
  }

  public handlerClick(){
    this.timerSvc.recordUserScore();
  }

}

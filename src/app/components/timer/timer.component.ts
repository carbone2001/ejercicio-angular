import { Component, OnInit } from '@angular/core';
import { Timer } from 'src/app/classes/timer';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  public timer:Timer;
  constructor(public timerSvc:TimerService) { 
    this.timer = new Timer();
  }

  ngOnInit(): void {
    this.timerSvc.timerObserver.subscribe((value)=>{
      this.timer = value;
    })
    this.timerSvc.addSimulatedClicks(50);
  }

}

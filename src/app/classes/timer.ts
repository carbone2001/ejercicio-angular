import { TimerColor } from "../enums/timer-color";

export class Timer {
    public time: number;
    public percent: number;
    public timeString: string;
    public color:TimerColor;

    public constructor(){
        this.time = 60;
        this.percent = 100;
        this.timeString = "60";
        this.color = TimerColor.PURPLE;
    }

    public subtractOnSecond(){
        this.setTime(this.time-1);
        return this;
    }

    public setTime(seconds:number){
        this.time = seconds;
        this.percent = this.time * 100 / 60;
        this.timeString = this.time + "";
        if (this.time >= 52) {
            this.color = TimerColor.PURPLE;
          }
          else if (this.time <= 51 && this.time >= 42) {
            this.color = TimerColor.BLUE;
          }
          else if (this.time <= 41 && this.time >= 32) {
            this.color = TimerColor.GREEN;
          }
          else if (this.time <= 31 && this.time >= 22) {
            this.color = TimerColor.YELLOW;
          }
          else if (this.time <= 21 && this.time >= 12) {
            this.color = TimerColor.ORANGE;
          }
          else if (this.time <= 11 && this.time > 0) {
            this.color = TimerColor.RED;
          }
          else {
            this.color = TimerColor.GREY;
          }
    }


}

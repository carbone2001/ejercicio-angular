import { TimerColor } from "../enums/timer-color";

export class Score {
    public color:TimerColor;
    public puntuation:number;

    constructor(color:TimerColor){
        this.puntuation = 0;
        this.color = color;
    }
}

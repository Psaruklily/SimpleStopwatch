import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch';

  isToggled: boolean = false;
  time = new Date(null);
  interval;

  startTimer():void {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
    }, 1000)
  }

  stopTimer():void {
    clearInterval(this.interval);
  }

  toggleStartStop():void {
    this.isToggled = !this.isToggled;
  
    if (this.isToggled) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

}

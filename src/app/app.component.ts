import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, buffer, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stopwatch';

  isToggled: boolean = false;
  time = new Date(null);
  interval;

  @ViewChild('btnWait', { static: true }) button: ElementRef;

  ngOnInit() {
    const clickStream = fromEvent(this.button.nativeElement, 'click');

    const buff = clickStream.pipe(
      debounceTime(250),
    )
    
    const doubleClicks = clickStream.pipe(
      buffer(buff),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    )
    
    doubleClicks.subscribe(() => {
      this.stopTimer();
      this.isToggled = false;
    })
  }
  
  startTimer(): void {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
    }, 1000)
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

  toggleStartStop(): void {
    this.isToggled = !this.isToggled;

    if (this.isToggled) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  resetTimer():void {
    this.time.setSeconds(0);
    this.startTimer();
  }
}

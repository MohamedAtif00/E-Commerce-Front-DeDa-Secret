import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss',
})
export class OrderSuccessComponent implements OnInit {
  time = 5000; // Total time before navigation (5 seconds)
  seconds = signal<number>(5); // Start with 5 seconds
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCounter();
    setTimeout(() => {
      this.router.navigate(['']);
    }, this.time);
  }

  startCounter() {
    // Decrement the counter every second (1000 ms)
    this.intervalId = setInterval(() => {
      if (this.seconds() > 0) {
        this.seconds.update(() => this.seconds() - 1);
      } else {
        this.stopCounter();
      }
    }, 1000); // Changed interval time to 1000 ms (1 second)
  }

  stopCounter() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    this.stopCounter();
  }
}

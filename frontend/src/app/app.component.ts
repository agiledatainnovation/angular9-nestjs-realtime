import { Component } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public statusData: number[] = [];

  constructor(
    private eventsService: EventsService
  ) {
    eventsService.statusData.subscribe((statusData: number[]) => {
      this.statusData = statusData;
    });
  }
}

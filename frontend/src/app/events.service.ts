import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public statusData = new BehaviorSubject([]);
  private socket;

  constructor() {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('new-status', (statusData) => {
      this.statusData.next(statusData);
    });

    this.socket.emit('get-status');
  }
}
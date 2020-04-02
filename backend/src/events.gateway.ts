import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  private sendingData: boolean = false;

  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('get-status')
  handleMessage() {
    this.sendStatusData();
    
    if (!this.sendingData) {
      this.startSendingInterval();
      this.sendingData = true;
    }
  }

  private sendStatusData() {
    this.server.emit('new-status', this.getStatusData());
  }

  private startSendingInterval() {
    setInterval(() => {
      this.server.emit('new-status', this.getStatusData());
    }, 10000);
  }

  private getStatusData(): number[] {
    let statusData = [];
    
    for (let i = 1; i <= 4; i++) {
      statusData.push(Math.floor(Math.random() * Math.floor(3)));
    }
    return statusData;
  }
}
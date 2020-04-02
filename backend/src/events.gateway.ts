import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  private statusData: number[] = [0, 0, 0, 0];
  private sendingData: boolean = false;

  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('get-status')
  handleMessage(): number[] {
    return this.getStatusData();
  }

  private sendStatusData() {
    setInterval(() => {
      this.server.emit('new-status', this.getStatusData());
    }, 10000);
  }

  private getStatusData(): number[] {
    if (!this.sendingData) {
      this.sendStatusData();
      this.sendingData = true;
    }
    
    for (let status of this.statusData) {
      status = Math.floor(Math.random() * Math.floor(3));
    }
    return this.statusData;
  }
}
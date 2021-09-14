import { getSocketIOServer } from '../init';

export class RefreshApi {
  static refreshWorkflowsAllClients(message: string | string[]) {
    const io = getSocketIOServer();

    io.emit('event://auto-refresh', message);
  }

  static refreshWorkflowsAllClientsExcept(userId: string, message: string | string[]) {
    const io = getSocketIOServer();

    if (io) {
      const userSet = io.sockets.adapter.rooms.get(userId) || new Set();
      const [socketsIds] = userSet?.entries();
      const [userSocketId] = socketsIds || [];
      const userSocket = io.sockets.sockets.get(userSocketId);

      if (userSocket) {
        userSocket?.broadcast.emit('event://auto-refresh', message);
      }
    }
  }
}

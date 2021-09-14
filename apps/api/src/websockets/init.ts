import { Server, Socket } from 'socket.io';
import http, { Server as HttpServer } from 'http';

import { Express } from 'express';

let io: Server;

export const getSocketIOServer = (): Server => {
  return io;
};

export const initWebSockets = (app: Express): { httpServer: HttpServer; io: Server } => {
  const httpServer = http.createServer(app);

  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    socket.on('event://user-connected', socket.join);
    socket.on('event://user-disconnected', socket.leave);
  });

  return { httpServer, io };
};

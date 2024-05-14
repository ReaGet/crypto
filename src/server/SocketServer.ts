import { Socket, Server } from "socket.io";

type Client = {
  socket: Socket
  handler: (data: any) => void
}

export default class SocketServer {
  clients: Map<string, Client>
  io: Server
  constructor(useServer?: any) {
    const { socketPort } = useRuntimeConfig();
    this.clients = new Map();
    this.io = this.createServer(useServer, socketPort);
  }

  private createServer(useServer: any, usePort: any) {
    const io = usePort
      ? new Server(usePort, {
          cors: {
            origin: "*",
          },
        })
      : new Server(useServer);

    io.on("connection", (socket) => {
      console.log("[Server]: connection", socket.id);
    });

    io.on("connect", (socket) => {
      socket.on("steam", (data) => {
        const { symbol } = data;
        this.subscribeClient(socket, symbol);
      });
    });

    io.on("disconnect", (socket) => {
      this.unsubscribeClient(socket);
    })

    return io;
  }

  subscribeClient(socket: Socket, symbol: string) {
    let client = this.clients.get(socket.id);
    if (!client) {
      client = {
        socket,
        handler: (data: any) => { socket.emit(data) },
      };
      this.clients.set(socket.id, client);
    }
  }

  unsubscribeClient(socket: Socket) {
    this.clients.delete(socket.id);
  }

}
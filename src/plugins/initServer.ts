import SocketServer from "~/server/SocketServer";

let socketServer: SocketServer | null = null;

export default defineNuxtPlugin({
  setup() {
    if (!socketServer) {
      socketServer = new SocketServer();
    }
  }
});
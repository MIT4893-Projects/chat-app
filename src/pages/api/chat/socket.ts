import type { NextApiRequest } from "next";
import { Server as IOServer } from "socket.io";
import { NextApiResponseWithSocket } from "@/types/socket.types";

export default function handler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new IOServer(res.socket.server);
  res.socket.server.io = io;

  console.log("Created socket.io server");

  io.on("connection", (socket) => {
    console.log("Client connected");

    io.emit("message", "Hello, client!");

    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
    });
  });

  res.end();
}

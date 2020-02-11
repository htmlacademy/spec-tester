import express from "express";
import { Server } from "http";
import { join } from "path";

const app = express();
let server: Server;

export const startServer = (path: string, port = 4000): void => {
  app.use(express.static(path));
  app.get("*", (req, res) => {
    res.send(join(path, "index.html"));
  });
  server = app.listen(port);
};

export const stopServer = (): void => {
  if (server) {
    server.close();
  }
};
